import { ref, onMounted, onUnmounted } from 'vue'

export function useMouseParallax(intensity = 0.02) {
    const x = ref(0)
    const y = ref(0)
    let animId = null

    function onMove(e) {
        if (animId) return
        animId = requestAnimationFrame(() => {
            const cx = window.innerWidth / 2
            const cy = window.innerHeight / 2
            x.value = (e.clientX - cx) * intensity
            y.value = (e.clientY - cy) * intensity
            animId = null
        })
    }

    onMounted(() => window.addEventListener('mousemove', onMove))
    onUnmounted(() => {
        window.removeEventListener('mousemove', onMove)
        if (animId) cancelAnimationFrame(animId)
    })

    return { x, y }
}
