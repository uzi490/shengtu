/**
 * API Hooks | API Hooks
 * Simplified hooks for open source version | 开源版简化 hooks
 */

import { ref, reactive, onUnmounted } from 'vue'
import {
  generateImage,
  createVideoTask,
  getVideoTaskStatus,
  getVideoFileUrl,
  streamChatCompletions
} from '@/api'
import { getModelByName } from '@/config/models'
import { useApiConfig } from './useApiConfig'
import { useProvider } from './useProvider'
import { useModelStore } from '@/stores/pinia'

/**
 * Base API state hook | 基础 API 状态 Hook
 */
export const useApiState = () => {
  const loading = ref(false)
  const error = ref(null)
  const status = ref('idle')

  const reset = () => {
    loading.value = false
    error.value = null
    status.value = 'idle'
  }

  const setLoading = (isLoading) => {
    loading.value = isLoading
    status.value = isLoading ? 'running' : status.value
  }

  const setError = (err) => {
    error.value = err
    status.value = 'error'
    loading.value = false
  }

  const setSuccess = () => {
    status.value = 'success'
    loading.value = false
    error.value = null
  }

  return { loading, error, status, reset, setLoading, setError, setSuccess }
}

/**
 * Chat composable | 问答组合式函数
 */
export const useChat = (options = {}) => {
  const { loading, error, status, reset, setLoading, setError, setSuccess } = useApiState()
  const { adaptRequest, adaptResponse } = useProvider()
  const modelStore = useModelStore()

  const messages = ref([])
  const currentResponse = ref('')
  let abortController = null

  const send = async (content, stream = true, chatOptions = {}) => {
    setLoading(true)
    currentResponse.value = ''

    try {
      // 构建用户消息内容（支持参考图片）
      let userContent
      const images = chatOptions.images || options.images || []

      if (images.length > 0) {
        // 多模态消息：文本 + 图片
        userContent = [
          { type: 'text', text: content },
          ...images.map(img => ({
            type: 'image_url',
            image_url: { url: img.url || img }
          }))
        ]
      } else {
        userContent = content
      }

      const msgList = [
        ...(options.systemPrompt ? [{ role: 'system', content: options.systemPrompt }] : []),
        ...messages.value,
        { role: 'user', content: userContent }
      ]

      // 适配请求参数
      const chatModel = chatOptions.model || options.model || modelStore.selectedChatModel || modelStore.availableChatModels[0]?.key || 'gpt-5.5'
      const adaptedParams = adaptRequest('chat', {
        model: chatModel,
        messages: msgList
      })

      if (stream) {
        status.value = 'streaming'
        abortController = new AbortController()
        let fullResponse = ''

        // 使用 modelStore 获取完整 URL
        const chatUrl = new URL(modelStore.getChatEndpoint(), window.location.origin)

        for await (const chunk of streamChatCompletions(
          adaptedParams,
          abortController.signal,
          { baseUrl: chatUrl.origin, endpoint: chatUrl.pathname }
        )) {
          fullResponse += chunk
          currentResponse.value = fullResponse
        }

        messages.value.push({ role: 'user', content })
        messages.value.push({ role: 'assistant', content: fullResponse })
        setSuccess()
        return fullResponse
      }
    } catch (err) {
      if (err.name !== 'AbortError') {
        setError(err)
        throw err
      }
    }
  }

  const stop = () => {
    if (abortController) {
      abortController.abort()
      abortController = null
    }
  }

  const clear = () => {
    messages.value = []
    currentResponse.value = ''
    reset()
  }

  onUnmounted(() => stop())

  return { loading, error, status, messages, currentResponse, send, stop, clear, reset }
}

/**
 * Image generation composable | 图片生成组合式函数
 * Simplified for open source - fixed input/output format
 */
