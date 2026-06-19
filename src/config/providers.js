/**
 * API Provider Adapters | API 渠道适配器
 * 适配不同 API 提供商的请求参数和响应格式
 */

export const LOCKED_PROVIDER = 'longcheng'
export const LOCKED_API_BASE_URL = 'https://api.aiaiai001.com'

// 渠道适配配置
export const PROVIDERS = {
  longcheng: {
    label: '龙城 (Longcheng)',
    defaultBaseUrl: LOCKED_API_BASE_URL,
    // 端点路径
    endpoints: {
      chat: '/v1/chat/completions',
      image: '/v1/images/generations',
      video: '/v1/video/generations',
      videoQuery: '/v1/video/task/{taskId}',
      // Gemini 生图专用端点
      geminiImage: '/v1beta/models/{model}:generateContent'
    },
    // 龙城路由请求适配
    requestAdapter: {
      chat: (params) => {
        const adapted = {
          model: params.model,
          messages: params.messages
        }
        if (params.temperature !== undefined) adapted.temperature = params.temperature
        if (params.max_tokens !== undefined) adapted.max_tokens = params.max_tokens
        if (params.stream !== undefined) adapted.stream = params.stream
        return adapted
      },
      // Gemini 图片生成适配
      image: (params) => {
        const model = params.model || ''

        // Gemini 图片模型使用特殊的 generateContent 协议
        if (model.includes('gemini')) {
          const adapted = {
            contents: [
              {
                role: 'user',
                parts: [
                  {
                    text: params.prompt
                  }
                ]
              }
            ],
            generationConfig: {
              temperature: params.temperature || 0.7,
              maxOutputTokens: params.max_tokens || 2048
            },
            safetySettings: [
              {
                category: 'HARM_CATEGORY_HARASSMENT',
                threshold: 'BLOCK_MEDIUM_AND_ABOVE'
              },
              {
                category: 'HARM_CATEGORY_HATE_SPEECH',
                threshold: 'BLOCK_MEDIUM_AND_ABOVE'
              },
              {
                category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
                threshold: 'BLOCK_MEDIUM_AND_ABOVE'
              },
              {
                category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
                threshold: 'BLOCK_MEDIUM_AND_ABOVE'
              }
            ]
          }
          return adapted
        }

        // 千问生图模型 wan2.7-image-pro 使用特殊格式
        if (model.includes('wan2.7-image')) {
          const adapted = {
            model: model,
            input: {
              messages: [
                {
                  role: 'user',
                  content: [
                    {
                      text: params.prompt || ''
                    }
                  ]
                }
              ]
            },
            parameters: {
              size: params.size || '2K',
              n: params.n || 1,
              watermark: params.watermark !== undefined ? params.watermark : false,
              thinking_mode: params.thinking_mode !== undefined ? params.thinking_mode : true
            }
          }
          return adapted
        }

        // 非 Gemini 图片模型使用标准格式
        const adapted = {
          model: params.model,
          prompt: params.prompt
        }
        if (params.size) adapted.size = params.size
        if (params.n) adapted.n = params.n
        if (params.quality) adapted.quality = params.quality
        if (params.style) adapted.style = params.style
        if (params.image) adapted.image = params.image

        // MiniMax 模型（图生图）使用 subject_reference 格式
        if (model.includes('minimax') || model.includes('image-01')) {
          if (params.image) {
            const imageUrl = Array.isArray(params.image) ? params.image[0] : params.image
            adapted.subject_reference = [
              {
                type: 'character',
                image_file: imageUrl
              }
            ]
            delete adapted.image
          }
          if (params.aspect_ratio) adapted.aspect_ratio = params.aspect_ratio
          else if (params.size) adapted.aspect_ratio = params.size
          if (params.n) adapted.n = params.n
          if (params.response_format) adapted.response_format = params.response_format
        }
        return adapted
      },
      video: (params) => {
        const model = params.model || ''

        // Seedance 模型 - 使用 content 数组格式
        if (model.includes('seedance') || model.includes('Hailuo')) {
          const content = []

          // 构建完整参数文本
          // 格式: prompt --resolution 720p --ratio 16:9 --dur 5 --fps 24 --wm true --seed 11 --cf false
          let textPrompt = params.prompt || ''

          // 添加 resolution 参数
          if (params.resolution) {
            textPrompt += ` --resolution ${params.resolution}`
          }

          // 添加 ratio 参数 (图生视频用 16:9)
          if (params.size) {
            textPrompt += ` --ratio ${params.size}`
          }

          // 添加 duration 参数
          if (params.seconds) {
            textPrompt += ` --dur ${params.seconds}`
          }

          // 添加 fps (固定 24)
          textPrompt += ` --fps 24`

          // 添加水印参数 (默认 true)
          textPrompt += ` --wm ${params.wm !== false ? 'true' : 'false'}`

          // 添加 seed 参数 (可选)
          if (params.seed !== undefined) {
            textPrompt += ` --seed ${params.seed}`
          }

          // 添加 cf 参数 (默认 false)
          textPrompt += ` --cf ${params.cf === true ? 'true' : 'false'}`

          content.push({
            type: 'text',
            text: textPrompt
          })

          // 添加参考图（如果有）
          if (params.first_frame_image) {
            content.push({
              type: 'image_url',
              image_url: {
                url: params.first_frame_image
              }
            })
          }

          const adapted = {
            model: model,
            content: content,
            generate_audio: params.generateAudio !== false
          }

          return adapted
        }

        // Kling 模型 - 使用 kling 特定格式
        if (model.includes('kling')) {
          // 将 ratio 转换为 aspect_ratio 格式
          const ratioMap = {
            '16:9': '16:9',
            '9:16': '9:16',
            '1:1': '1:1',
            '4:3': '4:3',
            '3:4': '3:4'
          }

          const adapted = {
            model_name: model,
            mode: 'std',
            prompt: params.prompt || '',
            aspect_ratio: ratioMap[params.size] || '16:9',
            duration: params.seconds || 5,
            negative_prompt: '',
            cfg_scale: 0.5
          }

          // 添加参考图（如果有）
          if (params.first_frame_image) {
            adapted.image = params.first_frame_image
          }

          return adapted
        }

        // 默认格式（veo 等）
        const adapted = {
          model: params.model,
          prompt: params.prompt || ''
        }
        if (params.first_frame_image) adapted.first_frame_image = params.first_frame_image
        if (params.last_frame_image) adapted.last_frame_image = params.last_frame_image
        if (params.size) adapted.size = params.size
        if (params.seconds) adapted.seconds = params.seconds

        return adapted
      }
    },
    // 龙城路由响应格式
    responseAdapter: {
      chat: (response) => {
        if (response.choices && response.choices.length > 0) {
          return response.choices[0].message?.content || ''
        }
        return ''
      },
      image: (response) => {
        // 千问图片响应格式
        // 响应结构: { output: { choices: [{ message: { content: [{ image: "url", type: "image" }] } }] } }
        // 多个 choices，每个 choice 包含一张图片
        if (response.output && response.output.choices && response.output.choices.length > 0) {
          const images = []
          for (const choice of response.output.choices) {
            if (choice.message && choice.message.content) {
              for (const item of choice.message.content) {
                if (item.type === 'image' && item.image) {
                  images.push({
                    url: item.image,
                    revisedPrompt: ''
                  })
                }
              }
            }
          }
          if (images.length > 0) {
            return images
          }
        }
        // Gemini 图片响应格式
        // 响应结构: { candidates: [{ content: { parts: [{ inlineData: { data: "base64", mimeType: "image/png" } }] } }] }
        if (response.candidates && response.candidates.length > 0) {
          const candidate = response.candidates[0]
          if (candidate.content && candidate.content.parts) {
            const images = []
            for (const part of candidate.content.parts) {
              if (part.inlineData) {
                // Gemini 返回的是 URL-safe base64，需要转换为标准 base64
                // URL-safe base64 使用 - 和 _，而标准 base64 使用 + 和 /
                const base64Data = part.inlineData.data
                  .replace(/-/g, '+')
                  .replace(/_/g, '/')
                // 返回 base64 图片数据
                images.push({
                  url: `data:${part.inlineData.mimeType};base64,${base64Data}`,
                  revisedPrompt: ''
                })
              }
            }
            if (images.length > 0) {
              return images
            }
          }
        }
        // GPT 图片响应格式
        // 响应结构: { created: 123456, data: [{ b64_json: "...", revised_prompt: "..." }] }
        if (response.data && Array.isArray(response.data) && response.data.length > 0) {
          const images = []
          for (const item of response.data) {
            if (item.b64_json) {
              images.push({
                url: `data:image/png;base64,${item.b64_json}`,
                revisedPrompt: item.revised_prompt || ''
              })
            } else if (item.url) {
              images.push({
                url: item.url,
                revisedPrompt: item.revised_prompt || ''
              })
            }
          }
          if (images.length > 0) {
            return images
          }
        }
        if (response.data && response.data.image_urls) {
          return response.data.image_urls.map(url => ({
            url: url,
            revisedPrompt: ''
          }))
        }
        // 标准图片响应格式
        const data = response.data || response
        return (Array.isArray(data) ? data : [data]).map(item => ({
          url: item.url || item.b64_json || '',
          revisedPrompt: item.revised_prompt || ''
        }))
      },
      video: (response) => {
        return {
          url: response.data?.url || response.url || response.data?.[0]?.url || '',
          ...response
        }
      }
    }
  },
  openai: {
    label: 'OpenAI',
    defaultBaseUrl: 'https://api.chatfire.cn',
    // 端点路径
    endpoints: {
      chat: '/v1/chat/completions',
      image: '/v1/images/generations',
      video: '/v1/videos',
      videoQuery: '/v1/videos/{taskId}'
    },
    // 请求参数适配
    requestAdapter: {
      chat: (params) => {
        const adapted = {
          model: params.model,
          messages: params.messages
        }
        // 添加可选参数
        if (params.temperature !== undefined) adapted.temperature = params.temperature
        if (params.max_tokens !== undefined) adapted.max_tokens = params.max_tokens
        if (params.stream !== undefined) adapted.stream = params.stream
        return adapted
      },
      image: (params) => {
        const adapted = {
          model: params.model,
          prompt: params.prompt
        }
        if (params.size) adapted.size = params.size
        if (params.n) adapted.n = params.n
        if (params.quality) adapted.quality = params.quality
        if (params.style) adapted.style = params.style
        if (params.image) adapted.image = params.image
        return adapted
      },
      video: (params) => {
        const adapted = {
          model: params.model,
          prompt: params.prompt || ''
        }
        if (params.first_frame_image) adapted.first_frame_image = params.first_frame_image
        if (params.last_frame_image) adapted.last_frame_image = params.last_frame_image
        if (params.size) adapted.size = params.size
        if (params.seconds) adapted.seconds = params.seconds
        return adapted
      }
    },
    // 响应数据适配
    responseAdapter: {
      chat: (response) => {
        if (response.choices && response.choices.length > 0) {
          return response.choices[0].message?.content || ''
        }
        return ''
      },
      image: (response) => {
        const data = response.data || response
        return (Array.isArray(data) ? data : [data]).map(item => ({
          url: item.url || item.b64_json || '',
          revisedPrompt: item.revised_prompt || ''
        }))
      },
      video: (response) => {
        return {
          url: response.data?.url || response.url || response.data?.[0]?.url || '',
          ...response
        }
      }
    }
  },

  

  minimax: {
    label: 'MiniMax',
    defaultBaseUrl: 'https://api.minimaxi.com',
    endpoints: {
      chat: '/v1/chat/completions',
      image: '/v1/image_generation',
      video: '/v1/video_generation',
      videoQuery: '/v1/video_generation'
    },
    requestAdapter: {
      chat: (params) => {
        const adapted = {
          // MiniMax 统一使用 MiniMax-M2.7 模型
          model: 'MiniMax-M2.7',
          messages: params.messages
        }
        if (params.temperature !== undefined) adapted.temperature = params.temperature
        if (params.max_tokens !== undefined) adapted.max_tokens = params.max_tokens
        if (params.stream !== undefined) adapted.stream = params.stream
        return adapted
      },
      image: (params) => {
        const adapted = {
          model: params.model,
          prompt: params.prompt
        }
        // MiniMax 支持 aspect_ratio 格式
        if (params.aspect_ratio) {
          adapted.aspect_ratio = params.aspect_ratio
        } else if (params.size) {
          // size 格式如 1024x1024 → 转换为 aspect_ratio
          adapted.aspect_ratio = params.size
        }
        // width/height 单独设置
        if (params.width && params.height) {
          adapted.width = params.width
          adapted.height = params.height
        }
        if (params.n) adapted.n = params.n
        if (params.response_format) adapted.response_format = params.response_format
        if (params.seed !== undefined) adapted.seed = params.seed
        if (params.prompt_optimizer !== undefined) adapted.prompt_optimizer = params.prompt_optimizer
        if (params.aigc_watermark !== undefined) adapted.aigc_watermark = params.aigc_watermark

        // 图生图：参考图片转 subject_reference 格式
        // MiniMax 图生图入参: subject_reference: [{ type: "character", image_file: "url" }]
        if (params.image) {
          const imageUrl = Array.isArray(params.image) ? params.image[0] : params.image
          adapted.subject_reference = [
            {
              type: 'character',
              image_file: imageUrl
            }
          ]
        }

        // 直接传入的 subject_reference（用于更复杂的场景）
        if (params.subject_reference) {
          adapted.subject_reference = params.subject_reference
        }

        return adapted
      },
      video: (params) => {
        // MiniMax Hailuo 视频格式
        const adapted = {
          model: params.model,
          prompt: params.prompt || '',
          prompt_optimizer: true,
          duration: params.dur || params.duration || 6,
          resolution: params.resolution || '768P'
        }

        // 图生视频：首帧图片
        if (params.first_frame_image) {
          adapted.first_frame_image = params.first_frame_image
        }

        // 尾帧图片（如果有）
        if (params.last_frame_image) {
          adapted.last_frame_image = params.last_frame_image
        }

        return adapted
      }
    },
    responseAdapter: {
      chat: (response) => {
        if (response.choices && response.choices.length > 0) {
          return response.choices[0].message?.content || ''
        }
        return ''
      },
      image: (response) => {
        // MiniMax 响应格式: { data: { image_urls: [...] }, id, metadata, base_resp }
        // 检查状态码（兼容数字 0 和字符串 "0"）
        const statusCode = response.base_resp?.status_code
        if (statusCode !== 0 && statusCode !== '0') {
          const msg = response.base_resp?.status_msg || '图片生成失败'
          // 统一抛出，外部 catch 会展示到节点 error 状态
          throw new Error(`[MiniMax] ${msg} (code: ${statusCode})`)
        }

        // metadata 里有成功/失败计数，可记录日志
        if (response.metadata) {
          console.log(`[MiniMax Image] success: ${response.metadata.success_count}, failed: ${response.metadata.failed_count}`)
        }

        // image_urls 可能是数组或单个字符串
        const rawUrls = response.data?.image_urls || []
        const imageUrls = Array.isArray(rawUrls) ? rawUrls : [rawUrls]
        const validUrls = imageUrls.filter(Boolean)

        if (validUrls.length === 0) {
          throw new Error('[MiniMax] 未返回有效的图片 URL')
        }

        return validUrls.map(url => ({
          url,
          revisedPrompt: response.data?.revised_prompt || ''
        }))
      },
      video: (response) => {
        // MiniMax 视频响应格式: { data: { video_url: "..." }, id, ... }
        // 检查状态码
        if (response.base_resp?.status_code !== 0) {
          throw new Error(response.base_resp?.status_msg || '视频生成失败')
        }
        const videoUrl = response.data?.video_url || response.video_url || response.data?.url || response.url || ''
        return {
          url: videoUrl,
          ...response
        }
      }
    }
  },

  // 百度 ERNIE-Image 模型渠道
  baidu: {
    label: '龙城 (ERNIE-Image)',
    defaultBaseUrl: 'https://api.aiaiai001.com',
    endpoints: {
      image: '/v1/images/generations'
    },
    requestAdapter: {
      chat: (params) => {
        return params
      },
      image: (params) => {
        // ERNIE-Image 模型参数格式
        // 需要转换为: { prompt, height, width, num_inference_steps, guidance_scale, use_pe }
        const adapted = {
          prompt: params.prompt || '',
          num_inference_steps: params.num_inference_steps || 50,
          guidance_scale: params.guidance_scale || 4.0,
          use_pe: params.use_pe !== undefined ? params.use_pe : true
        }
        
        // 解析 size 参数为 height 和 width
        // size 格式如 '848x1264' 或 '1264x848'
        if (params.size) {
          const sizeParts = params.size.split('x')
          if (sizeParts.length === 2) {
            adapted.width = parseInt(sizeParts[0])
            adapted.height = parseInt(sizeParts[1])
          }
        }
        
        return adapted
      },
      video: (params) => {
        return params
      }
    },
    responseAdapter: {
      chat: (response) => {
        return response
      },
      image: (response) => {
        // 假设响应格式为 { images: [{ url: '...' }] } 或 { url: '...' }
        if (response.images && Array.isArray(response.images)) {
          return response.images.map(item => ({
            url: item.url || '',
            revisedPrompt: ''
          }))
        }
        if (response.url) {
          return [{ url: response.url, revisedPrompt: '' }]
        }
        const data = response.data || response
        return (Array.isArray(data) ? data : [data]).map(item => ({
          url: item.url || '',
          revisedPrompt: item.revised_prompt || ''
        }))
      },
      video: (response) => {
        return {
          url: response.data?.url || response.url || '',
          ...response
        }
      }
    }
  },

  // 自定义 MiniMax 转发渠道
  myminimax: {
    label: '自定义(MiniMax)',
    defaultBaseUrl: 'https://api.minimaxi.com',
    endpoints: {
      chat: '/v1/chat/completions',
      image: '/v1/image_generation',
      video: '/v1/video_generation',
      videoQuery: '/v1/query/video_generation'
    },
    requestAdapter: {
      chat: (params) => {
        const adapted = {
          model: 'MiniMax-M2.7',
          messages: params.messages
        }
        if (params.temperature !== undefined) adapted.temperature = params.temperature
        if (params.max_tokens !== undefined) adapted.max_tokens = params.max_tokens
        if (params.stream !== undefined) adapted.stream = params.stream
        return adapted
      },
      image: (params) => {
        const adapted = {
          model: params.model,
          prompt: params.prompt
        }
        if (params.aspect_ratio) {
          adapted.aspect_ratio = params.aspect_ratio
        } else if (params.size) {
          adapted.aspect_ratio = params.size
        }
        if (params.width && params.height) {
          adapted.width = params.width
          adapted.height = params.height
        }
        if (params.n) adapted.n = params.n
        if (params.response_format) adapted.response_format = params.response_format
        if (params.seed !== undefined) adapted.seed = params.seed
        if (params.prompt_optimizer !== undefined) adapted.prompt_optimizer = params.prompt_optimizer
        if (params.aigc_watermark !== undefined) adapted.aigc_watermark = params.aigc_watermark
        if (params.image) {
          const imageUrl = Array.isArray(params.image) ? params.image[0] : params.image
          adapted.subject_reference = [{ type: 'character', image_file: imageUrl }]
        }
        if (params.subject_reference) {
          adapted.subject_reference = params.subject_reference
        }
        return adapted
      },
      video: (params) => {
        const adapted = {
          model: params.model,
          prompt: params.prompt || '',
          prompt_optimizer: true,
          duration: params.dur || params.duration || 6,
          resolution: params.resolution || '768P'
        }
        if (params.first_frame_image) adapted.first_frame_image = params.first_frame_image
        if (params.last_frame_image) adapted.last_frame_image = params.last_frame_image
        return adapted
      }
    },
    responseAdapter: {
      chat: (response) => {
        if (response.choices && response.choices.length > 0) {
          return response.choices[0].message?.content || ''
        }
        return ''
      },
      image: (response) => {
        // MiniMax 响应格式: { data: { image_urls: [...] }, id, metadata, base_resp }
        // 检查状态码（兼容数字 0 和字符串 "0"）
        const statusCode = response.base_resp?.status_code
        if (statusCode !== 0 && statusCode !== '0') {
          const msg = response.base_resp?.status_msg || '图片生成失败'
          throw new Error(`[MiniMax] ${msg} (code: ${statusCode})`)
        }

        // metadata 里有成功/失败计数，可记录日志
        if (response.metadata) {
          console.log(`[MiniMax Image] success: ${response.metadata.success_count}, failed: ${response.metadata.failed_count}`)
        }

        // image_urls 可能是数组或单个字符串
        const rawUrls = response.data?.image_urls || []
        const imageUrls = Array.isArray(rawUrls) ? rawUrls : [rawUrls]
        const validUrls = imageUrls.filter(Boolean)

        if (validUrls.length === 0) {
          throw new Error('[MiniMax] 未返回有效的图片 URL')
        }

        return validUrls.map(url => ({
          url,
          revisedPrompt: response.data?.revised_prompt || ''
        }))
      },
      video: (response) => {
        if (response.base_resp?.status_code !== 0) {
          throw new Error(response.base_resp?.status_msg || '视频生成失败')
        }
        const videoUrl = response.data?.video_url || response.video_url || response.data?.url || response.url || ''
        return { url: videoUrl, ...response }
      }
    }
  },

  // 默认使用龙城格式
  default: 'longcheng'
}

// 获取渠道列表
export const getProviderList = () => {
  return Object.entries(PROVIDERS)
    .filter(([key]) => key !== 'default')
    .map(([key, value]) => ({
      key,
      label: value.label
    }))
}

// MiniMax API Base URL
export const MINIMAX_BASE_URL = 'https://api.minimaxi.com'

// 获取默认渠道
export const getDefaultProvider = () => {
  return LOCKED_PROVIDER
}

// 获取渠道的默认 Base URL
export const getDefaultBaseUrl = (providerKey) => {
  return LOCKED_API_BASE_URL
}

// 获取渠道配置
export const getProviderConfig = (providerKey) => {
  return PROVIDERS[providerKey] || PROVIDERS[PROVIDERS.default]
}
