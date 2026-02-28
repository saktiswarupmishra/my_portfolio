import { ref, watch } from 'vue'

const isDark = ref(true)

// Initialize from localStorage
if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('theme')
    if (stored) {
        isDark.value = stored === 'dark'
    }
    applyTheme()
}

function applyTheme() {
    if (isDark.value) {
        document.documentElement.classList.add('dark')
    } else {
        document.documentElement.classList.remove('dark')
    }
}

watch(isDark, () => {
    localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
    applyTheme()
})

export function useTheme() {
    const toggle = () => {
        isDark.value = !isDark.value
    }
    return { isDark, toggle }
}
