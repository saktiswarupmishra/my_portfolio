<template>
  <section id="about" class="section-padding relative overflow-hidden">
    <!-- Section divider wave -->
    <div class="section-divider-top" />

    <div class="container-narrow">
      <SectionHeading title="About Me" subtitle="A passionate developer building the future of technology" />

      <!-- Stats Row with Animated Counters -->
      <div
        class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16"
        v-motion
        :initial="{ opacity: 0, y: 30 }"
        :visible-once="{ opacity: 1, y: 0, transition: { duration: 600 } }"
      >
        <div
          v-for="(stat, i) in stats"
          :key="i"
          class="text-center p-6 rounded-2xl glass-card glow-hover transition-all duration-300 hover:scale-105"
        >
          <div class="text-3xl md:text-4xl font-bold gradient-text mb-1">
            <span ref="counterRefs">0</span>{{ stat.suffix }}
          </div>
          <div class="text-sm text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wide">
            {{ stat.label }}
          </div>
        </div>
      </div>

      <!-- About Cards with 3D Tilt -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div
          v-for="(card, i) in aboutCards"
          :key="i"
          class="group p-6 rounded-2xl glass-card transition-all duration-300 glow-hover cursor-default tilt-card"
          v-motion
          :initial="{ opacity: 0, y: 40 }"
          :visible-once="{ opacity: 1, y: 0, transition: { duration: 500, delay: i * 150 } }"
          @mousemove="tiltCard"
          @mouseleave="resetTilt"
        >
          <div class="text-4xl mb-4 transition-transform duration-300 group-hover:scale-110">
            {{ card.icon }}
          </div>
          <h3 class="text-xl font-bold mb-2 text-gray-800 dark:text-white">
            {{ card.title }}
          </h3>
          <p class="text-gray-500 dark:text-gray-400 leading-relaxed">
            {{ card.description }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { aboutCards, stats } from '../data'
import SectionHeading from './SectionHeading.vue'

const counterRefs = ref([])

// Animated counters
onMounted(() => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounters()
        observer.disconnect()
      }
    })
  }, { threshold: 0.3 })

  const section = document.getElementById('about')
  if (section) observer.observe(section)
})

function animateCounters() {
  const spans = document.querySelectorAll('#about .gradient-text span')
  spans.forEach((span, i) => {
    if (i >= stats.length) return
    const target = stats[i].value
    const duration = 2000
    const start = performance.now()
    const isFloat = target % 1 !== 0

    function tick(now) {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      const current = eased * target
      span.textContent = isFloat ? current.toFixed(1) : Math.floor(current)
      if (progress < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  })
}

// 3D Tilt effect
function tiltCard(e) {
  const el = e.currentTarget
  const rect = el.getBoundingClientRect()
  const x = e.clientX - rect.left
  const y = e.clientY - rect.top
  const centerX = rect.width / 2
  const centerY = rect.height / 2
  const rotateX = (y - centerY) / centerY * -8
  const rotateY = (x - centerX) / centerX * 8
  el.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`
}

function resetTilt(e) {
  e.currentTarget.style.transform = ''
}
</script>
