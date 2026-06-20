/**
 * HTTP Request Utility | HTTP 请求工具
 * Axios-based request with interceptors
 */

import axios from 'axios'

const LOCKED_PROVIDER = 'longcheng'

export const getStoredApiKey = () => {
  try {
    const apiKeys = JSON.parse(localStorage.getItem('api-keys-by-provider') || '{}')
    return String(apiKeys[LOCKED_PROVIDER] || '').trim()
  } catch {
    return ''
  }
}

const isAiProxyRequest = (url = '') => {
  const value = String(url)
  return value.startsWith('/api/ai/') || value.includes('/api/ai/')
}

// Create axios instance | 创建 axios 实例
const instance = axios.create({
  baseURL: "/",
  timeout: 30000000
})

// Request interceptor | 请求拦截器
instance.interceptors.request.use(
  (config) => {
    if (isAiProxyRequest(config.url)) {
      const apiKey = getStoredApiKey()
      if (apiKey) {
        config.headers = config.headers || {}
        config.headers.Authorization = `Bearer ${apiKey}`
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

  return upstreamMessage || fallback || `请求失败：HTTP ${status}`
}
