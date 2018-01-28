import * as THREE from 'three'
import { toAngle } from '~/util/orientation'
import { onModelLoaded, models } from '../_models'

export const init = scene => {
  const container = new THREE.Object3D()

  scene.add(container)
  container.name = 'ships'
  container.position.z = -0.1
}

const createShip = ({ id, position, orientation, blueprint }) => {
  const container = new THREE.Object3D()
  container.name = id
  container.position.set(position.x, position.y, 0)
  container.rotation.z = toAngle(orientation || { x: 0, y: 0 })
  container.roll_theta = Math.random() * Math.PI

  let mesh = null
  if (blueprint === 'destroyer' )
    mesh = models['ship_destroyer']
  if (blueprint === 'heavy' )
      mesh = models['ship_heavy']
  if (blueprint === 'scout' )
      mesh = models['ship_light']

  if (!mesh) {
    const placeholder = new THREE.Object3D()
    placeholder.name = placeholder

    container.add(placeholder)

    onModelLoaded(() => {
      const mesh = models['ship_destroyer'].clone()

      container.remove(container.children[0])
      container.add(mesh)
    })
  } else container.add(mesh.clone())

  // var geometry = new THREE.BoxGeometry(0.5, 0.9, 0.5)
  // var material = new THREE.MeshPhongMaterial({ color: 0xf8f8f8 })
  // var cube = new THREE.Mesh(geometry, material)

  return container
}

export const onStateChanged = (scene, gameState) => {
  const shipsContainer = scene.getObjectByName('ships')

  // create
  gameState.ships.forEach(ship => {
    if (shipsContainer.getObjectByName(ship.id)) return

    shipsContainer.add(createShip(ship))
  })
}
