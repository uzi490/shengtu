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
    <div class="flex items-center gap-4">
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
      <!-- 增加按钮跳转 https://api.aiaiai001.com/ -->
      <button 
        @click="openJimengAI" 
        class="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-purple-500 hover:bg-purple-600 text-white text-sm transition-colors"
        title="生成视频需前往即梦AI"
      >
        即梦AI
      </button>
    <!--  <button 
        @click="openGptMirror" 
        class="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white text-sm transition-colors"
        title="GPT镜像站"
      >
        GPT镜像
      </button> -->
      <button
        @click="openApiConsole"
        class="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[var(--accent-color)] hover:bg-[var(--accent-hover)] text-white text-sm transition-colors"
      >
        <img
          src="../assets/logo.svg"
          alt="龙城API"
          class="w-5 h-5 object-contain"
        />
        龙城API
      </button>
      <!-- <span class="text-xs text-[var(--text-tertiary)]" title="生成视频需前往即梦AI">
        ⚠️ 生成视频请前往即梦AI
      </span> -->
  
      
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
  LogoGithub,
  ImageOutline
} from '@vicons/ionicons5'
import { isDark, toggleTheme } from '../stores/theme'

// 打开龙城API控制台
const openApiConsole = () => {
  window.open('https://api.aiaiai001.com/', '_blank')
}

// 打开即梦AI
const openJimengAI = () => {
  window.open('https://jimeng.jianying.com/ai-tool/home/?type=video&workspace=0', '_blank')
}

// 打开GPT镜像
const openGptMirror = () => {
  window.open('https://chat.dajubupang.fun/', '_blank')
}

// Props | 属性
defineProps({
  githubUrl: {
    type: String,
    default: 'https://github.com/chatfire-AI/huobao-canvas'
  }
})
</script>
