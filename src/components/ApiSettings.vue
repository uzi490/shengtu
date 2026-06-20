<template>
  <!-- API Settings Modal | API 设置弹窗 -->
  <n-modal v-model:show="showModal" preset="card" title="API 设置" style="width: 560px;">
    <n-tabs type="line" animated>
      <!-- API 配置标签 -->
      <n-tab-pane name="api" tab="API 配置">
        <n-form ref="formRef" :model="formData" label-placement="left" label-width="80">
          <n-form-item label="渠道" path="provider">
            <n-select
              v-model:value="formData.provider"
              :options="providerOptions"
              placeholder="选择 API 渠道"
              disabled
            />
          </n-form-item>
          <n-form-item label="Base URL" path="baseUrl">
            <n-input
              v-model:value="formData.baseUrl"
              placeholder="/api/ai"
              readonly
              disabled
            />
            <template #feedback>
              <span class="text-xs text-[var(--text-secondary)]">已锁定为本站后端代理，请求会走服务器内网中转。</span>
            </template>
          </n-form-item>
          <n-form-item label="通用 Key" path="apiKey">
            <n-input
              v-model:value="formData.apiKey"
              type="password"
              show-password-on="click"
              placeholder="粘贴你的 AIAIAI API Key"
              clearable
            />
            <template #feedback>
              <span class="text-xs text-[var(--text-secondary)]">普通用户只填这里即可。下面的专用 Key 为空时，会自动回退使用通用 Key。</span>
            </template>
          </n-form-item>

          <div class="purpose-key-list">
            <div class="purpose-key-item">
              <div class="purpose-key-copy">
                <div class="purpose-key-title">文本 Key</div>
                <div class="purpose-key-desc">AI 润色、提示词生成、工作流生成使用</div>
              </div>
              <n-input
                v-model:value="formData.chatApiKey"
                type="password"
                show-password-on="click"
                placeholder="可选：专门给文本模型的 Key"
                clearable
              />
            </div>
            <div class="purpose-key-item">
              <div class="purpose-key-copy">
                <div class="purpose-key-title">图片 Key</div>
                <div class="purpose-key-desc">文生图、图生图使用，建议绑定 GPT-Image 分组</div>
              </div>
              <n-input
                v-model:value="formData.imageApiKey"
                type="password"
                show-password-on="click"
                placeholder="可选：专门给 gpt-image-2 的 Key"
                clearable
              />
            </div>
            <div class="purpose-key-item">
              <div class="purpose-key-copy">
                <div class="purpose-key-title">视频 Key</div>
                <div class="purpose-key-desc">视频生成和任务查询使用</div>
              </div>
              <n-input
                v-model:value="formData.videoApiKey"
                type="password"
                show-password-on="click"
                placeholder="可选：专门给视频模型的 Key"
                clearable
              />
            </div>
            <div class="purpose-key-item">
              <div class="purpose-key-copy">
                <div class="purpose-key-title">音频 Key</div>
                <div class="purpose-key-desc">预留给后续语音/音乐功能</div>
              </div>
              <n-input
                v-model:value="formData.audioApiKey"
                type="password"
                show-password-on="click"
                placeholder="可选：当前版本先保存备用"
                clearable
              />
            </div>
          </div>

          <div class="model-detection-card">
            <div class="model-detection-header">
              <div>
                <div class="model-detection-title">检测 Key 并拉取模型</div>
                <div class="model-detection-desc">先用通用 Key 检测；如果图片/视频填了专用 Key，也可以分别检测对应权限。</div>
              </div>
              <div class="model-detection-actions">
                <n-button
                  type="primary"
                  secondary
                  size="small"
                  :loading="detectingModels"
                  :disabled="!formData.apiKey.trim()"
                  @click="handleDetectModels('default')"
                >
                  检测通用
                </n-button>
                <n-button
                  secondary
                  size="small"
                  :loading="detectingModels"
                  :disabled="!formData.chatApiKey.trim()"
                  @click="handleDetectModels('chat')"
                >
                  文本
                </n-button>
                <n-button
                  secondary
                  size="small"
                  :loading="detectingModels"
                  :disabled="!formData.imageApiKey.trim()"
                  @click="handleDetectModels('image')"
                >
                  图片
                </n-button>
                <n-button
                  secondary
                  size="small"
                  :loading="detectingModels"
                  :disabled="!formData.videoApiKey.trim()"
                  @click="handleDetectModels('video')"
                >
                  视频
                </n-button>
              </div>
            </div>
            <n-alert v-if="modelDetection.message" :type="modelDetection.type" class="mt-3">
              {{ modelDetection.message }}
            </n-alert>
          </div>

          <n-divider title-placement="left" class="!my-3">
            <span class="text-xs text-[var(--text-secondary)]">端点路径</span>
          </n-divider>
          
          <div class="endpoint-list">
            <div class="endpoint-item">
              <span class="endpoint-label">问答</span>
              <n-tag size="small" type="info" class="endpoint-tag">{{ currentEndpoints.chat }}</n-tag>
            </div>
            <div class="endpoint-item">
              <span class="endpoint-label">生图</span>
              <n-tag size="small" type="success" class="endpoint-tag">{{ currentEndpoints.image }}</n-tag>
            </div>
            <div class="endpoint-item">
              <span class="endpoint-label">视频生成</span>
              <n-tag size="small" type="warning" class="endpoint-tag">{{ currentEndpoints.video }}</n-tag>
            </div>
            <div class="endpoint-item">
              <span class="endpoint-label">视频查询</span>
              <n-tag size="small" type="warning" class="endpoint-tag">{{ currentEndpoints.videoQuery }}</n-tag>
            </div>
          </div>

          <n-alert type="info" title="按你的 API Key 扣费" class="mb-4">
            这里填写的是你自己的 AIAIAI Key。Canvas 只通过本站后端代理转发请求，不再使用站长的统一 Key。
          </n-alert>
        </n-form>
      </n-tab-pane>

      <!-- 模型配置标签 -->
      <n-tab-pane name="models" tab="模型配置">
        <div class="model-config-section">
          <!-- 问答模型 -->
          <div class="model-group">
            <div class="model-group-header">
              <span class="model-group-title">问答模型</span>
              <n-tag size="tiny" type="info">{{ allChatModels.length }} 个</n-tag>
            </div>
            <n-select
              :value="modelStore.selectedChatModel"
              :options="allChatModelOptions"
              size="small"
              filterable
              placeholder="选择 AI 润色/文本生成模型"
              class="mb-2"
              @update:value="modelStore.setSelectedChatModel"
            />
            <div class="model-input-row">
              <n-input
                v-model:value="newChatModel"
                placeholder="输入模型名称，如 gpt-4o"
                size="small"
                @keyup.enter="handleAddChatModel"
              />
              <n-button size="small" type="primary" @click="handleAddChatModel" :disabled="!newChatModel">
                添加
              </n-button>
            </div>
            <div class="model-tags">
              <n-tag
                v-for="model in allChatModels"
                :key="model.key"
                size="small"
                :closable="model.isCustom"
                :type="model.isCustom ? 'info' : 'default'"
                @close="handleRemoveChatModel(model.key)"
              >
                {{ model.label }}
              </n-tag>
            </div>
          </div>

          <!-- 图片模型 -->
          <div class="model-group">
            <div class="model-group-header">
              <span class="model-group-title">图片模型</span>
              <n-tag size="tiny" type="success">{{ allImageModels.length }} 个</n-tag>
            </div>
            <n-select
              :value="modelStore.selectedImageModel"
              :options="allImageModelOptions"
              size="small"
              filterable
              placeholder="选择默认生图模型"
              class="mb-2"
              @update:value="modelStore.setSelectedImageModel"
            />
            <div class="model-input-row">
              <n-input
                v-model:value="newImageModel"
                placeholder="输入模型名称，如 dall-e-3"
                size="small"
                @keyup.enter="handleAddImageModel"
              />
              <n-button size="small" type="primary" @click="handleAddImageModel" :disabled="!newImageModel">
                添加
              </n-button>
            </div>
            <div class="model-tags">
              <n-tag
                v-for="model in allImageModels"
                :key="model.key"
                size="small"
                :closable="model.isCustom"
                :type="model.isCustom ? 'success' : 'default'"
                @close="handleRemoveImageModel(model.key)"
              >
                {{ model.label }}
              </n-tag>
            </div>
          </div>

          <!-- 视频模型 -->
          <div class="model-group">
            <div class="model-group-header">
              <span class="model-group-title">视频模型</span>
              <n-tag size="tiny" type="warning">{{ allVideoModels.length }} 个</n-tag>
            </div>
            <n-select
              :value="modelStore.selectedVideoModel"
              :options="allVideoModelOptions"
              size="small"
              filterable
              placeholder="选择默认视频模型"
              class="mb-2"
              @update:value="modelStore.setSelectedVideoModel"
            />
            <div class="model-input-row">
              <n-input
                v-model:value="newVideoModel"
                placeholder="输入模型名称，如 sora-2"
                size="small"
                @keyup.enter="handleAddVideoModel"
              />
              <n-button size="small" type="primary" @click="handleAddVideoModel" :disabled="!newVideoModel">
                添加
              </n-button>
            </div>
            <div class="model-tags">
              <n-tag
                v-for="model in allVideoModels"
                :key="model.key"
                size="small"
                :closable="model.isCustom"
                :type="model.isCustom ? 'warning' : 'default'"
                @close="handleRemoveVideoModel(model.key)"
              >
                {{ model.label }}
              </n-tag>
            </div>
          </div>
        </div>
      </n-tab-pane>
    </n-tabs>

    <template #footer>
      <div class="flex justify-between items-center">
        <span class="text-xs text-[var(--text-secondary)]">{{ isConfigured ? '已配置用户 API Key' : '未配置 API Key' }}</span>
        <div class="flex gap-2">
          <n-button @click="handleClear" tertiary>清除配置</n-button>
          <n-button @click="showModal = false">取消</n-button>
          <n-button type="primary" @click="handleSave">保存</n-button>
        </div>
      </div>
    </template>
  </n-modal>
