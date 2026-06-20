/**
 * Image API | 图片生成 API
 */

import { API_KEY_PURPOSE_HEADER, API_KEY_PURPOSES, request } from '@/utils'

// 生成图片
export const generateImage = (data, options = {}) => {
  const { requestType = 'json', endpoint = '/images/generations' } = options
  
  return request({
    url: endpoint,
    method: 'post',
    data,
    headers: {
      ...(requestType === 'formdata' ? { 'Content-Type': 'multipart/form-data' } : {}),
      [API_KEY_PURPOSE_HEADER]: API_KEY_PURPOSES.IMAGE
    }
  })
}
