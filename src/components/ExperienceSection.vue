<template>
  <section id="experience" class="section-padding relative overflow-hidden">
    <div class="container-narrow">
      <SectionHeading title="Experience" subtitle="My professional journey so far" />

      <div class="relative">
        <!-- Animated Timeline Line -->
        <div
          ref="timelineRef"
          class="absolute left-4 md:left-1/2 md:-translate-x-px top-0 w-0.5 bg-gradient-to-b from-primary-500 via-cyber-500 to-primary-500/20 transition-all duration-500 ease-out"
          :style="{ height: timelineHeight + '%' }"
        />
        <!-- Background track -->
        <div class="absolute left-4 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-800 -z-10" />

        <!-- Timeline Items -->
        <div
          v-for="(exp, i) in experiences"
          :key="i"
          class="relative mb-12 last:mb-0"
          v-motion
          :initial="{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }"
          :visible-once="{ opacity: 1, x: 0, transition: { duration: 600, delay: i * 200 } }"
        >
          <div
            class="flex items-start gap-6 md:gap-0"
            :class="i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'"
          >
            <!-- Content Card -->
            <div class="flex-1 pl-10 md:pl-0" :class="i % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'">
              <div class="p-6 rounded-2xl glass-card glow-hover transition-all duration-300 hover:scale-[1.02]">
                <span
                  class="inline-block px-3 py-1 text-xs font-bold rounded-full mb-3"
                  :class="exp.type === 'Full-time'
                    ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                    : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'"
                >
                  {{ exp.type }}
                </span>
                <h3 class="text-xl font-bold text-gray-800 dark:text-white mb-1">
                  {{ exp.role }}
                </h3>
                <p class="text-primary-400 font-semibold mb-1">{{ exp.company }}</p>
                <p class="text-sm text-gray-500 dark:text-gray-400 mb-4 font-mono">{{ exp.period }}</p>
                <ul :class="i % 2 === 0 ? 'md:text-right' : ''" class="space-y-2">
                  <li
                    v-for="(h, j) in exp.highlights"
                    :key="j"
                    class="text-sm text-gray-600 dark:text-gray-300 flex items-start gap-2"
                    :class="i % 2 === 0 ? 'md:flex-row-reverse' : ''"
                  >
                    <span class="text-primary-400 mt-0.5 shrink-0">▹</span>
                    <span>{{ h }}</span>
                  </li>
                </ul>
              </div>
            </div>

            <!-- Timeline Dot -->
            <div class="absolute left-4 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-gradient-to-r from-primary-500 to-cyber-500 border-4 border-white dark:border-surface-dark shadow-lg animate-pulse-glow" />

            <!-- Empty Space (other side) -->
            <div class="hidden md:block flex-1" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { experiences } from '../data'
import SectionHeading from './SectionHeading.vue'

const timelineHeight = ref(0)
const timelineRef = ref(null)

function onScroll() {
  const section = document.getElementById('experience')
  if (!section) return
  const rect = section.getBoundingClientRect()
  const sectionTop = rect.top
  const sectionHeight = rect.height
  const viewportHeight = window.innerHeight

  if (sectionTop > viewportHeight) {
    timelineHeight.value = 0
  } else if (sectionTop + sectionHeight < 0) {
    timelineHeight.value = 100
  } else {
    const scrolled = viewportHeight - sectionTop
    const progress = Math.min(Math.max(scrolled / (sectionHeight + viewportHeight * 0.3), 0), 1)
    timelineHeight.value = progress * 100
  }
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
})
</script>