</template>

<script setup>
/**
 * API Settings Component | API 设置组件
 * Modal for configuring API key, base URL, and custom models
 */
import { ref, reactive, watch, computed } from 'vue'
import { NModal, NForm, NFormItem, NInput, NButton, NAlert, NDivider, NTag, NTabs, NTabPane, NSelect } from 'naive-ui'
import { useModelStore } from '../stores/pinia'
import { getProviderConfig, LOCKED_PROVIDER, LOCKED_API_BASE_URL } from '../config/providers'
import { fetchAvailableModels, classifyModels } from '../api/modelDiscovery'

// Props | 属性
const props = defineProps({
  show: {
    type: Boolean,
    default: false
  }
})

// Emits | 事件
const emit = defineEmits(['update:show', 'saved'])

// Model Store (Pinia) | 模型配置 Store
const modelStore = useModelStore()

// API Config 状态
const isConfigured = computed(() => modelStore.hasAnyApiKey)

// Provider options for select | 渠道下拉选项
const providerOptions = modelStore.providerList.map(p => ({
  label: p.label,
  value: p.key
}))

// 当前渠道的端点路径
const currentEndpoints = computed(() => {
  const config = getProviderConfig(formData.provider)
  return config.endpoints || {
    chat: '/chat/completions',
    image: '/v1/images/generations',
    video: '/v1/videos',
    videoQuery: '/v1/videos/{taskId}'
  }
})

