<template>
  <section id="certifications" class="section-padding relative overflow-hidden">
    <div class="container-narrow">
      <SectionHeading title="Certifications & Achievements" subtitle="Milestones and accomplishments in my journey" />

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div
          v-for="(cert, i) in certifications"
          :key="i"
          class="group relative p-6 rounded-2xl glass-card overflow-hidden transition-all duration-300 hover:scale-[1.03] glow-hover"
          v-motion
          :initial="{ opacity: 0, y: 40 }"
          :visible-once="{ opacity: 1, y: 0, transition: { duration: 500, delay: i * 150 } }"
        >
          <!-- Glow Accent -->
          <div class="absolute -top-10 -right-10 w-32 h-32 bg-primary-500/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          <div class="relative z-10">
            <div class="text-4xl mb-4 transition-transform duration-300 group-hover:scale-110">
              {{ cert.icon }}
            </div>
            <h3 class="text-xl font-bold text-gray-800 dark:text-white mb-2">
              {{ cert.title }}
            </h3>
            <p class="text-gray-500 dark:text-gray-400 leading-relaxed text-sm">
              {{ cert.description }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { certifications } from '../data'
import SectionHeading from './SectionHeading.vue'
</script>