export const useImageGeneration = () => {
  const { loading, error, status, reset, setLoading, setError, setSuccess } = useApiState()
  const { adaptRequest, adaptResponse } = useProvider()
  const modelStore = useModelStore()

  const images = ref([])
  const currentImage = ref(null)

  const isGptImageModel = (model = '') => String(model).startsWith('gpt-image')

  const normalizeImageEditSize = (size = '') => {
    const match = String(size).match(/^(\d+)x(\d+)$/)
    if (!match) return '1024x1024'

    const width = Number(match[1])
    const height = Number(match[2])
    if (width > height) return '1536x1024'
    if (height > width) return '1024x1536'
    return '1024x1024'
  }

  const normalizeImageEditQuality = (quality = '') => {
    return ['low', 'medium', 'high', 'auto'].includes(quality) ? quality : 'auto'
  }

  const buildImageEditPrompt = (prompt = '') => {
    const userPrompt = String(prompt || '').trim() || '请基于参考图生成一张新图'
    return [
      '你正在进行图生图编辑。参考图是必须遵守的主约束：除非下面的要求明确说明要改变，否则必须保留参考图中主体商品/人物/物体的核心外观、款式、轮廓、颜色、材质、图案、装饰和比例关系，不要凭空替换成另一件商品或另一个主体。',
      '可以根据用户要求优化背景、光影、构图、清晰度和电商展示质感，但参考图里的主体应保持可识别、可追溯。',
      `用户要求：${userPrompt}`
    ].join('\n\n')
  }

  const imageSourceToFile = async (source, index = 0) => {
    if (source instanceof File) return source

    if (source instanceof Blob) {
      return new File([source], `reference-${index + 1}.png`, { type: source.type || 'image/png' })
    }

    if (typeof source !== 'string' || !source) {
      throw new Error('参考图格式不正确')
    }

    let response
    try {
      response = await fetch(source)
    } catch {
      throw new Error('参考图读取失败，请使用上传图片或素材库里的图片再试')
    }

    if (!response.ok) {
      throw new Error('参考图读取失败，请重新上传图片后再试')
    }

    const blob = await response.blob()
    const mimeType = blob.type || 'image/png'
    const extension = mimeType.split('/')[1]?.split('+')[0] || 'png'
    return new File([blob], `reference-${index + 1}.${extension}`, { type: mimeType })
  }

  const buildImageEditFormData = async (params, modelConfig) => {
    const imageList = Array.isArray(params.image) ? params.image : [params.image]
    const formData = new FormData()

    formData.append('model', params.model)
    formData.append('prompt', buildImageEditPrompt(params.prompt))
    formData.append('size', normalizeImageEditSize(params.size || modelConfig?.defaultParams?.size))
    if (params.n) formData.append('n', String(params.n))
    formData.append('quality', normalizeImageEditQuality(params.quality))

    const files = await Promise.all(imageList.filter(Boolean).map(imageSourceToFile))
    files.forEach(file => {
      formData.append('image[]', file, file.name)
    })

    return formData
  }

  /**
   * Generate image with fixed params | 固定参数生成图片
   * @param {Object} params - { model, prompt, size, n, image (optional ref image) }
   */
  const generate = async (params) => {
    setLoading(true)
    images.value = []
    currentImage.value = null

    try {
      const modelConfig = getModelByName(params.model)

      const hasReferenceImage = Boolean(params.image && (!Array.isArray(params.image) || params.image.length > 0))

      if (hasReferenceImage && isGptImageModel(params.model)) {
        const formData = await buildImageEditFormData(params, modelConfig)
        const response = await generateImage(formData, {
          requestType: 'formdata',
          endpoint: modelStore.getImageEditEndpoint(params.model)
        })
        const adaptedData = adaptResponse('image', response)
        images.value = adaptedData
        currentImage.value = adaptedData[0] || null
        setSuccess()
        return adaptedData
      }

      // Build request data | 构建请求数据
      const requestData = {
        model: params.model,
        prompt: params.prompt,
        size: params.size || modelConfig?.defaultParams?.aspect_ratio || modelConfig?.defaultParams?.size || '1:1',
        n: params.n || 1
      }

      // Add reference image if provided | 添加参考图
      // MiniMax image 字段只支持单个图片（URL 或 base64），取第一个
      if (params.image) {
        requestData.image = Array.isArray(params.image) ? params.image[0] : params.image
      }

      // 适配请求参数
      const adaptedParams = adaptRequest('image', requestData)

      // Call API | 调用 API
      const response = await generateImage(adaptedParams, {
        requestType: 'json',
        endpoint: modelStore.getImageEndpoint(params.model)
      })

      // 适配响应数据
      const adaptedData = adaptResponse('image', response)

      images.value = adaptedData
      currentImage.value = adaptedData[0] || null
      setSuccess()
      return adaptedData
    } catch (err) {
      setError(err)
      throw err
    }
  }

  return { loading, error, status, images, currentImage, generate, reset }
}

/**
 * Video generation composable | 视频生成组合式函数
 * Simplified for open source - fixed input/output format
 */

