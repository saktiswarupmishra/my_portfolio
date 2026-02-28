<template>
  <div ref="container" class="w-full h-64 md:h-80" />
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import * as THREE from 'three'

const container = ref(null)
let scene, camera, renderer, orb, ring1, ring2, dots, animId
let mouse = { x: 0, y: 0 }

function onResize() {
  if (!renderer || !container.value) return
  const w = container.value.clientWidth
  const h = container.value.clientHeight
  camera.aspect = w / h
  camera.updateProjectionMatrix()
  renderer.setSize(w, h)
}

function onMouseMove(e) {
  if (!container.value) return
  const rect = container.value.getBoundingClientRect()
  mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1
  mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1
}

function init() {
  if (!container.value) return
  const w = container.value.clientWidth
  const h = container.value.clientHeight

  scene = new THREE.Scene()
  camera = new THREE.PerspectiveCamera(60, w / h, 0.1, 100)
  camera.position.z = 6

  renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
  renderer.setSize(w, h)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.setClearColor(0x000000, 0)
  container.value.appendChild(renderer.domElement)

  // Main wireframe icosahedron
  const icoGeo = new THREE.IcosahedronGeometry(2, 1)
  const icoMat = new THREE.MeshBasicMaterial({
    color: 0x6366f1,
    wireframe: true,
    transparent: true,
    opacity: 0.35,
  })
  orb = new THREE.Mesh(icoGeo, icoMat)
  scene.add(orb)

  // Outer ring 1
  const ring1Geo = new THREE.RingGeometry(2.6, 2.65, 64)
  const ring1Mat = new THREE.MeshBasicMaterial({
    color: 0x0ea5e9,
    transparent: true,
    opacity: 0.25,
    side: THREE.DoubleSide,
  })
  ring1 = new THREE.Mesh(ring1Geo, ring1Mat)
  ring1.rotation.x = Math.PI / 3
  scene.add(ring1)

  // Outer ring 2
  const ring2Geo = new THREE.RingGeometry(3.0, 3.04, 64)
  const ring2Mat = new THREE.MeshBasicMaterial({
    color: 0x818cf8,
    transparent: true,
    opacity: 0.18,
    side: THREE.DoubleSide,
  })
  ring2 = new THREE.Mesh(ring2Geo, ring2Mat)
  ring2.rotation.x = -Math.PI / 4
  ring2.rotation.y = Math.PI / 6
  scene.add(ring2)

  // Orbiting dots (skill nodes)
  const dotCount = 12
  const dotGeo = new THREE.SphereGeometry(0.08, 8, 8)
  dots = []
  for (let i = 0; i < dotCount; i++) {
    const mat = new THREE.MeshBasicMaterial({
      color: i % 2 === 0 ? 0x6366f1 : 0x0ea5e9,
      transparent: true,
      opacity: 0.9,
    })
    const dot = new THREE.Mesh(dotGeo, mat)
    dot.userData = {
      angle: (i / dotCount) * Math.PI * 2,
      radius: 2.3 + Math.random() * 0.8,
      speed: 0.003 + Math.random() * 0.005,
      yOff: (Math.random() - 0.5) * 1.5,
    }
    scene.add(dot)
    dots.push(dot)
  }

  window.addEventListener('resize', onResize)
  container.value.addEventListener('mousemove', onMouseMove)

  animate()
}

function animate() {
  animId = requestAnimationFrame(animate)
  if (!orb) return

  const t = Date.now() * 0.001

  orb.rotation.y += 0.004
  orb.rotation.x += 0.002

  ring1.rotation.z += 0.003
  ring2.rotation.z -= 0.002

  // Orbiting dots
  for (const dot of dots) {
    const { angle, radius, speed, yOff } = dot.userData
    dot.userData.angle += speed
    dot.position.x = Math.cos(dot.userData.angle) * radius
    dot.position.z = Math.sin(dot.userData.angle) * radius
    dot.position.y = yOff + Math.sin(t * 2 + angle) * 0.3
  }

  // Mouse reaction
  orb.rotation.x += mouse.y * 0.01
  orb.rotation.y += mouse.x * 0.01

  // Subtle pulsing scale
  const scale = 1 + Math.sin(t * 1.5) * 0.03
  orb.scale.set(scale, scale, scale)

  renderer.render(scene, camera)
}

function dispose() {
  if (animId) cancelAnimationFrame(animId)
  window.removeEventListener('resize', onResize)
  if (container.value) {
    container.value.removeEventListener('mousemove', onMouseMove)
  }

  scene?.traverse(obj => {
    if (obj.geometry) obj.geometry.dispose()
    if (obj.material) obj.material.dispose()
  })

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
