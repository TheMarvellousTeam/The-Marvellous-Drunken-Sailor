import * as THREE from 'three'

let textureWaves
let bump

export const onFrame = () => {
  textureWaves.offset.y = (1 + Date.now() * 0.00003) % 1
  textureWaves.offset.x = Math.sin(Date.now() * 0.0001) * 0.2
}

export const init = scene => {
  const container = new THREE.Object3D()
  container.name = 'sea'
  container.position.z = 0.1

  scene.add(container)

  const l = 100

  {
    bump = new THREE.TextureLoader().load('image/displacement_map.png')
    bump.wrapS = bump.wrapT = THREE.RepeatWrapping
    bump.repeat.set(30, 30)

    textureWaves = new THREE.TextureLoader().load('image/waves.png')
    textureWaves.wrapS = textureWaves.wrapT = THREE.RepeatWrapping
    textureWaves.repeat.set(30, 30)

    const geo = new THREE.PlaneBufferGeometry(l, l)
    const mat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      map: textureWaves,

      displacementMap: bump,
      displacementScale: 6,
      // bumpMap: bump,
      // bumpScale: 6,

      transparent: true,
      opacity: 0.3,
    })
    const mesh = new THREE.Mesh(geo, mat)
    mesh.position.z = 0
    container.add(mesh)
  }
}
