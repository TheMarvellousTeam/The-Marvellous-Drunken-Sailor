import * as THREE from 'three'

export const init = scene => {
  const light = new THREE.PointLight(0xaaaaaa, 1, 100)
  light.position.set(50, 50, 5)
  scene.add(light)
}
