/**
 * HTTP Request Utility | HTTP 请求工具
 * Axios-based request with interceptors
 */

import axios from 'axios'

const LOCKED_PROVIDER = 'longcheng'
const API_KEYS_BY_PURPOSE_STORAGE_KEY = 'api-keys-by-purpose'
const API_KEYS_BY_PROVIDER_STORAGE_KEY = 'api-keys-by-provider'
export const API_KEY_PURPOSE_HEADER = 'X-Canvas-Key-Purpose'

export const API_KEY_PURPOSES = {
  DEFAULT: 'default',
  CHAT: 'chat',
  IMAGE: 'image',
  VIDEO: 'video',
  AUDIO: 'audio'
}

const readStoredJson = (key) => {
  try {
    return JSON.parse(localStorage.getItem(key) || '{}')
  } catch {
    return {}
  }
}

export const getStoredApiKey = (purpose = API_KEY_PURPOSES.DEFAULT) => {
  const normalizedPurpose = String(purpose || API_KEY_PURPOSES.DEFAULT).trim()
  const apiKeysByPurpose = readStoredJson(API_KEYS_BY_PURPOSE_STORAGE_KEY)
  const apiKeysByProvider = readStoredJson(API_KEYS_BY_PROVIDER_STORAGE_KEY)
  const defaultKey = String(apiKeysByProvider[LOCKED_PROVIDER] || '').trim()

  if (!normalizedPurpose || normalizedPurpose === API_KEY_PURPOSES.DEFAULT) {
    return defaultKey
  }

  return String(apiKeysByPurpose[normalizedPurpose] || '').trim() || defaultKey
}

const isAiProxyRequest = (url = '') => {
  const value = String(url)
  return value.startsWith('/api/ai/') || value.includes('/api/ai/')
}

const inferApiKeyPurpose = (url = '') => {
  const value = String(url).toLowerCase()
  if (value.includes('/image') || value.includes('/images/')) return API_KEY_PURPOSES.IMAGE
  if (value.includes('/video') || value.includes('/videos/')) return API_KEY_PURPOSES.VIDEO
  if (value.includes('/audio') || value.includes('/audios/')) return API_KEY_PURPOSES.AUDIO
  if (value.includes('/chat/') || value.includes('/responses')) return API_KEY_PURPOSES.CHAT
  return API_KEY_PURPOSES.DEFAULT
}

// Create axios instance | 创建 axios 实例
const instance = axios.create({
  baseURL: "/",
  timeout: 180000
})

// Request interceptor | 请求拦截器
instance.interceptors.request.use(
  (config) => {
    if (isAiProxyRequest(config.url)) {
      const headers = config.headers || {}
      const headerPurpose = typeof headers.get === 'function'
        ? headers.get(API_KEY_PURPOSE_HEADER)
        : headers[API_KEY_PURPOSE_HEADER]
      const purpose = headerPurpose || config.apiKeyPurpose || inferApiKeyPurpose(config.url)
      if (typeof headers.delete === 'function') {
        headers.delete(API_KEY_PURPOSE_HEADER)
      } else {
        delete headers[API_KEY_PURPOSE_HEADER]
      }

      const apiKey = getStoredApiKey(purpose)
      if (apiKey) {
        config.headers = headers
        if (typeof config.headers.set === 'function') {
          config.headers.set('Authorization', `Bearer ${apiKey}`)
        } else {
          config.headers.Authorization = `Bearer ${apiKey}`
        }
      }
    }
    return config
  },
  (error) => {
    console.error('Request error:', error)
    return Promise.reject(error)
  }
)

// Response interceptor | 响应拦截器
instance.interceptors.response.use(
  (res) => {
    const { data, code, message } = res.data || {}
    
    // Handle stream response | 处理流响应
    if (res.config.responseType === 'stream') {
      return res.data
    }
    
    // Handle blob response | 处理 blob 响应
    if (res.data instanceof Blob) {
      return res.data
    }
    
    // Success response | 成功响应
    // 优先检查 HTTP 状态码 (res.status)，业务状态码 (code) 作为补充
    // 部分 API (如 MiniMax) 使用 base_resp.status_code，不返回顶层 code
    if (res.status === 200) {
      return res.data
    }
    
    // Error response | 错误响应
    window.$message?.error(message || 'Request failed')
    return Promise.reject(res.data)
  },
  (error) => {
    const { response } = error
    
    if (response) {
      const { status, data } = response
      const message = getResponseErrorMessage(status, data, error.message)
      
      if (status === 401) {
        window.$message?.error(message)
      } else if (status === 429) {
        window.$message?.error(message)
      } else {
        window.$message?.error(message || '请求失败')
      }

      error.message = message
      error.userMessage = message
    } else {
      const message = error.message || '网络错误'
      window.$message?.error(message)
      error.message = message
      error.userMessage = message
    }
    
    return Promise.reject(error)
  }
)

/**
 * Set API base URL | 设置 API 基础 URL
 * @param {string} url - Base URL
 */
export const setBaseUrl = (url) => {
  instance.defaults.baseURL = url
}

/**
 * Get current base URL | 获取当前基础 URL
 * @returns {string}
 */
export const getBaseUrl = () => {
  return instance.defaults.baseURL
}

export default instance

const getResponseErrorMessage = (status, data, fallback = '请求失败') => {
  const upstreamMessage = data?.message || data?.error?.message || (typeof data?.error === 'string' ? data.error : '')

  if (status === 401) {
    return upstreamMessage || 'API Key 无效、已过期，或没有当前模型权限'
  }

  if (status === 403) {
    return upstreamMessage || 'API Key 没有当前模型或接口权限，请检查中转站分组权限'
  }

  if (status === 404) {
    return upstreamMessage || '当前模型或接口不存在，请先检测并选择可用模型'
  }

  if (status === 429) {
    return upstreamMessage || '图片生成被限流或额度/并发不足，请稍后重试，或换一个图片模型 / 降低尺寸后再生成'
  }

  if (status === 502 || status === 503 || status === 504) {
    return upstreamMessage || '生成结果回传超时。图片可能已经生成并扣费，请先检查素材库或后台日志，不要马上重复点击生成'
  }

  return upstreamMessage || fallback || `请求失败：HTTP ${status}`
}
