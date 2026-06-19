<template>
  <!-- App Header | 应用头部 -->
  <header class="flex items-center justify-between px-4 md:px-8 py-4 border-b border-[var(--border-color)]">
    <!-- Left slot | 左侧插槽 -->
    <div class="flex items-center gap-2">
      <slot name="left">
        <!-- Default: empty or logo -->
      </slot>
    </div>
    
    <!-- Right section | 右侧区域 -->
    <div class="flex flex-wrap items-center justify-end gap-2 md:gap-3">
      <!-- Center slot | 中间插槽 -->
      <slot name="center"></slot>
      <router-link
        to="/assets"
        class="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[var(--bg-secondary)] hover:bg-[var(--bg-tertiary)] border border-[var(--border-color)] text-sm transition-colors"
        title="我的素材库"
      >
        <n-icon :size="16"><ImageOutline /></n-icon>
        我的素材
      </router-link>
      <button
        @click="openOfficialSite"
        class="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[var(--bg-secondary)] hover:bg-[var(--bg-tertiary)] border border-[var(--border-color)] text-sm transition-colors"
      >
        工具箱官网
      </button>
      <button
        @click="openApiConsole"
        class="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[var(--accent-color)] hover:bg-[var(--accent-hover)] text-white text-sm transition-colors"
      >
        <img
          src="../assets/logo.png"
          alt="AIAIAI工具箱官方中转站API"
          class="w-6 h-6 object-contain"
        />
        官方中转站API
      </button>
      <button
        @click="openApiTrial"
        class="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white text-sm transition-colors"
      >
        免费试用申请
      </button>
      
      <!-- Theme toggle | 主题切换 -->
      <button 
        @click="toggleTheme"
        class="p-2 rounded-lg hover:bg-[var(--bg-tertiary)] transition-colors"
      >
        <n-icon :size="20">
          <SunnyOutline v-if="isDark" />
          <MoonOutline v-else />
        </n-icon>
      </button>
      
      <!-- Right slot | 右侧插槽 -->
      <slot name="right"></slot>
    </div>
  </header>
</template>

<script setup>
/**
 * App Header component | 应用头部组件
 * Reusable header with slots for customization
 */
import { NIcon } from 'naive-ui'
import { 
  SunnyOutline, 
  MoonOutline,
  ImageOutline
} from '@vicons/ionicons5'
import { isDark, toggleTheme } from '../stores/theme'

const openOfficialSite = () => {
  window.open('https://aiaiai001.com/', '_blank')
}

// 打开 AIAIAI 工具箱控制台
const openApiConsole = () => {
  window.open('https://api.aiaiai001.com/', '_blank')
}

const openApiTrial = () => {
  window.open('https://api.aiaiai001.com/register', '_blank')
}

// Props | 属性
defineProps({
  githubUrl: {
    type: String,
    default: 'https://github.com/chatfire-AI/huobao-canvas'
  }
})
</script>
