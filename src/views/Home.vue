<template>
  <!-- Home page | 首页 -->
  <div class="min-h-screen h-screen overflow-y-auto bg-[var(--bg-primary)]">
    <!-- Header | 顶部导航 -->
    <AppHeader>
      <template #right>
        <button 
          @click="showApiSettings = true"
          class="p-2 hover:bg-[var(--bg-tertiary)] rounded-lg transition-colors"
          :class="{ 'text-[var(--accent-color)]': isApiConfigured }"
          title="API 设置"
        >
          <n-icon :size="20"><SettingsOutline /></n-icon>
        </button>
      </template>
    </AppHeader>

    <!-- Main content | 主要内容 -->
    <main class="max-w-6xl mx-auto px-4 py-6 md:py-10">
      <section class="mb-8 rounded-xl border border-[var(--border-color)] bg-[var(--bg-secondary)] p-5 shadow-sm">
        <div class="flex flex-col gap-5">
          <div class="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
            <div>
              <p class="text-xs font-semibold text-[var(--accent-color)]">公告栏</p>
              <h2 class="mt-1 text-lg font-semibold text-[var(--text-primary)]">加入 AIAIAI 工具箱交流群</h2>
              <p class="mt-1 text-sm text-[var(--text-secondary)]">QQ群、飞书群、微信群都已开放，后续功能更新、模型问题和工作流模板会优先同步。</p>
            </div>
            <button
              type="button"
              @click="toggleCommunityNotice"
              class="inline-flex h-9 shrink-0 items-center justify-center gap-1.5 rounded-lg border border-[var(--border-color)] bg-[var(--bg-primary)] px-3 text-sm text-[var(--text-primary)] transition-colors hover:border-[var(--accent-color)]"
              :aria-expanded="isCommunityNoticeExpanded"
              aria-controls="community-groups"
            >
              <n-icon :size="16">
                <ChevronUpOutline v-if="isCommunityNoticeExpanded" />
                <ChevronDownOutline v-else />
              </n-icon>
              {{ isCommunityNoticeExpanded ? '收起' : '展开' }}
            </button>
          </div>
          <div
            v-if="isCommunityNoticeExpanded"
            id="community-groups"
            class="grid grid-cols-1 gap-4 md:grid-cols-3"
          >
            <div
              v-for="group in communityGroups"
              :key="group.name"
              class="rounded-lg border border-[var(--border-color)] bg-[var(--bg-primary)] p-3 text-center"
            >
              <img :src="group.image" :alt="group.name" class="mx-auto aspect-square w-full max-w-[260px] rounded-md bg-white object-contain" />
              <p class="mt-2 text-sm font-medium text-[var(--text-primary)]">{{ group.name }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Welcome section | 欢迎区域 -->
      <section class="text-center mb-12">
        <div class="flex flex-col items-center justify-center gap-4 mb-8 md:flex-row">
          <img src="../assets/logo.png" alt="AIAIAI工具箱" class="w-24 h-24 md:w-32 md:h-32 object-contain" />
          <h1 class="text-2xl md:text-4xl font-bold text-[var(--text-primary)]">欢迎来到AIAIAI工具箱的无限画布工坊</h1>
        </div>
        
        <!-- Input area | 输入区域 -->
        <div class="max-w-2xl mx-auto">
          <div class="bg-[var(--bg-secondary)] rounded-2xl border border-[var(--border-color)] p-4 shadow-sm">
            <textarea
              v-model="inputText"
              placeholder="输入你的创意，开始新工作流"
              class="w-full bg-transparent resize-none outline-none text-[var(--text-primary)] placeholder:text-[var(--text-secondary)] min-h-[80px]"
              @keydown.enter.ctrl="handleCreateWithInput"
              @input="selectedEcommercePromptId = ''"
            />
            <div class="flex items-center justify-between mt-2">
              <div class="flex items-center gap-2">
                <!-- <button class="p-2 hover:bg-[var(--bg-tertiary)] rounded-lg transition-colors">
                  <n-icon :size="18"><AddOutline /></n-icon>
                </button>
                <button class="p-2 hover:bg-[var(--bg-tertiary)] rounded-lg transition-colors">
                  <n-icon :size="18"><ImageOutline /></n-icon>
                </button> -->
              </div>
              <div class="flex items-center gap-3">
                <button 
                  @click="handleCreateWithInput"
                  class="w-8 h-8 rounded-xl bg-[var(--accent-color)] hover:bg-[var(--accent-hover)] flex items-center justify-center transition-colors"
                >
                  <n-icon :size="20" color="white"><SendOutline /></n-icon>
                </button>
              </div>
            </div>
          </div>
          
          <!-- Quick suggestions | 快捷建议 -->
          <div class="flex flex-wrap items-center justify-center gap-2 mt-4">
            <span class="text-sm text-[var(--text-secondary)]">电商工作流推荐：</span>
            <button 
              v-for="tag in suggestions" 
              :key="tag.id"
              @click="selectEcommerceSuggestion(tag)"
              class="px-3 py-1.5 text-sm rounded-full bg-[var(--bg-secondary)] border border-[var(--border-color)] hover:border-[var(--accent-color)] transition-colors"
            >
              {{ tag.name }}：{{ tag.description }}
            </button>
            <button class="p-1.5 hover:bg-[var(--bg-tertiary)] rounded-lg transition-colors">
              <n-icon :size="16"><RefreshOutline /></n-icon>
            </button>
          </div>
        </div>
      </section>

      <!-- My projects section | 我的项目区域 -->
      <section ref="projectsSection">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-lg font-semibold text-[var(--text-primary)]">我的工作流</h2>
          <div class="flex items-center gap-2">
            <button 
              @click="triggerImport"
              class="flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-lg bg-[var(--bg-secondary)] hover:bg-[var(--bg-tertiary)] border border-[var(--border-color)] transition-colors"
            >
              <n-icon :size="16"><CloudUploadOutline /></n-icon>
              导入工作流
            </button>
            <button 
              @click="createNewProject"
              class="flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-lg bg-[var(--accent-color)] hover:bg-[var(--accent-hover)] text-white transition-colors"
            >
              <n-icon :size="16"><AddOutline /></n-icon>
              新建工作流
            </button>
          </div>
        </div>
        
        <!-- Empty state | 空状态 -->
        <div v-if="projects.length === 0" class="text-center py-12 bg-[var(--bg-secondary)] rounded-xl border border-dashed border-[var(--border-color)]">
          <n-icon :size="48" class="text-[var(--text-secondary)] mb-4"><FolderOutline /></n-icon>
          <p class="text-[var(--text-secondary)] mb-4">还没有工作流，创建一个开始吧</p>
          <button 
            @click="createNewProject"
            class="px-4 py-2 text-sm rounded-lg bg-[var(--accent-color)] hover:bg-[var(--accent-hover)] text-white transition-colors"
          >
            创建第一个工作流
          </button>
        </div>
        
        <!-- Projects grid | 项目网格 -->
        <div v-else class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div 
            v-for="project in projects" 
            :key="project.id"
            class="group relative"
          >
            <!-- Project card | 项目卡片 -->
            <div 
              @click="openProject(project)"
              class="cursor-pointer"
            >
              <div 
                class="aspect-video rounded-xl overflow-hidden bg-[var(--bg-tertiary)] mb-2 border border-[var(--border-color)] relative"
                @mouseenter="handleThumbnailHover(project, true)"
                @mouseleave="handleThumbnailHover(project, false)"
              >
                <!-- Thumbnail or placeholder | 缩略图或占位 -->
                <template v-if="project.thumbnail">
                  <!-- Video thumbnail | 视频缩略图 -->
                  <video 
                    v-if="isVideoUrl(project.thumbnail)"
                    :ref="el => setVideoRef(project.id, el)"
                    :src="project.thumbnail"
                    class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    muted
                    loop
                    playsinline
                  />
                  <!-- Image thumbnail | 图片缩略图 -->
                  <img 
                    v-else
                    :src="project.thumbnail" 
                    :alt="project.name"
                    class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </template>
                <div v-else class="w-full h-full flex items-center justify-center">
                  <n-icon :size="32" class="text-[var(--text-secondary)]"><DocumentOutline /></n-icon>
                </div>
                
                <!-- Hover overlay | 悬浮遮罩 -->
                <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span class="text-white text-sm">打开工作流</span>
                </div>
              </div>
              <p class="text-sm text-[var(--text-primary)] truncate">{{ project.name }}</p>
              <p class="text-xs text-[var(--text-secondary)]">{{ formatDate(project.updatedAt) }}</p>
            </div>
            
            <!-- Project actions | 项目操作 -->
            <div class="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
              <n-dropdown :options="getProjectActions(project)" @select="(key) => handleProjectAction(key, project)" placement="bottom-end">
                <button 
                  @click.stop
                  class="p-1.5 bg-white/90 dark:bg-gray-800/90 rounded-lg shadow hover:bg-white dark:hover:bg-gray-800 transition-colors"
                >
                  <n-icon :size="16"><EllipsisHorizontalOutline /></n-icon>
                </button>
              </n-dropdown>
            </div>
          </div>
        </div>
      </section>
    </main>

    <!-- Left sidebar | 左侧边栏 -->
    <aside class="fixed left-4 top-1/2 -translate-y-1/2 hidden md:flex flex-col gap-2 p-2 bg-[var(--bg-secondary)] rounded-xl border border-[var(--border-color)] shadow-sm">
      <button 
        @click="createNewProject"
        class="p-2 hover:bg-[var(--bg-tertiary)] rounded-lg transition-colors"
        title="新建工作流"
      >
        <n-icon :size="20"><DocumentOutline /></n-icon>
      </button>
      <button 
        @click="scrollToProjects"
        class="p-2 hover:bg-[var(--bg-tertiary)] rounded-lg transition-colors"
        title="我的工作流"
      >
        <n-icon :size="20"><FolderOutline /></n-icon>
      </button>
    </aside>

    <!-- API Settings Modal | API 设置弹窗 -->
    <ApiSettings v-model:show="showApiSettings" @saved="refreshApiConfig" />

    <!-- Rename modal | 重命名弹窗 -->
    <n-modal v-model:show="showRenameModal" preset="dialog" title="重命名工作流">
      <n-input v-model:value="renameValue" placeholder="请输入工作流名称" />
      <template #action>
        <n-button @click="showRenameModal = false">取消</n-button>
        <n-button type="primary" @click="confirmRename">确定</n-button>
      </template>
    </n-modal>

    <!-- Hidden file input for import | 隐藏的文件导入输入 -->
    <input
      ref="importFileInput"
      type="file"
      accept=".json,application/json"
      class="hidden"
      @change="handleFileImport"
    />
  </div>
</template>

<script setup>
/**
 * Home view component | 首页视图组件
 * Entry point with project list and creation input
 */
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { NIcon, NDropdown, NModal, NInput, NButton, useDialog } from 'naive-ui'
import { 
  AddOutline, 
  ImageOutline, 
  SendOutline,
  RefreshOutline,
  DocumentOutline,
  FolderOutline,
  EllipsisHorizontalOutline,
  CreateOutline,
  CopyOutline,
  SettingsOutline,
  TrashOutline,
  CloudUploadOutline,
  DownloadOutline,
  ChevronDownOutline,
  ChevronUpOutline
} from '@vicons/ionicons5'
import { 
  projects, 
  initProjectsStore, 
  createProject, 
  deleteProject, 
  duplicateProject, 
  renameProject,
  exportProject,
  importProject
} from '../stores/projects'
import { useModelStore } from '../stores/pinia'
import ApiSettings from '../components/ApiSettings.vue'
import AppHeader from '../components/AppHeader.vue'
import feishuGroupImage from '../assets/feishu-group.png'
import qqGroupImage from '../assets/qq-group.png'
import wechatGroupImage from '../assets/wechat-group.png'
import { ECOMMERCE_PROMPTS } from '../config/ecommercePrompts'

const router = useRouter()
const dialog = useDialog()
const modelStore = useModelStore()

// API Settings state | API 设置状态
const showApiSettings = ref(false)
const isApiConfigured = computed(() => !!modelStore.currentApiKey)

// Refresh API config state | 刷新 API 配置状态
const refreshApiConfig = () => {
  // 通过 computed 自动更新，不需要手动刷新
}

// Video refs for hover play | 视频引用用于悬停播放
const videoRefs = new Map()

// Set video ref | 设置视频引用
const setVideoRef = (projectId, el) => {
  if (el) {
    videoRefs.set(projectId, el)
  } else {
    videoRefs.delete(projectId)
  }
}

// Handle thumbnail hover | 处理缩略图悬停
const handleThumbnailHover = (project, isHovering) => {
  if (!isVideoUrl(project.thumbnail)) return
  
  const video = videoRefs.get(project.id)
  if (!video) return
  
  if (isHovering) {
    video.play().catch(() => {
      // Ignore play errors (e.g., autoplay policy)
    })
  } else {
    video.pause()
    video.currentTime = 0 // Reset to start
  }
}

// Input state | 输入状态
const inputText = ref('')
const selectedEcommercePromptId = ref('')
const isCommunityNoticeExpanded = ref(true)

const communityGroups = [
  { name: 'QQ群', note: '交流2群', image: qqGroupImage },
  { name: '飞书群', note: '长期有效', image: feishuGroupImage },
  { name: '微信群', note: '定期更新', image: wechatGroupImage }
]

const toggleCommunityNotice = () => {
  isCommunityNoticeExpanded.value = !isCommunityNoticeExpanded.value
}

// Rename modal state | 重命名弹窗状态
const showRenameModal = ref(false)
const renameValue = ref('')
const renameTargetId = ref(null)

// Suggestions tags | 建议标签
const suggestions = ECOMMERCE_PROMPTS.slice(0, 5)

const selectEcommerceSuggestion = (template) => {
  selectedEcommercePromptId.value = template.id
  inputText.value = template.prompt
}

// Format date | 格式化日期
const formatDate = (date) => {
  if (!date) return ''
  const d = new Date(date)
  const now = new Date()
  const diff = now - d
  
  // Less than 1 minute | 小于1分钟
  if (diff < 60000) return '刚刚'
  // Less than 1 hour | 小于1小时
  if (diff < 3600000) return `${Math.floor(diff / 60000)}分钟前`
  // Less than 1 day | 小于1天
  if (diff < 86400000) return `${Math.floor(diff / 3600000)}小时前`
  // Less than 7 days | 小于7天
  if (diff < 604800000) return `${Math.floor(diff / 86400000)}天前`
  // Format as date | 格式化为日期
  return `${d.getMonth() + 1}/${d.getDate()}`
}

// Get project actions | 获取项目操作选项
const getProjectActions = (project) => [
  { label: '导出', key: 'export', icon: () => h(NIcon, null, { default: () => h(DownloadOutline) }) },
  { label: '重命名', key: 'rename', icon: () => h(NIcon, null, { default: () => h(CreateOutline) }) },
  { label: '复制', key: 'duplicate', icon: () => h(NIcon, null, { default: () => h(CopyOutline) }) },
  { type: 'divider' },
  { label: '删除', key: 'delete', icon: () => h(NIcon, null, { default: () => h(TrashOutline) }) }
]

// Handle project action | 处理项目操作
const handleProjectAction = (key, project) => {
  switch (key) {
    case 'export':
      try {
        exportProject(project.id)
        window.$message?.success('工作流已导出')
      } catch (err) {
        window.$message?.error(err.message || '导出失败')
      }
      break
    case 'rename':
      renameTargetId.value = project.id
      renameValue.value = project.name
      showRenameModal.value = true
      break
    case 'duplicate':
      const newId = duplicateProject(project.id)
      if (newId) {
        window.$message?.success('工作流已复制')
      }
      break
    case 'delete':
      dialog.warning({
        title: '删除工作流',
        content: `确定要删除工作流「${project.name}」吗？此操作不可恢复。`,
        positiveText: '删除',
        negativeText: '取消',
        onPositiveClick: () => {
          deleteProject(project.id)
          window.$message?.success('工作流已删除')
        }
      })
      break
  }
}

// Confirm rename | 确认重命名
const confirmRename = () => {
  if (renameTargetId.value && renameValue.value.trim()) {
    renameProject(renameTargetId.value, renameValue.value.trim())
    window.$message?.success('已重命名')
  }
  showRenameModal.value = false
  renameTargetId.value = null
  renameValue.value = ''
}

// Check API key before navigation | 跳转前检查 API Key
const checkApiKeyAndNavigate = (callback) => {
  
  if (!isApiConfigured.value) {
    dialog.warning({
      title: '需要 API Key',
      content: '请先填写你的 AIAIAI API Key，再开始使用商图工坊。',
      positiveText: '知道了'
    })
    return false
  }
  callback()
  return true
}

// Create new workflow | 创建新工作流
const createNewProject = () => {
  checkApiKeyAndNavigate(() => {
    const id = createProject('未命名工作流')
    router.push(`/canvas/${id}`)
  })
}

// Create workflow with input text | 使用输入文本创建工作流
const handleCreateWithInput = () => {
  checkApiKeyAndNavigate(() => {
    const selectedTemplate = ECOMMERCE_PROMPTS.find(item => item.id === selectedEcommercePromptId.value)
    const name = selectedTemplate?.name || inputText.value.trim() || '未命名工作流'
    const id = createProject(name)
    // Store the input text to be used as initial prompt
    sessionStorage.setItem('ai-canvas-initial-prompt', inputText.value.trim())
    if (selectedTemplate) {
      sessionStorage.setItem('ai-canvas-ecommerce-prompt-id', selectedTemplate.id)
    } else {
      sessionStorage.removeItem('ai-canvas-ecommerce-prompt-id')
    }
    inputText.value = ''
    selectedEcommercePromptId.value = ''
    router.push(`/canvas/${id}`)
  })
}

// Open existing workflow | 打开已有工作流
const openProject = (project) => {
  checkApiKeyAndNavigate(() => {
    router.push(`/canvas/${project.id}`)
  })
}

// Check if URL is a video | 检查 URL 是否为视频
const isVideoUrl = (url) => {
  if (!url || typeof url !== 'string') return false
  const videoExtensions = ['.mp4', '.webm', '.ogg', '.mov', '.avi', '.mkv']
  return videoExtensions.some(ext => url.toLowerCase().includes(ext))
}

// Import h for render functions | 导入 h 用于渲染函数
import { h } from 'vue'

// Projects section ref | 项目区域引用
const projectsSection = ref(null)

// Import file input ref | 导入文件输入引用
const importFileInput = ref(null)

// Trigger import file picker | 触发导入文件选择
const triggerImport = () => {
  importFileInput.value?.click()
}

// Handle file import | 处理文件导入
const handleFileImport = async (event) => {
  const file = event.target.files?.[0]
  if (!file) return

  try {
    const { id, name } = await importProject(file)
    window.$message?.success(`「${name}」导入成功`)
    // 自动打开导入的工作流
    router.push(`/canvas/${id}`)
  } catch (err) {
    window.$message?.error(err.message || '导入失败')
  }

  // 清空 input，允许重复选择同一文件
  event.target.value = ''
}

// Scroll to projects section | 滚动到项目区域
const scrollToProjects = () => {
  if (projectsSection.value) {
    projectsSection.value.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

// Initialize projects store on mount | 挂载时初始化项目存储
onMounted(() => {
  initProjectsStore()
})
</script>