// 全局模型列表（不区分渠道）
const allChatModels = computed(() => modelStore.allChatModels)
const allImageModels = computed(() => modelStore.allImageModels)
const allVideoModels = computed(() => modelStore.allVideoModels)
const allChatModelOptions = computed(() => modelStore.allChatModelOptions)
const allImageModelOptions = computed(() => modelStore.allImageModelOptions)
const allVideoModelOptions = computed(() => modelStore.allVideoModelOptions)

// Modal visibility | 弹窗可见性
const showModal = ref(props.show)

// Form data | 表单数据
const formData = reactive({
  provider: LOCKED_PROVIDER,
  apiKey: '',
  chatApiKey: '',
  imageApiKey: '',
  videoApiKey: '',
  audioApiKey: '',
  baseUrl: LOCKED_API_BASE_URL
})

// New model inputs | 新模型输入
const newChatModel = ref('')
const newImageModel = ref('')
const newVideoModel = ref('')
const detectingModels = ref(false)
const modelDetection = reactive({
  type: 'info',
  message: ''
})

// 初始化或切换渠道时，更新 API 配置
const updateFormApiConfig = () => {
  formData.provider = LOCKED_PROVIDER
  formData.apiKey = modelStore.currentApiKey
  formData.chatApiKey = modelStore.currentChatApiKey
  formData.imageApiKey = modelStore.currentImageApiKey
  formData.videoApiKey = modelStore.currentVideoApiKey
  formData.audioApiKey = modelStore.currentAudioApiKey
  formData.baseUrl = LOCKED_API_BASE_URL
}

// Watch prop changes | 监听属性变化
watch(() => props.show, (val) => {
  showModal.value = val
  if (val) {
    formData.provider = LOCKED_PROVIDER
    updateFormApiConfig()
  }
})

