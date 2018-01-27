import * as THREE from 'three'

window.THREE = THREE

export const create = (config = {}) => {
  const camera = new THREE.PerspectiveCamera(50, 1, 0.01, 3000)
  camera.position.set(0, 0, 12)
  camera.lookAt(new THREE.Vector3(0, 0, 0))
  camera.updateProjectionMatrix()

  const scene = new THREE.Scene()

  const renderer = new THREE.WebGLRenderer({ alpha: true, antialiasing: true })
  renderer.setClearColor(0x6dbd9a, 1)
  renderer.setPixelRatio(window.devicePixelRatio)

  window.scene = scene

  const setSize = (width, height) => {
    camera.aspect = width / height
    camera.updateProjectionMatrix()

    renderer.setSize(width, height)
  }

  const render = () => renderer.render(scene, camera)

  // attach canvas
  const ratio = 1
  const attach = () => {
    const container = document.getElementById('mainScene')
    container && (container.style.display = 'block')

    setTimeout(() => {
      const { width, height } = container.getBoundingClientRect()

      setSize(width * ratio, height * ratio)

      const canvas = renderer.domElement

      if (canvas.parentNode) canvas.parentNode.removeChild(canvas)

      container.appendChild(canvas)
      canvas.style = `width:${width}px;height:${height}px;`
    })
  }

  window.addEventListener('resize', () => {
    const container = document.getElementById('mainScene')
    const { width, height } = container.getBoundingClientRect()
    setSize(width * ratio, height * ratio)
  })

  const detach = () => {
    const canvas = renderer.domElement
    const container = document.getElementById('mainScene')
    container && (container.style.display = 'none')
    if (canvas.parentNode) canvas.parentNode.removeChild(canvas)
  }

  const attached = () => !!renderer.domElement.parentNode

  detach()

  return {
    scene,
    camera,
    render,
    attach,
    detach,
    attached,
  }
}
