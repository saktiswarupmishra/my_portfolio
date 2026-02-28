<template>
  <div ref="container" class="absolute inset-0 overflow-hidden" />
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import * as THREE from 'three'

const container = ref(null)
let scene, camera, renderer, particles, lines, animId
let mouse = { x: 0, y: 0 }
let isMobile = false

function onResize() {
  if (!renderer || !container.value) return
  const w = container.value.clientWidth
  const h = container.value.clientHeight
  camera.aspect = w / h
  camera.updateProjectionMatrix()
  renderer.setSize(w, h)
}

function onMouseMove(e) {
  mouse.x = (e.clientX / window.innerWidth) * 2 - 1
  mouse.y = -(e.clientY / window.innerHeight) * 2 + 1
}

function init() {
  if (!container.value) return
  isMobile = window.innerWidth < 768

  const w = container.value.clientWidth
  const h = container.value.clientHeight

  // Scene
  scene = new THREE.Scene()

  // Camera
  camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000)
  camera.position.z = 30

  // Renderer
  renderer = new THREE.WebGLRenderer({ alpha: true, antialias: !isMobile })
  renderer.setSize(w, h)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.setClearColor(0x000000, 0)
  container.value.appendChild(renderer.domElement)

  // Particles
  const count = isMobile ? 60 : 150
  const positions = new Float32Array(count * 3)
  const velocities = []

  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 60
    positions[i * 3 + 1] = (Math.random() - 0.5) * 60
    positions[i * 3 + 2] = (Math.random() - 0.5) * 30
    velocities.push({
      x: (Math.random() - 0.5) * 0.02,
      y: (Math.random() - 0.5) * 0.02,
      z: (Math.random() - 0.5) * 0.01,
    })
  }

  const particleGeo = new THREE.BufferGeometry()
  particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3))

  const particleMat = new THREE.PointsMaterial({
    size: isMobile ? 0.12 : 0.15,
    color: 0x818cf8,
    transparent: true,
    opacity: 0.8,
    blending: THREE.AdditiveBlending,
    sizeAttenuation: true,
  })

  particles = new THREE.Points(particleGeo, particleMat)
  scene.add(particles)

  // Lines geometry (updated each frame)
  const lineGeo = new THREE.BufferGeometry()
  const lineMat = new THREE.LineBasicMaterial({
    color: 0x6366f1,
    transparent: true,
    opacity: 0.15,
    blending: THREE.AdditiveBlending,
  })
  lines = new THREE.LineSegments(lineGeo, lineMat)
  scene.add(lines)

  // Store refs for animation
  particles.userData = { velocities, count }

  window.addEventListener('resize', onResize)
  window.addEventListener('mousemove', onMouseMove)

  animate()
}

function animate() {
  animId = requestAnimationFrame(animate)
  if (!particles) return

  const pos = particles.geometry.attributes.position.array
  const { velocities, count } = particles.userData

  // Move particles
  for (let i = 0; i < count; i++) {
    pos[i * 3] += velocities[i].x
    pos[i * 3 + 1] += velocities[i].y
    pos[i * 3 + 2] += velocities[i].z

    // Wrap around boundaries
    if (Math.abs(pos[i * 3]) > 30) velocities[i].x *= -1
    if (Math.abs(pos[i * 3 + 1]) > 30) velocities[i].y *= -1
    if (Math.abs(pos[i * 3 + 2]) > 15) velocities[i].z *= -1
  }

  // Mouse interaction — attract near particles
  const mouseVec = new THREE.Vector3(mouse.x * 20, mouse.y * 20, 0)
  for (let i = 0; i < count; i++) {
    const dx = mouseVec.x - pos[i * 3]
    const dy = mouseVec.y - pos[i * 3 + 1]
    const dist = Math.sqrt(dx * dx + dy * dy)
    if (dist < 12) {
      pos[i * 3] += dx * 0.003
      pos[i * 3 + 1] += dy * 0.003
    }
  }

  particles.geometry.attributes.position.needsUpdate = true

  // Build line connections
  const threshold = isMobile ? 6 : 8
  const lineVerts = []
  for (let i = 0; i < count; i++) {
    for (let j = i + 1; j < count; j++) {
      const dx = pos[i * 3] - pos[j * 3]
      const dy = pos[i * 3 + 1] - pos[j * 3 + 1]
      const dz = pos[i * 3 + 2] - pos[j * 3 + 2]
      const dist = Math.sqrt(dx * dx + dy * dy + dz * dz)
      if (dist < threshold) {
        lineVerts.push(pos[i * 3], pos[i * 3 + 1], pos[i * 3 + 2])
        lineVerts.push(pos[j * 3], pos[j * 3 + 1], pos[j * 3 + 2])
      }
    }
  }

  lines.geometry.dispose()
  const newGeo = new THREE.BufferGeometry()
  newGeo.setAttribute('position', new THREE.Float32BufferAttribute(lineVerts, 3))
  lines.geometry = newGeo

  // Subtle scene rotation
  scene.rotation.y += 0.0005
  scene.rotation.x = mouse.y * 0.05

  renderer.render(scene, camera)
}

function dispose() {
  if (animId) cancelAnimationFrame(animId)
  window.removeEventListener('resize', onResize)
  window.removeEventListener('mousemove', onMouseMove)

  if (particles) {
    particles.geometry.dispose()
    particles.material.dispose()
  }
  if (lines) {
    lines.geometry.dispose()
    lines.material.dispose()
  }
  if (renderer) {
    renderer.dispose()
    if (container.value && renderer.domElement.parentNode === container.value) {
      container.value.removeChild(renderer.domElement)
    }
  }
}

onMounted(init)
onUnmounted(dispose)
</script>
