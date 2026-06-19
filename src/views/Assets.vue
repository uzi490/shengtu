<template>
  <div class="min-h-screen h-screen overflow-y-auto bg-[var(--bg-primary)]">
    <AppHeader>
      <template #left>
        <button
          @click="router.push('/')"
          class="p-2 hover:bg-[var(--bg-tertiary)] rounded-lg transition-colors"
          title="返回首页"
        >
          <n-icon :size="20"><ChevronBackOutline /></n-icon>
        </button>
        <div>
          <h1 class="text-base font-semibold text-[var(--text-primary)]">我的素材库</h1>
          <p class="text-xs text-[var(--text-secondary)]">普通用户默认保留24小时，请及时下载</p>
        </div>
      </template>
    </AppHeader>

    <main class="max-w-7xl mx-auto px-4 md:px-8 py-6 space-y-5">
      <section class="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div class="rounded-lg border border-[var(--border-color)] bg-[var(--bg-secondary)] p-4">
          <p class="text-xs text-[var(--text-secondary)] mb-1">已保存图片</p>
          <div class="flex items-end gap-2">
            <span class="text-2xl font-semibold text-[var(--text-primary)]">{{ quota.savedCount }}</span>
            <span class="text-sm text-[var(--text-secondary)]">/ {{ quota.savedLimit }} 张</span>
          </div>
          <div class="mt-3 h-2 rounded-full bg-[var(--bg-tertiary)] overflow-hidden">
            <div class="h-full bg-[var(--accent-color)]" :style="{ width: countPercent + '%' }"></div>
          </div>
        </div>

        <div class="rounded-lg border border-[var(--border-color)] bg-[var(--bg-secondary)] p-4">
          <p class="text-xs text-[var(--text-secondary)] mb-1">已用容量</p>
          <div class="flex items-end gap-2">
            <span class="text-2xl font-semibold text-[var(--text-primary)]">{{ formatBytes(quota.usedBytes) }}</span>
            <span class="text-sm text-[var(--text-secondary)]">/ {{ formatBytes(quota.byteLimit) }}</span>
          </div>
          <div class="mt-3 h-2 rounded-full bg-[var(--bg-tertiary)] overflow-hidden">
            <div class="h-full bg-amber-500" :style="{ width: bytePercent + '%' }"></div>
          </div>
        </div>

        <div class="rounded-lg border border-[var(--border-color)] bg-[var(--bg-secondary)] p-4">
          <p class="text-xs text-[var(--text-secondary)] mb-1">保留策略</p>
          <p class="text-sm text-[var(--text-primary)] leading-6">
            临时结果和普通用户素材默认保留 {{ quota.retentionHours || 24 }} 小时。超过 50 张或 500MB 时，需要先下载或删除旧素材。
          </p>
        </div>
      </section>

      <section class="flex flex-col lg:flex-row gap-3 lg:items-center lg:justify-between">
        <div class="flex items-center gap-2">
          <button
            v-for="tab in tabs"
            :key="tab.key"
            @click="currentType = tab.key; fetchAssets()"
            class="px-3 py-2 rounded-lg text-sm border transition-colors"
            :class="currentType === tab.key
              ? 'bg-[var(--accent-color)] border-[var(--accent-color)] text-white'
              : 'bg-[var(--bg-secondary)] border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'"
          >
            {{ tab.label }}
          </button>
        </div>

        <div class="flex items-center gap-2 w-full lg:w-[420px]">
          <div class="flex-1 flex items-center gap-2 px-3 py-2 rounded-lg border border-[var(--border-color)] bg-[var(--bg-secondary)]">
            <n-icon :size="16" class="text-[var(--text-secondary)]"><SearchOutline /></n-icon>
            <input
              v-model="query"
              @keydown.enter="fetchAssets"
              placeholder="搜索标题、提示词、模型"
              class="w-full bg-transparent outline-none text-sm text-[var(--text-primary)] placeholder:text-[var(--text-secondary)]"
            />
          </div>
          <button
            @click="fetchAssets"
            class="px-3 py-2 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-color)] hover:bg-[var(--bg-tertiary)] transition-colors"
            title="刷新"
          >
            <n-icon :size="18"><RefreshOutline /></n-icon>
          </button>
        </div>
      </section>

      <section v-if="loading" class="py-16 flex justify-center">
        <n-spin :size="28" />
      </section>

      <section
        v-else-if="assets.length === 0"
        class="rounded-lg border border-dashed border-[var(--border-color)] bg-[var(--bg-secondary)] py-16 text-center"
      >
        <n-icon :size="44" class="text-[var(--text-secondary)] mb-3"><ImageOutline /></n-icon>
        <p class="text-sm text-[var(--text-secondary)]">还没有素材。生成图片后，可在图片节点点击保存到素材库。</p>
      </section>

      <section v-else class="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4 pb-10">
        <article
          v-for="asset in assets"
          :key="asset.id"
          class="rounded-lg border border-[var(--border-color)] bg-[var(--bg-secondary)] overflow-hidden"
        >
          <div class="aspect-square bg-[var(--bg-tertiary)]">
            <img :src="asset.url" :alt="asset.title" class="w-full h-full object-cover" />
          </div>
          <div class="p-3 space-y-2">
            <div>
              <p class="text-sm font-medium text-[var(--text-primary)] truncate">{{ asset.title || '未命名素材' }}</p>
              <p class="text-xs text-[var(--text-secondary)] truncate">{{ asset.model || asset.typeLabel || asset.type }}</p>
            </div>
            <div class="text-xs text-[var(--text-secondary)] leading-5">
              <p>{{ formatBytes(asset.sizeBytes) }} · {{ formatTime(asset.createdAt) }}</p>
              <p v-if="asset.expiresAt">到期：{{ formatTime(asset.expiresAt) }}</p>
            </div>
            <div class="flex items-center gap-1">
              <button
                @click="downloadAsset(asset)"
                class="flex-1 h-8 rounded-lg border border-[var(--border-color)] hover:bg-[var(--bg-tertiary)] transition-colors"
                title="下载"
              >
                <n-icon :size="16"><DownloadOutline /></n-icon>
              </button>
              <button
                @click="copyAssetUrl(asset)"
                class="flex-1 h-8 rounded-lg border border-[var(--border-color)] hover:bg-[var(--bg-tertiary)] transition-colors"
                title="复制地址"
              >
                <n-icon :size="16"><LinkOutline /></n-icon>
              </button>
              <button
                @click="removeAsset(asset)"
                class="flex-1 h-8 rounded-lg border border-red-200 text-red-500 hover:bg-red-50 dark:border-red-900 dark:hover:bg-red-950/30 transition-colors"
                title="删除"
              >
                <n-icon :size="16"><TrashOutline /></n-icon>
              </button>
            </div>
          </div>
        </article>
      </section>
    </main>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { NIcon, NSpin } from 'naive-ui'
