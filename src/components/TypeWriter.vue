<template>
  <span class="inline-block">
    <span class="gradient-text">{{ displayText }}</span>
    <span class="animate-pulse text-primary-400">|</span>
  </span>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  texts: { type: Array, required: true },
  typeSpeed: { type: Number, default: 80 },
  deleteSpeed: { type: Number, default: 40 },
  pauseDuration: { type: Number, default: 2000 },
})

const displayText = ref('')
let timeout = null
let currentIndex = 0
let charIndex = 0
let isDeleting = false

function tick() {
  const currentText = props.texts[currentIndex]

  if (isDeleting) {
    displayText.value = currentText.substring(0, charIndex - 1)
    charIndex--
  } else {
    displayText.value = currentText.substring(0, charIndex + 1)
    charIndex++
  }

  let delay = isDeleting ? props.deleteSpeed : props.typeSpeed

  if (!isDeleting && charIndex === currentText.length) {
    delay = props.pauseDuration
    isDeleting = true
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false
    currentIndex = (currentIndex + 1) % props.texts.length
    delay = 400
  }

  timeout = setTimeout(tick, delay)
}

onMounted(() => tick())
onUnmounted(() => clearTimeout(timeout))
</script>
