<template>
  <section id="hero" class="relative min-h-screen flex items-center justify-center overflow-hidden gradient-bg">
    <!-- Three.js 3D Particle Background -->
    <ThreeBackground />

    <!-- Grid Pattern -->
    <div class="absolute inset-0 opacity-5" style="background-image: radial-gradient(circle, rgba(255,255,255,0.15) 1px, transparent 1px); background-size: 30px 30px;" />

    <!-- Content with Mouse Parallax -->
    <div
      class="relative z-10 text-center px-4 sm:px-6"
      :style="{ transform: `translate(${parallax.x.value * 0.5}px, ${parallax.y.value * 0.5}px)` }"
    >
      <div
        v-motion
        :initial="{ opacity: 0, y: 40 }"
        :enter="{ opacity: 1, y: 0, transition: { duration: 800 } }"
      >
        <p class="text-primary-300 font-mono text-sm md:text-base mb-4 tracking-widest uppercase text-shimmer">
          Welcome to my portfolio
        </p>
      </div>

      <h1
        class="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 leading-tight"
        v-motion
        :initial="{ opacity: 0, y: 40 }"
        :enter="{ opacity: 1, y: 0, transition: { duration: 800, delay: 200 } }"
        :style="{ transform: `translate(${parallax.x.value * 0.3}px, ${parallax.y.value * 0.3}px)` }"
      >
        Hi, I'm <span class="gradient-text animate-gradient">{{ personalInfo.name }}</span>
      </h1>

      <h2
        class="text-xl sm:text-2xl md:text-3xl text-gray-300 font-light mb-6"
        v-motion
        :initial="{ opacity: 0, y: 40 }"
        :enter="{ opacity: 1, y: 0, transition: { duration: 800, delay: 400 } }"
        :style="{ transform: `translate(${parallax.x.value * 0.2}px, ${parallax.y.value * 0.2}px)` }"
      >
        {{ personalInfo.title }} | {{ personalInfo.subtitle }}
      </h2>

      <div
        class="text-lg sm:text-xl md:text-2xl text-gray-400 mb-10 h-10"
        v-motion
        :initial="{ opacity: 0 }"
        :enter="{ opacity: 1, transition: { duration: 800, delay: 600 } }"
      >
        <TypeWriter :texts="typingTexts" />
      </div>

      <div
        class="flex flex-wrap items-center justify-center gap-4"
        v-motion
        :initial="{ opacity: 0, y: 30 }"
        :enter="{ opacity: 1, y: 0, transition: { duration: 800, delay: 800 } }"
      >
        <a
          href="#projects"
          class="magnetic-btn group px-8 py-3.5 bg-gradient-to-r from-primary-500 to-cyber-500 text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-primary-500/30 hover:scale-105"
          @mousemove="magneticMove"
          @mouseleave="magneticReset"
        >
          View Projects
          <span class="inline-block ml-1 transition-transform group-hover:translate-x-1">→</span>
        </a>
        <a
          :href="personalInfo.resumeUrl"
          target="_blank"
          class="magnetic-btn px-8 py-3.5 border border-primary-400/30 text-primary-300 font-semibold rounded-xl transition-all duration-300 hover:bg-primary-500/10 hover:border-primary-400/60 hover:scale-105"
          @mousemove="magneticMove"
          @mouseleave="magneticReset"
        >
          📄 Download Resume
        </a>
        <a
          href="#contact"
          class="magnetic-btn px-8 py-3.5 glass text-white font-semibold rounded-xl transition-all duration-300 hover:bg-white/10 hover:scale-105"
          @mousemove="magneticMove"
          @mouseleave="magneticReset"
        >
          Contact Me
        </a>
      </div>
    </div>

    <!-- Scroll Indicator -->
    <div class="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
      <div class="w-6 h-10 rounded-full border-2 border-gray-400/50 flex items-start justify-center p-1.5">
        <div class="w-1.5 h-3 bg-primary-400 rounded-full animate-scroll-dot" />
      </div>
    </div>
  </section>
</template>

<script setup>
import { personalInfo, typingTexts } from '../data'
import { useMouseParallax } from '../composables/useMouseParallax'
import TypeWriter from './TypeWriter.vue'
import ThreeBackground from './ThreeBackground.vue'

const parallax = useMouseParallax(0.015)

function magneticMove(e) {
  const btn = e.currentTarget
  const rect = btn.getBoundingClientRect()
  const x = e.clientX - rect.left - rect.width / 2
  const y = e.clientY - rect.top - rect.height / 2
  btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px) scale(1.05)`
}

function magneticReset(e) {
  e.currentTarget.style.transform = ''
}
</script>