import {
  ChevronBackOutline,
  DownloadOutline,
  ImageOutline,
  LinkOutline,
  RefreshOutline,
  SearchOutline,
  TrashOutline
} from '@vicons/ionicons5'
import AppHeader from '../components/AppHeader.vue'
import { deleteAsset, listAssets } from '../api/assets'

const router = useRouter()
const loading = ref(false)
const assets = ref([])
const query = ref('')
const currentType = ref('saved')
const quota = ref({
  retentionHours: 24,
  savedCount: 0,
  savedLimit: 50,
  usedBytes: 0,
  byteLimit: 500 * 1024 * 1024,
  temporaryCount: 0
})

const tabs = [
  { label: '已保存', key: 'saved' },
  { label: '临时结果', key: 'temporary' },
  { label: '全部', key: 'all' }
]

const countPercent = computed(() => {
  if (!quota.value.savedLimit) return 0
  return Math.min(100, Math.round((quota.value.savedCount / quota.value.savedLimit) * 100))
})

const bytePercent = computed(() => {
  if (!quota.value.byteLimit) return 0
  return Math.min(100, Math.round((quota.value.usedBytes / quota.value.byteLimit) * 100))
})

const fetchAssets = async () => {
  loading.value = true
  try {
    const result = await listAssets({
      type: currentType.value,
      query: query.value.trim()
    })
    assets.value = result.assets || []
    quota.value = result.quota || quota.value
  } catch (err) {
    window.$message?.error(err.message || '读取素材库失败')
  } finally {
    loading.value = false
  }
}

const downloadAsset = (asset) => {
  window.open(asset.url, '_blank')
}

const copyAssetUrl = async (asset) => {
  const absoluteUrl = new URL(asset.url, window.location.origin).toString()
  await navigator.clipboard.writeText(absoluteUrl)
  window.$message?.success('素材地址已复制')
}

const removeAsset = async (asset) => {
  try {
    await deleteAsset(asset.id)
    window.$message?.success('素材已删除')
    await fetchAssets()
  } catch (err) {
    window.$message?.error(err.message || '删除失败')
  }
}

const formatBytes = (bytes = 0) => {
  if (!bytes) return '0 MB'
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`
}

const formatTime = (value) => {
  if (!value) return ''
  const date = new Date(value)
  return `${date.getMonth() + 1}/${date.getDate()} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`
}

onMounted(fetchAssets)
</script>
