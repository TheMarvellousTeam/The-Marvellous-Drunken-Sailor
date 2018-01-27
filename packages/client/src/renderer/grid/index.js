import * as THREE from 'three'

export const init = scene => {
  const container = new THREE.Object3D()

  scene.add(container)
  container.name = 'ground'
  container.position.z = 0

  const geo = new THREE.PlaneBufferGeometry(1, 1)
  const mat = new THREE.MeshBasicMaterial({
    color: 0xf41f2f,
    transparent: true,
    opacity: 0.4,
  })

  for (let x = -10; x < 10; x += 1)
    for (let y = -10 + x % 2; y < 10; y += 2) {
      const mesh = new THREE.Mesh(geo, mat)

      mesh.position.x = x
      mesh.position.y = y

      container.add(mesh)
    }

  // var geometry = new THREE.BoxGeometry(1, 1, 1)
  // var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
  // var cube = new THREE.Mesh(geometry, material)
  // cube.name = 'cube'
  // scene.add(cube)
}
