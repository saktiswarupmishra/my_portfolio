<template>
  <section id="contact" class="section-padding relative overflow-hidden">
    <!-- Floating Particles Background -->
    <div class="absolute inset-0 pointer-events-none">
      <div class="particle particle-1" />
      <div class="particle particle-2" />
      <div class="particle particle-3" />
      <div class="particle particle-4" />
      <div class="particle particle-5" />
      <div class="particle particle-6" />
      <div class="particle particle-7" />
      <div class="particle particle-8" />
    </div>

    <!-- Background Accents -->
    <div class="absolute inset-0 opacity-5 pointer-events-none">
      <div class="absolute top-0 left-1/4 w-96 h-96 bg-primary-500 rounded-full blur-3xl" />
      <div class="absolute bottom-0 right-1/4 w-72 h-72 bg-cyber-500 rounded-full blur-3xl" />
    </div>

    <div class="container-narrow relative z-10">
      <SectionHeading title="Get In Touch" subtitle="Have a project in mind? Let's discuss and make something amazing together" />

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <!-- Contact Info -->
        <div
          v-motion
          :initial="{ opacity: 0, x: -40 }"
          :visible-once="{ opacity: 1, x: 0, transition: { duration: 600 } }"
        >
          <h3 class="text-2xl font-bold text-gray-800 dark:text-white mb-6">
            Let's work together
          </h3>
          <p class="text-gray-500 dark:text-gray-400 mb-8 leading-relaxed">
            I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions. Feel free to reach out!
          </p>

          <div class="space-y-4">
            <a
              :href="'mailto:' + personalInfo.email"
              class="flex items-center gap-4 p-4 rounded-xl glass-card transition-all duration-300 hover:scale-[1.02] glow-hover group"
            >
              <div class="w-12 h-12 rounded-xl bg-gradient-to-r from-primary-500 to-cyber-500 flex items-center justify-center text-white text-xl shrink-0">
                📧
              </div>
              <div>
                <p class="text-sm text-gray-500 dark:text-gray-400">Email</p>
                <p class="font-medium text-gray-800 dark:text-white group-hover:text-primary-400 transition-colors">
                  {{ personalInfo.email }}
                </p>
              </div>
            </a>

            <a
              :href="'tel:' + personalInfo.phone"
              class="flex items-center gap-4 p-4 rounded-xl glass-card transition-all duration-300 hover:scale-[1.02] glow-hover group"
            >
              <div class="w-12 h-12 rounded-xl bg-gradient-to-r from-primary-500 to-cyber-500 flex items-center justify-center text-white text-xl shrink-0">
                📱
              </div>
              <div>
                <p class="text-sm text-gray-500 dark:text-gray-400">Phone</p>
                <p class="font-medium text-gray-800 dark:text-white group-hover:text-primary-400 transition-colors">
                  {{ 9124457119}}
                </p>
              </div>
            </a>

            <a
              :href="personalInfo.linkedin"
              target="_blank"
              class="flex items-center gap-4 p-4 rounded-xl glass-card transition-all duration-300 hover:scale-[1.02] glow-hover group"
            >
              <div class="w-12 h-12 rounded-xl bg-gradient-to-r from-primary-500 to-cyber-500 flex items-center justify-center text-white text-xl shrink-0">
                💼
              </div>
              <div>
                <p class="text-sm text-gray-500 dark:text-gray-400">LinkedIn</p>
                <p class="font-medium text-gray-800 dark:text-white group-hover:text-primary-400 transition-colors">
                  Connect on LinkedIn
                </p>
              </div>
            </a>

            <a
              :href="personalInfo.github"
              target="_blank"
              class="flex items-center gap-4 p-4 rounded-xl glass-card transition-all duration-300 hover:scale-[1.02] glow-hover group"
            >
              <div class="w-12 h-12 rounded-xl bg-gradient-to-r from-primary-500 to-cyber-500 flex items-center justify-center text-white text-xl shrink-0">
                🐙
              </div>
              <div>
                <p class="text-sm text-gray-500 dark:text-gray-400">GitHub</p>
                <p class="font-medium text-gray-800 dark:text-white group-hover:text-primary-400 transition-colors">
                  View my code
                </p>
              </div>
            </a>
          </div>
        </div>

        <!-- Contact Form -->
        <div
          v-motion
          :initial="{ opacity: 0, x: 40 }"
          :visible-once="{ opacity: 1, x: 0, transition: { duration: 600 } }"
        >
          <form @submit.prevent="handleSubmit" class="p-8 rounded-2xl glass-card">
            <!-- Success Message -->
            <Transition
              enter-active-class="transition duration-300 ease-out"
              enter-from-class="opacity-0 scale-90"
              enter-to-class="opacity-100 scale-100"
              leave-active-class="transition duration-200 ease-in"
              leave-from-class="opacity-100 scale-100"
              leave-to-class="opacity-0 scale-90"
            >
              <div
                v-if="submitted"
                class="text-center py-12"
              >
                <div class="text-6xl mb-4 animate-bounce">🎉</div>
                <h3 class="text-2xl font-bold gradient-text mb-2">Message Sent!</h3>
                <p class="text-gray-500 dark:text-gray-400">Thank you for reaching out. I'll get back to you soon!</p>
              </div>
            </Transition>

            <div v-if="!submitted" class="space-y-5">
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Name</label>
                <input
                  v-model="form.name"
                  type="text"
                  required
                  placeholder="Your name"
                  class="w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-white/5 border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                />
                <p v-if="errors.name" class="text-red-400 text-xs mt-1">{{ errors.name }}</p>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Email</label>
                <input
                  v-model="form.email"
                  type="email"
                  required
                  placeholder="your@email.com"
                  class="w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-white/5 border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                />
                <p v-if="errors.email" class="text-red-400 text-xs mt-1">{{ errors.email }}</p>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Subject</label>
                <input
                  v-model="form.subject"
                  type="text"
                  required
                  placeholder="What's this about?"
                  class="w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-white/5 border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Message</label>
                <textarea
                  v-model="form.message"
                  required
                  rows="4"
                  placeholder="Tell me about your project..."
                  class="w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-white/5 border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all resize-none"
                />
                <p v-if="errors.message" class="text-red-400 text-xs mt-1">{{ errors.message }}</p>
              </div>
              <button
                type="submit"
                :disabled="sending"
                class="w-full py-3.5 bg-gradient-to-r from-primary-500 to-cyber-500 text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-primary-500/30 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {{ sending ? 'Sending...' : 'Send Message 🚀' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { personalInfo } from '../data'
import SectionHeading from './SectionHeading.vue'

const form = reactive({
  name: '',
  email: '',
  subject: '',
  message: '',
})

const errors = reactive({})
const sending = ref(false)
const submitted = ref(false)

function validate() {
  const e = {}
  if (!form.name.trim()) e.name = 'Name is required'
  if (!form.email.trim()) e.email = 'Email is required'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Invalid email format'
  if (!form.message.trim()) e.message = 'Message is required'
  Object.assign(errors, e)
  return Object.keys(e).length === 0
}

async function handleSubmit() {
  Object.keys(errors).forEach(k => delete errors[k])

  if (!validate()) return

  sending.value = true

  // Simulate sending (replace with EmailJS integration)
  await new Promise(r => setTimeout(r, 1500))

  sending.value = false
  submitted.value = true

  setTimeout(() => {
    submitted.value = false
    form.name = ''
    form.email = ''
    form.subject = ''
    form.message = ''
  }, 5000)
}
</script>
