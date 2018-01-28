import * as THREE from 'three'
import { toAngle } from '~/util/orientation'
import { onModelLoaded, models, setColor } from '../_models'
import { getPlayerColor } from '~/util/color'

export const init = scene => {
  const container = new THREE.Object3D()

  scene.add(container)
  container.name = 'ships'
  container.position.z = -0.1
}

const createShip = ({ playerId, id, position, orientation, blueprint }) => {
  const container = new THREE.Object3D()
  container.name = id
  container.position.set(position.x, position.y, 0)
  container.rotation.z = toAngle(orientation || { x: 0, y: 0 })
  container.roll_theta = Math.random() * Math.PI

  let mesh = null
  if (blueprint === 'destroyer') mesh = models['ship_destroyer']
  if (blueprint === 'heavy') mesh = models['ship_heavy']
  if (blueprint === 'scout') mesh = models['ship_light']

  const color = getPlayerColor(playerId)

  if (!mesh) {
    const placeholder = new THREE.Object3D()
    placeholder.name = placeholder

    container.add(placeholder)

    onModelLoaded(() => {
      const mesh = models['ship_destroyer'].clone()

      container.remove(container.children[0])
      container.add(setColor(mesh, color))
    })
  } else container.add(setColor(mesh.clone(), color))

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