export const useVideoGeneration = () => {
  const { loading, error, status, reset, setLoading, setError, setSuccess } = useApiState()
  const { adaptRequest, adaptResponse } = useProvider()
  const modelStore = useModelStore()

  const video = ref(null)
  const taskId = ref(null)
  const progress = reactive({
    attempt: 0,
    maxAttempts: 120,
    percentage: 0
  })

  /**
   * Create video task only (no polling) | 仅创建视频任务（不轮询）
   */
  const createVideoTaskOnly = async (params) => {
    const modelConfig = getModelByName(params.model)

    // Build request data | 构建请求数据
    const requestData = {
      model: params.model,
      prompt: params.prompt || ''
    }
    // Add optional params | 添加可选参数
    if (params.first_frame_image) requestData.first_frame_image = params.first_frame_image
    if (params.last_frame_image) requestData.last_frame_image = params.last_frame_image
    if (params.ratio) requestData.size = params.ratio
    if (params.dur) requestData.seconds = params.dur

    // 适配请求参数
    const adaptedParams = adaptRequest('video', requestData)

    // Call API to create task | 调用 API 创建任务
    const task = await createVideoTask(adaptedParams, {
      requestType: 'json',
      endpoint: modelStore.getVideoEndpoint()
    })

    // Check if async (need polling) | 检查是否异步
    const isAsync = modelConfig?.async !== false

    // If has video URL directly, return | 如果直接有视频 URL，返回
    if (!isAsync || task.data?.url || task.url || task.content?.video_url) {
      return {
        taskId: null,
        url: task.data?.url || task.url || task.content?.video_url
      }
    }

    // Get task ID | 获取任务 ID
    const newTaskId = task.id || task.task_id || task.taskId
    if (!newTaskId) {
      throw new Error('未获取到任务 ID')
    }

    return { taskId: newTaskId }
  }

  /**
   * Poll video task | 轮询视频任务
   */
  const pollVideoTask = async (pollTaskId, onProgress = () => {}) => {
    const maxAttempts = 120
    const interval = 5000

    for (let i = 0; i < maxAttempts; i++) {
      onProgress(i + 1, Math.min(Math.round((i / maxAttempts) * 100), 99))

      // 获取任务查询端点
      let taskEndpoint = modelStore.getVideoTaskEndpoint()
      if (taskEndpoint.includes('{taskId}')) {
        taskEndpoint = taskEndpoint.replace('{taskId}', pollTaskId)
      }

      const result = await getVideoTaskStatus(pollTaskId, {
        endpoint: taskEndpoint
      })

      // MiniMax: 检查 base_resp 状态码
      if (result.base_resp?.status_code !== 0) {
        throw new Error(result.base_resp?.status_msg || '视频生成失败')
      }

      // MiniMax: status == 'Success' 表示生成完成，获取 file_id 后再查下载链接
      if (result.status === 'Success') {
        const fileId = result.file_id
        if (!fileId) {
          throw new Error('未获取到 file_id')
        }
        // 查询文件下载链接
        const fileResult = await getVideoFileUrl(fileId, {
          endpoint: `${modelStore.currentBaseUrl}/v1/files/retrieve`
        })
        if (fileResult.base_resp?.status_code !== 0) {
          throw new Error(fileResult.base_resp?.status_msg || '获取视频下载链接失败')
        }
        const downloadUrl = fileResult.file?.download_url
        if (!downloadUrl) {
          throw new Error('未获取到视频下载链接')
        }
        return { url: downloadUrl, taskId: pollTaskId }
      }

      // Check for failure | 检查是否失败
      if (result.status === 'Failed' || result.status === 'failed' || result.status === 'error') {
        throw new Error(result.error?.message || result.message || '视频生成失败')
      }

      // Wait before next poll | 等待下次轮询
      await new Promise(resolve => setTimeout(resolve, interval))
    }

    throw new Error('视频生成超时')
  }

  /**
   * Generate video with fixed params (includes polling) | 固定参数生成视频（含轮询）
   * @param {Object} params - { model, prompt, first_frame_image, last_frame_image, ratio, duration }
   */
  const generate = async (params) => {
    setLoading(true)
    video.value = null
    taskId.value = null
    progress.attempt = 0
    progress.percentage = 0

    try {
      // 创建任务
      const { taskId: newTaskId, url } = await createVideoTaskOnly(params)

      // 如果有直接 URL，返回
      if (url) {
        video.value = { url }
        setSuccess()
        return video.value
      }

      // 需要轮询
      taskId.value = newTaskId
      status.value = 'polling'

      // 轮询获取结果
      const result = await pollVideoTask(newTaskId, (attempt, percentage) => {
        progress.attempt = attempt
        progress.percentage = percentage
      })

      video.value = result
      setSuccess()
      return result
    } catch (err) {
      setError(err)
      throw err
    }
  }

  return { loading, error, status, video, taskId, progress, generate, reset, createVideoTaskOnly, pollVideoTask }
}

/**
 * Combined API composable | 综合 API 组合式函数
 */
export const useApi = () => {
  const config = useApiConfig()
  const chat = useChat()
  const image = useImageGeneration()
  const videoGen = useVideoGeneration()

  return { config, chat, image, video: videoGen }
}
