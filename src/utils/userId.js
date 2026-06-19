const USER_ID_KEY = 'longcheng-canvas-user-id'

export const getCanvasUserId = () => {
  let userId = localStorage.getItem(USER_ID_KEY)
  if (!userId) {
    const random = crypto?.randomUUID?.() || `${Date.now()}-${Math.random().toString(16).slice(2)}`
    userId = `user-${random}`
    localStorage.setItem(USER_ID_KEY, userId)
  }
  return userId
}
