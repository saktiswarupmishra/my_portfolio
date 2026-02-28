<template>
  <section id="projects" class="section-padding relative overflow-hidden">
    <div class="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
      <div class="absolute bottom-0 right-0 w-96 h-96 bg-cyber-500 rounded-full blur-3xl" />
    </div>

    <div class="container-narrow relative z-10">
      <SectionHeading title="Projects" subtitle="Some of my recent work and side projects" />

      <!-- Filter Buttons -->
      <div
        class="flex flex-wrap justify-center gap-3 mb-12"
        v-motion
        :initial="{ opacity: 0, y: 20 }"
        :visible-once="{ opacity: 1, y: 0, transition: { duration: 500 } }"
      >
        <button
          v-for="filter in filters"
          :key="filter"
          @click="activeFilter = filter"
          class="px-5 py-2 rounded-xl text-sm font-medium transition-all duration-300"
          :class="activeFilter === filter
            ? 'bg-gradient-to-r from-primary-500 to-cyber-500 text-white shadow-lg shadow-primary-500/25'
            : 'glass-card text-gray-600 dark:text-gray-400 hover:text-primary-400'"
        >
          {{ filter }}
        </button>
      </div>

      <!-- Project Cards with 3D Tilt -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <TransitionGroup
          enter-active-class="transition-all duration-500"
          enter-from-class="opacity-0 scale-90"
          enter-to-class="opacity-100 scale-100"
          leave-active-class="transition-all duration-300"
          leave-from-class="opacity-100 scale-100"
          leave-to-class="opacity-0 scale-90"
          move-class="transition-all duration-300"
        >
          <div
            v-for="(project, i) in filteredProjects"
            :key="project.title"
            class="group rounded-2xl glass-card overflow-hidden transition-all duration-300 glow-hover tilt-card"
            v-motion
            :initial="{ opacity: 0, y: 40 }"
            :visible-once="{ opacity: 1, y: 0, transition: { duration: 500, delay: i * 100 } }"
            @mousemove="tiltCard"
            @mouseleave="resetTilt"
          >
            <!-- Card Header Gradient with Shimmer -->
            <div class="h-40 bg-gradient-to-br from-primary-600/30 via-cyber-600/20 to-primary-800/30 relative flex items-center justify-center overflow-hidden">
              <div class="card-shimmer" />
              <div class="text-6xl opacity-50 group-hover:opacity-80 group-hover:scale-110 transition-all duration-300 relative z-10">
                {{ getCategoryEmoji(project.category) }}
              </div>
              <div class="absolute top-3 right-3 z-10">
                <span class="px-2.5 py-1 text-xs font-bold rounded-full bg-primary-500/20 text-primary-300 border border-primary-500/30">
                  {{ project.category }}
                </span>
              </div>
            </div>

            <!-- Card Body -->
            <div class="p-5">
              <h3 class="text-lg font-bold text-gray-800 dark:text-white mb-2 group-hover:text-primary-400 transition-colors">
                {{ project.title }}
              </h3>
              <p class="text-sm text-gray-500 dark:text-gray-400 mb-4 leading-relaxed line-clamp-3">
                {{ project.description }}
              </p>

              <!-- Tech Stack -->
              <div class="flex flex-wrap gap-2 mb-4">
                <span
                  v-for="tech in project.techStack"
                  :key="tech"
                  class="px-2.5 py-1 text-xs font-mono font-medium rounded-lg bg-primary-500/10 text-primary-400 border border-primary-500/20"
                >
                  {{ tech }}
                </span>
              </div>

              <!-- Links -->
              <div class="flex gap-3">
                <a
                  :href="project.github"
                  target="_blank"
                  class="flex-1 py-2 text-center text-sm font-medium rounded-lg border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400 hover:border-primary-400 hover:text-primary-400 transition-colors"
                >
                  GitHub
                </a>
                <a
                  :href="project.live"
                  target="_blank"
                  class="flex-1 py-2 text-center text-sm font-medium rounded-lg bg-gradient-to-r from-primary-500 to-cyber-500 text-white hover:shadow-lg hover:shadow-primary-500/25 transition-all"
                >
                  Live Demo
                </a>
              </div>
            </div>
          </div>
        </TransitionGroup>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import { projects } from '../data'
import SectionHeading from './SectionHeading.vue'

const filters = ['All', 'AI', 'Web', 'Backend', 'Game', 'Security']
const activeFilter = ref('All')

const filteredProjects = computed(() =>
  activeFilter.value === 'All'
    ? projects
    : projects.filter(p => p.category === activeFilter.value)
)

function getCategoryEmoji(cat) {
  const map = { AI: '🤖', Web: '🌐', Backend: '⚙️', Game: '🎮', Security: '🛡️' }
  return map[cat] || '💻'
}

// 3D Tilt effect
function tiltCard(e) {
  const el = e.currentTarget
  const rect = el.getBoundingClientRect()
  const x = e.clientX - rect.left
  const y = e.clientY - rect.top
  const centerX = rect.width / 2
  const centerY = rect.height / 2
  const rotateX = (y - centerY) / centerY * -6
  const rotateY = (x - centerX) / centerX * 6
  el.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`
}

function resetTilt(e) {
  e.currentTarget.style.transform = ''
}
</script>
