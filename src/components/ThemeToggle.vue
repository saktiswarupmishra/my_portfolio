<template>
  <button
    @click="toggle"
    class="relative p-2 rounded-full transition-all duration-300 hover:bg-primary-500/10"
    :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
  >
    <!-- Sun -->
    <svg
      v-if="isDark"
      class="w-5 h-5 text-yellow-400 transition-transform duration-300 hover:rotate-45"
      fill="none" stroke="currentColor" viewBox="0 0 24 24"
    >
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
        d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
      />
    </svg>
    <!-- Moon -->
    <svg
      v-else
      class="w-5 h-5 text-primary-600 transition-transform duration-300 hover:-rotate-12"
      fill="none" stroke="currentColor" viewBox="0 0 24 24"
    >
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
        d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
      />
    </svg>
  </button>
</template>

<script setup>
import { useTheme } from '../composables/useTheme'
const { isDark, toggle } = useTheme()
</script>
