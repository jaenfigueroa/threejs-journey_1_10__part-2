import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

/* Textures */

/* FORMA 2 - MAS FACIL, USANDO SOLO THREE.JS*/

const loadingManager = new THREE.LoadingManager()

// loadingManager.onStart = () => {
//   console.log('se inicio la carga')
// }

// loadingManager.onProgress = () => {
//   console.log('se esta cargando')
// }

// loadingManager.onLoad = () => {
//   console.log('se cargo todo')
// }

// loadingManager.onError = () => {
//   console.log('se produjo un error al cargar')
// }

const textureLoader = new THREE.TextureLoader(loadingManager)

// const myTexture = textureLoader.load(
//   '/textures/door/color.jpg',
//   () => {
//     console.log('se cargo la imagen')
//   },
//   () => {
//     console.log('se esta cargando la imagen')
//   },
//   () => {
//     console.log('se produjo un error al cargar la imagen')
//   }
// )

// const colorTexture = textureLoader.load('/textures/door/color.jpg')
// const colorTexture = textureLoader.load('/textures/checkerboard-1024x1024.png')
// const colorTexture = textureLoader.load('/textures/checkerboard-8x8.png')
const colorTexture = textureLoader.load('/textures/minecraft.png')
colorTexture.colorSpace = THREE.SRGBColorSpace

// colorTexture.repeat.x = 2
// colorTexture.repeat.y = 2

// colorTexture.wrapS = THREE.RepeatWrapping
// colorTexture.wrapT = THREE.RepeatWrapping

// colorTexture.wrapS = THREE.MirroredRepeatWrapping
// colorTexture.wrapT = THREE.MirroredRepeatWrapping

// colorTexture.offset.x = 0.5
// colorTexture.offset.y = 0.5

// colorTexture.rotation = Math.PI / 4

// colorTexture.center.x = 0.5
// colorTexture.center.y = 0.5

//------------------------------------------
// colorTexture.minFilter = THREE.NearestFilter
// colorTexture.generateMipmaps = false // si usams NearestFilter, no es necesario generar mipmaps, con eso mejoramos el rendimiento

colorTexture.magFilter = THREE.NearestFilter
//------------------------------------------

// const alphaTexture = textureLoader.load('/textures/door/alpha.jpg')
// alphaTexture.colorSpace = THREE.SRGBColorSpace

// const heightTexture = textureLoader.load('/textures/door/height.jpg')
// heightTexture.colorSpace = THREE.SRGBColorSpace

// const normalTexture = textureLoader.load('/textures/door/normal.jpg')
// normalTexture.colorSpace = THREE.SRGBColorSpace

// const ambientOcclusionTexture = textureLoader.load(
//   '/textures/door/ambientOcclusion.jpg'
// )
// ambientOcclusionTexture.colorSpace = THREE.SRGBColorSpace

// const metalnessTexture = textureLoader.load('/textures/door/metalness.jpg')
// metalnessTexture.colorSpace = THREE.SRGBColorSpace

// const roughnessTexture = textureLoader.load('/textures/door/roughness.jpg')
// roughnessTexture.colorSpace = THREE.SRGBColorSpace

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Object
 */
const geometry = new THREE.BoxGeometry(1, 1, 1)
// const geometry = new THREE.SphereGeometry(1, 12, 12)
// const geometry = new THREE.ConeGeometry(1, 1, 32)
// const geometry = new THREE.TorusGeometry(1, 0.35, 32, 100)

// console.log(geometry.attributes.uv)

// const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const material = new THREE.MeshBasicMaterial({
  map: colorTexture,
  //   wireframe: true,
})
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
}

window.addEventListener('resize', () => {
  // Update sizes
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight

  // Update camera
  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()

  // Update renderer
  renderer.setSize(sizes.width, sizes.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
)
// camera.position.x = 1.3
// camera.position.y = 1.3
camera.position.z = 1.4
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
// const clock = new THREE.Clock()

const tick = () => {
  //   const elapsedTime = clock.getElapsedTime()

  // Update controls
  controls.update()

  // Render
  renderer.render(scene, camera)

  // Call tick again on the next frame
  window.requestAnimationFrame(tick)
}

tick()
