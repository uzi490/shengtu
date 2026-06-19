/**
 * HTTP Request Utility | HTTP 请求工具
 * Axios-based request with interceptors
 */

import axios from 'axios'

// Create axios instance | 创建 axios 实例
const instance = axios.create({
  baseURL: "/",
  timeout: 30000000
})

// Request interceptor | 请求拦截器
instance.interceptors.request.use(
  (config) => {
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
      const message = data?.message || data?.error?.message || error.message
      
      if (status === 401) {
        window.$message?.error('API Key 无效或已过期')
      } else if (status === 429) {
        window.$message?.error('请求过于频繁，请稍后再试')
      } else {
        window.$message?.error(message || '请求失败')
      }
    } else {
      window.$message?.error(error.message || '网络错误')
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
