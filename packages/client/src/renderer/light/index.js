import * as THREE from 'three'

export const init = scene => {
  const light = new THREE.DirectionalLight(0xdddddd, 1)
  light.position.set(3.58, -3.3, 2)
  light.name = 'directional'
  scene.add(light)

  const light2 = new THREE.AmbientLight(0xc9d2e0, 0.5)
  light2.name = 'ambient'
  scene.add(light2)
}
