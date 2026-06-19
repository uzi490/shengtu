<template>
  <!-- Workflow panel | 工作流浮动面板 -->
  <Transition name="panel-slide">
    <div v-if="visible" class="workflow-panel" v-click-outside="handleClickOutside">
      <!-- Header | 头部 -->
      <div class="panel-header">
        <div class="panel-tabs">
          <span 
            class="tab-item" 
            :class="{ active: activeTab === 'public' }"
            @click="activeTab = 'public'"
          >公共工作流</span>
          <span 
            class="tab-item" 
            :class="{ active: activeTab === 'my' }"
            @click="activeTab = 'my'"
          >我的工作流</span>
          <span
            class="tab-item"
            :class="{ active: activeTab === 'ecommerce' }"
            @click="activeTab = 'ecommerce'"
          >电商提示词库</span>
        </div>
        <button class="expand-btn" @click="visible = false">
          <n-icon :size="16"><CloseOutline /></n-icon>
        </button>
      </div>
      
      <!-- Content | 内容 -->
      <div class="panel-content">
        <!-- Public workflows | 公共工作流 -->
        <div v-if="activeTab === 'public'" class="workflow-grid">
          <div 
            v-for="workflow in publicWorkflows" 
            :key="workflow.id"
            class="workflow-card"
            @click="handleAddWorkflow(workflow)"
          >
            <div class="card-cover">
              <img v-if="workflow.cover" :src="workflow.cover" :alt="workflow.name" class="cover-img" />
              <n-icon v-else :size="36" class="cover-icon">
                <component :is="getIcon(workflow.icon)" />
              </n-icon>
            </div>
            <div class="card-title">{{ workflow.name }}</div>
          </div>
        </div>

        <!-- Ecommerce prompt library | 电商提示词库 -->
        <div v-else-if="activeTab === 'ecommerce'" class="prompt-library">
          <div class="category-filter">
            <button
              v-for="category in ECOMMERCE_PROMPT_CATEGORIES"
              :key="category.id"
              class="category-chip"
              :class="{ active: activePromptCategory === category.id }"
              @click="activePromptCategory = category.id"
            >
              {{ category.name }}
            </button>
          </div>

          <div class="prompt-list">
            <button
              v-for="prompt in filteredEcommercePrompts"
              :key="prompt.id"
              class="prompt-card"
              @click="handleAddEcommercePrompt(prompt)"
            >
              <div class="prompt-card-main">
                <div class="prompt-title">{{ prompt.name }}</div>
                <div class="prompt-desc">{{ prompt.description }}</div>
              </div>
              <div class="prompt-meta">{{ getCategoryName(prompt.category) }}</div>
            </button>
          </div>
        </div>
        
        <!-- My workflows | 我的工作流 -->
        <div v-else class="empty-state">
          <n-icon :size="36" class="text-gray-500">
            <FolderOpenOutline />
          </n-icon>
          <p class="text-gray-500 text-sm mt-2">暂无自定义工作流</p>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
/**
 * Workflow Panel Component | 工作流面板组件
 * 显示工作流模板列表，支持一键添加到画布
 */
import { computed, ref } from 'vue'
import { NIcon } from 'naive-ui'
import { 
  CloseOutline,
  GridOutline, 
  ImageOutline, 
  VideocamOutline,
  FolderOpenOutline,
  BookOutline,
  PersonOutline,
  CartOutline,
  ChatbubbleOutline
} from '@vicons/ionicons5'
import { WORKFLOW_TEMPLATES } from '../config/workflows'
import {
  ECOMMERCE_PROMPT_CATEGORIES,
  getEcommercePromptsByCategory,
  createEcommercePromptWorkflow
} from '../config/ecommercePrompts'

const props = defineProps({
  show: Boolean
})

const emit = defineEmits(['update:show', 'add-workflow'])

// Active tab | 当前标签
const activeTab = ref('public')
const activePromptCategory = ref('all')

// Visible state | 显示状态
const visible = computed({
  get: () => props.show,
  set: (val) => emit('update:show', val)
})

// Public workflows | 公共工作流
const publicWorkflows = computed(() => WORKFLOW_TEMPLATES)

// Filtered ecommerce prompts | 筛选后的电商提示词
const filteredEcommercePrompts = computed(() => {
  return getEcommercePromptsByCategory(activePromptCategory.value)
})

// Icon mapping | 图标映射
const iconMap = {
  GridOutline,
  ImageOutline,
  VideocamOutline,
  BookOutline,
  PersonOutline,
  ShoppingOutline: CartOutline,
  ChatbubbleOutline
}

const getIcon = (iconName) => {
  return iconMap[iconName] || GridOutline
}

// Handle add workflow | 处理添加工作流
const handleAddWorkflow = (workflow) => {
  // 直接添加工作流，节点内容由用户自己填写
  emit('add-workflow', { workflow, options: {} })
  visible.value = false
}

// Handle add ecommerce prompt | 添加电商提示词模板
const handleAddEcommercePrompt = (prompt) => {
  emit('add-workflow', {
    workflow: createEcommercePromptWorkflow(prompt),
    options: {}
  })
  visible.value = false
}

