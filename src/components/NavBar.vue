<template>
  <nav
    class="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
    :class="scrolled ? 'py-2 glass-card shadow-lg' : 'py-4 bg-transparent'"
  >
    <div class="container-narrow flex items-center justify-between">
      <!-- Logo -->
      <a href="#hero" class="text-xl font-bold gradient-text tracking-tight">
        &lt;SSM /&gt;
      </a>

      <!-- Desktop Nav -->
      <div class="hidden md:flex items-center gap-6">
        <a
          v-for="link in navLinks"
          :key="link.name"
          :href="link.href"
          class="text-sm font-medium transition-colors duration-200 hover:text-primary-400"
          :class="scrolled
            ? 'text-gray-700 dark:text-gray-300'
            : 'text-gray-300 dark:text-gray-300'"
        >
          {{ link.name }}
        </a>
        <ThemeToggle />
      </div>

      <!-- Mobile Menu Button -->
      <div class="flex items-center gap-3 md:hidden">
        <ThemeToggle />
        <button
          @click="mobileOpen = !mobileOpen"
          class="p-2 rounded-lg glass-card"
          aria-label="Toggle menu"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              v-if="!mobileOpen"
              stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
            <path
              v-else
              stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>

    <!-- Mobile Menu -->
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <div v-if="mobileOpen" class="md:hidden mt-2 mx-4 p-4 rounded-xl glass-card">
        <a
          v-for="link in navLinks"
          :key="link.name"
          :href="link.href"
          @click="mobileOpen = false"
          class="block py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-primary-400 transition-colors"
        >
          {{ link.name }}
        </a>
      </div>
    </Transition>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { navLinks } from '../data'
import ThemeToggle from './ThemeToggle.vue'

const scrolled = ref(false)
const mobileOpen = ref(false)

const onScroll = () => {
  scrolled.value = window.scrollY > 50
}

onMounted(() => window.addEventListener('scroll', onScroll))
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>
