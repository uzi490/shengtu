/**
 * Main entry point | 主入口
 */
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import './style.css'

// localStorage数据迁移：xiaodao -> longcheng
function migrateProviderData() {
  // 1. 迁移 api-provider
  const provider = localStorage.getItem('api-provider')
  if (provider === 'xiaodao') {
    localStorage.setItem('api-provider', 'longcheng')
  }

  // 2. 迁移 api-keys-by-provider
  const apiKeysJson = localStorage.getItem('api-keys-by-provider')
  if (apiKeysJson) {
    try {
      const apiKeys = JSON.parse(apiKeysJson)
      if (apiKeys.xiaodao) {
        apiKeys.longcheng = apiKeys.xiaodao
        delete apiKeys.xiaodao
        localStorage.setItem('api-keys-by-provider', JSON.stringify(apiKeys))
      }
    } catch (e) {
      console.warn('Failed to migrate api-keys-by-provider:', e)
    }
  }

  // 3. 迁移 base-urls-by-provider
  const baseUrlsJson = localStorage.getItem('base-urls-by-provider')
  if (baseUrlsJson) {
    try {
      const baseUrls = JSON.parse(baseUrlsJson)
      if (baseUrls.xiaodao) {
        baseUrls.longcheng = baseUrls.xiaodao
        delete baseUrls.xiaodao
        localStorage.setItem('base-urls-by-provider', JSON.stringify(baseUrls))
      }
    } catch (e) {
      console.warn('Failed to migrate base-urls-by-provider:', e)
    }
  }

  // 4. 迁移自定义模型配置
  const migrateModels = (key) => {
    const json = localStorage.getItem(key)
    if (json) {
      try {
        const data = JSON.parse(json)
        if (data.xiaodao) {
          data.longcheng = data.xiaodao
          delete data.xiaodao
          localStorage.setItem(key, JSON.stringify(data))
        }
      } catch (e) {
        console.warn(`Failed to migrate ${key}:`, e)
      }
    }
  }
  migrateModels('custom-chat-models-by-provider')
  migrateModels('custom-image-models-by-provider')
  migrateModels('custom-video-models-by-provider')
}

// 执行迁移
migrateProviderData()

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)
app.mount('#app')