// Category name | 分类名
const getCategoryName = (categoryId) => {
  return ECOMMERCE_PROMPT_CATEGORIES.find((category) => category.id === categoryId)?.name || '模板'
}

// Handle click outside | 点击外部关闭
const handleClickOutside = () => {
  visible.value = false
}

// Custom directive | 自定义指令
const vClickOutside = {
  mounted(el, binding) {
    el._clickOutside = (e) => {
      if (!el.contains(e.target)) {
        binding.value()
      }
    }
    setTimeout(() => {
      document.addEventListener('click', el._clickOutside)
    }, 0)
  },
  unmounted(el) {
    document.removeEventListener('click', el._clickOutside)
  }
}
</script>

<style scoped>
/* Panel container | 面板容器 */
.workflow-panel {
  position: fixed;
  left: 72px;
  top: 100px;
  width: 520px;
  max-height: 70vh;
  background: var(--bg-secondary);
  backdrop-filter: blur(12px);
  border-radius: 16px;
  border: 1px solid var(--border-color);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
  z-index: 100;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

:global(.dark) .workflow-panel {
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
}

/* Header | 头部 */
.panel-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px 12px;
  border-bottom: 1px solid var(--border-color);
}

.panel-tabs {
  display: flex;
  gap: 18px;
}

.tab-item {
  font-size: 15px;
  color: var(--text-secondary);
  cursor: pointer;
  transition: color 0.2s;
  padding-bottom: 4px;
}

.tab-item:hover {
  color: var(--text-primary);
}

.tab-item.active {
  color: var(--text-primary);
  font-weight: 500;
}

.expand-btn {
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg-tertiary);
  border: none;
  border-radius: 6px;
  color: var(--text-secondary);
  cursor: pointer;
  transition: all 0.2s;
}

.expand-btn:hover {
  background: var(--border-color);
  color: var(--text-primary);
}

/* Content | 内容区 */
.panel-content {
  flex: 1;
  overflow-y: auto;
  padding: 16px;
}

/* Workflow grid | 工作流网格 */
.workflow-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

/* Workflow card | 工作流卡片 */
.workflow-card {
  cursor: pointer;
  transition: transform 0.2s;
}

.workflow-card:hover {
  transform: translateY(-2px);
}

.workflow-card:hover .card-cover {
  border-color: var(--accent-color);
}

.card-cover {
  aspect-ratio: 1;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg-tertiary);
  border: 1px solid var(--border-color);
  transition: border-color 0.2s;
  overflow: hidden;
}

.cover-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.cover-icon {
  color: var(--text-secondary);
}

.card-title {
  margin-top: 10px;
  font-size: 13px;
  color: var(--text-primary);
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* Prompt library | 提示词库 */
.prompt-library {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.category-filter {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.category-chip {
  height: 28px;
  padding: 0 10px;
  border-radius: 7px;
  border: 1px solid var(--border-color);
  background: var(--bg-tertiary);
  color: var(--text-secondary);
  font-size: 12px;
  line-height: 26px;
  cursor: pointer;
  transition: all 0.2s;
}

.category-chip:hover,
.category-chip.active {
  border-color: var(--accent-color);
  color: var(--accent-color);
  background: rgba(64, 158, 255, 0.08);
}

.prompt-list {
  display: grid;
  grid-template-columns: 1fr;
  gap: 10px;
}

.prompt-card {
  width: 100%;
  min-height: 72px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 12px;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  background: var(--bg-tertiary);
  color: var(--text-primary);
  cursor: pointer;
  text-align: left;
  transition: all 0.2s;
}

.prompt-card:hover {
  border-color: var(--accent-color);
  transform: translateY(-1px);
}

.prompt-card-main {
  min-width: 0;
}

.prompt-title {
  font-size: 14px;
  font-weight: 600;
  color: var(--text-primary);
}

.prompt-desc {
  margin-top: 4px;
  font-size: 12px;
  line-height: 1.45;
  color: var(--text-secondary);
}

.prompt-meta {
  flex: 0 0 auto;
  padding: 4px 7px;
  border-radius: 6px;
  border: 1px solid var(--border-color);
  color: var(--text-secondary);
  font-size: 12px;
}

/* Empty state | 空状态 */
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 24px;
  text-align: center;
  color: var(--text-secondary);
}

/* Transition | 过渡动画 */
.panel-slide-enter-active,
.panel-slide-leave-active {
  transition: all 0.25s ease;
}

.panel-slide-enter-from,
.panel-slide-leave-to {
  opacity: 0;
  transform: translateX(-12px);
}

/* Scrollbar | 滚动条 */
.panel-content::-webkit-scrollbar {
  width: 6px;
}

.panel-content::-webkit-scrollbar-track {
  background: transparent;
}

.panel-content::-webkit-scrollbar-thumb {
  background: var(--border-color);
  border-radius: 3px;
}

.panel-content::-webkit-scrollbar-thumb:hover {
  background: var(--text-secondary);
}
</style>
