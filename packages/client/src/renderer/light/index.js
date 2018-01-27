import * as THREE from 'three'

export const init = scene => {
  const light = new THREE.PointLight(0xdddddd, 1, 300)
  light.position.set(5, 5, 5)
  scene.add(light)
}
