import { getStoredApiKey } from '@/utils'

const MODEL_DISCOVERY_ENDPOINT = '/api/ai/v1/models'

export const fetchAvailableModels = async (apiKey = getStoredApiKey()) => {
  const key = String(apiKey || '').trim()
  if (!key) {
    throw new Error('请先填写你的 AIAIAI API Key')
  }

  const response = await fetch(MODEL_DISCOVERY_ENDPOINT, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${key}`
    }
  })

  const payload = await readJsonSafe(response)

  if (!response.ok) {
    throw new Error(buildModelDiscoveryError(response.status, payload))
  }

  const models = Array.isArray(payload?.data) ? payload.data : []
  return models
    .map(model => normalizeModel(model))
    .filter(model => model.id)
}

export const classifyModels = (models = []) => {
  const result = {
    chat: [],
    image: [],
    video: []
  }

  for (const model of models) {
    const id = typeof model === 'string' ? model : model?.id
    if (!id) continue

    if (isVideoModel(id)) {
      result.video.push(id)
    } else if (isImageModel(id)) {
      result.image.push(id)
    } else {
      result.chat.push(id)
    }
  }

  return {
    chat: unique(result.chat),
    image: unique(result.image),
    video: unique(result.video)
  }
}

const normalizeModel = (model) => {
  if (typeof model === 'string') {
    return { id: model, label: model }
  }

  const id = model?.id || model?.model || model?.name || ''
  return {
    id: String(id || '').trim(),
    label: String(model?.name || model?.label || id || '').trim()
  }
}

const isImageModel = (id) => {
  const value = id.toLowerCase()
  return [
    'image',
    'gpt-image',
    'dall-e',
    'seedream',
    'flux',
    'imagen',
    'jimeng',
    'midjourney',
    'mj',
    'stable-diffusion',
    'sdxl'
  ].some(token => value.includes(token))
}

const isVideoModel = (id) => {
  const value = id.toLowerCase()
  return [
    'video',
    'sora',
    'veo',
    'kling',
    'hailuo',
    'seedance',
    'wan',
    'runway',
    'pika'
  ].some(token => value.includes(token))
}

const unique = (items) => [...new Set(items)]

const readJsonSafe = async (response) => {
  try {
    return await response.json()
  } catch {
    return {}
  }
}

const buildModelDiscoveryError = (status, payload) => {
  const upstreamMessage = payload?.error?.message || payload?.message || payload?.error

  if (status === 401) {
    return 'API Key 无效、已过期，或这个 Key 没有当前中转站权限'
  }

  if (status === 403) {
    return 'API Key 没有拉取模型列表的权限，请检查中转站分组权限'
  }

  if (status === 429) {
    return '请求过于频繁，请稍后再检测'
  }

  return upstreamMessage || `模型拉取失败：HTTP ${status}`
}
