import * as THREE from 'three'

export const init = scene => {
  const light = new THREE.PointLight(0xdddddd, 1, 0, 2)
  light.position.set(5, 5, 25)
  scene.add(light)
}
