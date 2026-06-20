/**
 * Chat API | 对话 API
 */

import { request } from '@/utils'
import { API_KEY_PURPOSES, getStoredApiKey } from '@/utils'

// 对话补全
export const chatCompletions = (data) =>
  request({
    url: `/chat/completions`,
    method: 'post',
    data
  })

// 流式对话补全
export const streamChatCompletions = async function* (data, signal, options = {}) {
  const baseUrl = options.baseUrl || '/api/ai'
  const endpoint = options.endpoint || '/chat/completions'

  const response = await fetch(`${baseUrl}${endpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(getStoredApiKey(API_KEY_PURPOSES.CHAT) ? { Authorization: `Bearer ${getStoredApiKey(API_KEY_PURPOSES.CHAT)}` } : {})
    },
    body: JSON.stringify({ ...data, stream: true }),
    signal
  })

  if (!response.ok) {
    const error = await readJsonSafe(response)
    throw new Error(buildChatError(response.status, error))
  }

  const reader = response.body.getReader()
  const decoder = new TextDecoder()
  let buffer = ''

  while (true) {
    const { done, value } = await reader.read()
    if (done) break

    buffer += decoder.decode(value, { stream: true })
    const lines = buffer.split('\n')
    buffer = lines.pop() || ''

    for (const line of lines) {
      const trimmed = line.trim()
      if (!trimmed || !trimmed.startsWith('data:')) continue

      const data = trimmed.slice(5).trim()
      if (data === '[DONE]') return

      try {
        const parsed = JSON.parse(data)
        const content = parsed.choices?.[0]?.delta?.content
        if (content) yield content
      } catch (e) {
        // Skip invalid JSON
      }
    }
  }
}

const readJsonSafe = async (response) => {
  try {
    return await response.json()
  } catch {
    return {}
  }
}

const buildChatError = (status, error) => {
  const message = error?.error?.message || error?.message || error?.error

  if (status === 401) {
    return 'API Key 无效、已过期，或没有当前模型权限'
  }

  if (status === 403) {
    return 'API Key 没有使用这个润色模型的权限，请先在 API 设置里检测并拉取模型'
  }

  if (status === 404) {
    return '当前润色模型不存在，请先在 API 设置里检测并选择可用问答模型'
  }

  if (status === 429) {
    return '请求过于频繁，请稍后再试'
  }

  return message || `润色请求失败：HTTP ${status}`
}
