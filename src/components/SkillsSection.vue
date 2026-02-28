<template>
  <section id="skills" class="section-padding relative overflow-hidden">
    <!-- Background Accent -->
    <div class="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
      <div class="absolute top-20 right-0 w-72 h-72 bg-primary-500 rounded-full blur-3xl" />
      <div class="absolute bottom-20 left-0 w-72 h-72 bg-cyber-500 rounded-full blur-3xl" />
    </div>

    <div class="container-narrow relative z-10">
      <SectionHeading title="Skills & Technologies" subtitle="Technologies I work with to bring ideas to life" />

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Skill Cards -->
        <div class="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div
            v-for="(cat, catIdx) in skillCategories"
            :key="cat.title"
            class="p-6 rounded-2xl glass-card transition-all duration-300 hover:scale-[1.02] glow-hover"
            v-motion
            :initial="{ opacity: 0, x: catIdx % 2 === 0 ? -40 : 40 }"
            :visible-once="{ opacity: 1, x: 0, transition: { duration: 500, delay: catIdx * 150 } }"
          >
            <h3 class="text-xl font-bold mb-5 flex items-center gap-3">
              <span class="text-2xl">{{ cat.icon }}</span>
              <span class="gradient-text">{{ cat.title }}</span>
            </h3>

            <div class="space-y-4">
              <div v-for="skill in cat.skills" :key="skill.name">
                <div class="flex justify-between mb-1.5">
                  <span class="text-sm font-medium text-gray-700 dark:text-gray-300">{{ skill.name }}</span>
                  <span class="text-xs font-mono text-primary-400">{{ skill.level }}%</span>
                </div>
                <div class="h-2 rounded-full bg-gray-200 dark:bg-gray-700/50 overflow-hidden">
                  <div
                    class="h-full rounded-full bg-gradient-to-r from-primary-500 to-cyber-500 transition-all duration-1000 ease-out skill-bar-glow"
                    :style="{ width: skill.level + '%' }"
                    v-motion
                    :initial="{ width: '0%' }"
                    :visible-once="{ width: skill.level + '%', transition: { duration: 1200, delay: 400 } }"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 3D Skills Orb -->
        <div
          class="hidden lg:flex items-center justify-center"
          v-motion
          :initial="{ opacity: 0, scale: 0.8 }"
          :visible-once="{ opacity: 1, scale: 1, transition: { duration: 800, delay: 400 } }"
        >
          <ThreeSkillsOrb />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { skillCategories } from '../data'
import SectionHeading from './SectionHeading.vue'
import ThreeSkillsOrb from './ThreeSkillsOrb.vue'
</script>
