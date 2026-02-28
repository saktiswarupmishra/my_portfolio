<template>
  <div class="text-center mb-12 md:mb-16">
    <h2
      class="text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
      v-motion
      :initial="{ opacity: 0, y: 30 }"
      :visible-once="{ opacity: 1, y: 0, transition: { duration: 600 } }"
    >
      <span class="gradient-text">{{ title }}</span>
    </h2>
    <p
      v-if="subtitle"
      class="text-gray-500 dark:text-gray-400 text-lg max-w-2xl mx-auto"
      v-motion
      :initial="{ opacity: 0, y: 20 }"
      :visible-once="{ opacity: 1, y: 0, transition: { duration: 600, delay: 200 } }"
    >
      {{ subtitle }}
    </p>
    <div
      class="mt-4 w-20 h-1 mx-auto rounded-full bg-gradient-to-r from-primary-500 to-cyber-500"
      v-motion
      :initial="{ scaleX: 0 }"
      :visible-once="{ scaleX: 1, transition: { duration: 600, delay: 400 } }"
    />
  </div>
</template>

<script setup>
defineProps({
  title: { type: String, required: true },
  subtitle: { type: String, default: '' },
})
</script>