// 监听渠道变化，更新表单中的 API 配置
watch(() => formData.provider, () => {
  updateFormApiConfig()
})

// Watch modal changes | 监听弹窗变化
watch(showModal, (val) => {
  emit('update:show', val)
})

// Handle add models | 处理添加模型
const handleAddChatModel = () => {
  if (newChatModel.value.trim()) {
    modelStore.addCustomChatModel(newChatModel.value.trim())
    newChatModel.value = ''
  }
}

const handleAddImageModel = () => {
  if (newImageModel.value.trim()) {
    modelStore.addCustomImageModel(newImageModel.value.trim())
    newImageModel.value = ''
  }
}

const handleAddVideoModel = () => {
  if (newVideoModel.value.trim()) {
    modelStore.addCustomVideoModel(newVideoModel.value.trim())
    newVideoModel.value = ''
  }
}

// Handle remove models | 处理删除模型
const handleRemoveChatModel = (modelKey) => {
  modelStore.removeCustomChatModel(modelKey)
}

const handleRemoveImageModel = (modelKey) => {
  modelStore.removeCustomImageModel(modelKey)
}

const handleRemoveVideoModel = (modelKey) => {
  modelStore.removeCustomVideoModel(modelKey)
}

const getDetectionApiKey = (purpose) => {
  const keys = {
    chat: formData.chatApiKey,
    image: formData.imageApiKey,
    video: formData.videoApiKey,
    audio: formData.audioApiKey
  }
  return String(keys[purpose] || formData.apiKey || '').trim()
}

const getDetectionLabel = (purpose) => {
  const labels = {
    chat: '文本 Key',
    image: '图片 Key',
    video: '视频 Key',
    audio: '音频 Key'
  }
  return labels[purpose] || '通用 Key'
}

const handleDetectModels = async (purpose = 'default') => {
  const apiKey = getDetectionApiKey(purpose)
  if (!apiKey) {
    window.$message?.warning(`请先填写${getDetectionLabel(purpose)}`)
    return
  }

  detectingModels.value = true
  modelDetection.message = ''

  try {
    const models = await fetchAvailableModels(apiKey)
    const classified = classifyModels(models)

    modelStore.setProvider(LOCKED_PROVIDER)
    if (purpose === 'default') {
      modelStore.setApiKeyByProvider(LOCKED_PROVIDER, apiKey)
    } else {
      modelStore.setApiKeyByPurpose(purpose, apiKey)
    }
    modelStore.setBaseUrlByProvider(LOCKED_PROVIDER, LOCKED_API_BASE_URL)

    const addedChat = addDiscoveredModels(classified.chat, allChatModels.value, modelStore.addCustomChatModel)
    const addedImage = addDiscoveredModels(classified.image, allImageModels.value, modelStore.addCustomImageModel)
    const addedVideo = addDiscoveredModels(classified.video, allVideoModels.value, modelStore.addCustomVideoModel)

    if (classified.chat[0]) modelStore.setSelectedChatModel(classified.chat[0])
    if (classified.image[0]) modelStore.setSelectedImageModel(classified.image[0])
    if (classified.video[0]) modelStore.setSelectedVideoModel(classified.video[0])

    const parts = [
      `共拉到 ${models.length} 个模型`,
      `问答 ${classified.chat.length} 个`,
      `图片 ${classified.image.length} 个`,
      `视频 ${classified.video.length} 个`
    ]
    const addedTotal = addedChat + addedImage + addedVideo
    modelDetection.type = classified.image.length > 0 && classified.chat.length > 0 ? 'success' : 'warning'
    modelDetection.message = `${getDetectionLabel(purpose)}：${parts.join('，')}。已新增 ${addedTotal} 个自定义模型。${buildCapabilityTip(classified)}`
    window.$message?.success(`${getDetectionLabel(purpose)}可用，模型已拉取`)
  } catch (err) {
    modelDetection.type = 'error'
    modelDetection.message = err.message || '模型检测失败'
    window.$message?.error(modelDetection.message)
  } finally {
    detectingModels.value = false
  }
}

const addDiscoveredModels = (modelIds, existingModels, addFn) => {
  const existingKeys = new Set(existingModels.map(model => model.key))
  return modelIds.reduce((count, modelId) => {
    if (existingKeys.has(modelId)) return count
    existingKeys.add(modelId)
    return addFn(modelId) ? count + 1 : count
  }, 0)
}

