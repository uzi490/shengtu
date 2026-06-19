import { getCanvasUserId } from '../utils/userId'

const assetRequest = async (path, options = {}) => {
  const response = await fetch(path, {
    ...options,
    headers: {
      'content-type': 'application/json',
      'x-canvas-user-id': getCanvasUserId(),
      ...(options.headers || {})
    }
  })

  const data = await response.json().catch(() => ({}))
  if (!response.ok) {
    throw new Error(data.error || '素材库请求失败')
  }
  return data
}

export const getAssetQuota = () => assetRequest('/api/assets/quota')

export const listAssets = ({ type = 'all', query = '' } = {}) => {
  const params = new URLSearchParams()
  if (type) params.set('type', type)
  if (query) params.set('query', query)
  return assetRequest(`/api/assets?${params.toString()}`)
}

export const registerTemporaryAsset = (payload) => {
  return assetRequest('/api/assets/register-temp', {
    method: 'POST',
    body: JSON.stringify(payload)
  })
}

export const saveAsset = (payload) => {
  return assetRequest('/api/assets/save', {
    method: 'POST',
    body: JSON.stringify(payload)
  })
}

export const reloadAsset = (assetId) => assetRequest(`/api/assets/${assetId}/reload`)

export const deleteAsset = (assetId) => {
  return assetRequest(`/api/assets/${assetId}`, {
    method: 'DELETE'
  })
}