const buildCapabilityTip = (classified) => {
  if (classified.chat.length === 0 && classified.image.length === 0) {
    return '没有识别到问答或图片模型，请检查 Key 的模型分组权限。'
  }
  if (classified.chat.length === 0) {
    return '没有识别到问答模型，AI 润色可能不能用。'
  }
  if (classified.image.length === 0) {
    return '没有识别到图片模型，生图可能不能用。'
  }
  return '后续润色会优先使用已选择的问答模型。'
}

// Handle save | 处理保存
const handleSave = () => {
  const apiKey = formData.apiKey.trim()
  const hasPurposeKey = [formData.chatApiKey, formData.imageApiKey, formData.videoApiKey, formData.audioApiKey]
    .some(key => String(key || '').trim())
  if (!apiKey && !hasPurposeKey) {
    window.$message?.warning('请至少填写一个 AIAIAI API Key')
    return
  }
  modelStore.setProvider(LOCKED_PROVIDER)
  modelStore.setApiKeyByProvider(LOCKED_PROVIDER, apiKey)
  modelStore.setApiKeyByPurpose('chat', formData.chatApiKey)
  modelStore.setApiKeyByPurpose('image', formData.imageApiKey)
  modelStore.setApiKeyByPurpose('video', formData.videoApiKey)
  modelStore.setApiKeyByPurpose('audio', formData.audioApiKey)
  modelStore.setBaseUrlByProvider(LOCKED_PROVIDER, LOCKED_API_BASE_URL)
  showModal.value = false
  emit('saved')
}

// Handle clear | 处理清除
const handleClear = () => {
  modelStore.clearApiConfigByProvider(LOCKED_PROVIDER)
  modelStore.clearCustomModels()
  formData.apiKey = ''
  formData.chatApiKey = ''
  formData.imageApiKey = ''
  formData.videoApiKey = ''
  formData.audioApiKey = ''
  formData.provider = LOCKED_PROVIDER
  formData.baseUrl = LOCKED_API_BASE_URL
}
</script>

<style scoped>
.endpoint-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 16px;
  padding: 12px;
  background: var(--bg-secondary, #f5f5f5);
  border-radius: 6px;
}

.purpose-key-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 14px;
}

.purpose-key-item {
  display: grid;
  grid-template-columns: minmax(128px, 0.42fr) minmax(0, 1fr);
  align-items: center;
  gap: 12px;
  padding: 10px 12px;
  background: var(--bg-secondary, #f5f5f5);
  border: 1px solid var(--border-color, #e5e7eb);
  border-radius: 8px;
}

.purpose-key-copy {
  min-width: 0;
}

.purpose-key-title {
  font-size: 13px;
  font-weight: 600;
  color: var(--text-primary, #333);
}

.purpose-key-desc {
  margin-top: 2px;
  font-size: 12px;
  line-height: 1.4;
  color: var(--text-secondary, #666);
}

.endpoint-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.endpoint-label {
  font-size: 13px;
  color: var(--text-secondary, #666);
  min-width: 70px;
}

.endpoint-tag {
  font-family: monospace;
  font-size: 12px;
}

.model-config-section {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.model-detection-card {
  padding: 12px;
  margin-bottom: 14px;
  background: var(--bg-secondary, #f5f5f5);
  border: 1px solid var(--border-color, #e5e7eb);
  border-radius: 8px;
}

.model-detection-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.model-detection-actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 8px;
  min-width: 190px;
}

.model-detection-title {
  font-size: 14px;
  font-weight: 600;
  color: var(--text-primary, #333);
}

.model-detection-desc {
  margin-top: 4px;
  font-size: 12px;
  line-height: 1.5;
  color: var(--text-secondary, #666);
}

.model-group {
  padding: 12px;
  background: var(--bg-secondary, #f5f5f5);
  border-radius: 8px;
}

.model-group-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 10px;
}

.model-group-title {
  font-size: 14px;
  font-weight: 500;
  color: var(--text-primary, #333);
}

.model-input-row {
  display: flex;
  gap: 8px;
  margin-bottom: 8px;
}

.model-input-row .n-input {
  flex: 1;
}

.model-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 8px;
}

@media (max-width: 640px) {
  .purpose-key-item {
    grid-template-columns: 1fr;
  }

  .model-detection-header {
    align-items: flex-start;
    flex-direction: column;
  }

  .model-detection-actions {
    justify-content: flex-start;
    min-width: 0;
  }
}
</style>
