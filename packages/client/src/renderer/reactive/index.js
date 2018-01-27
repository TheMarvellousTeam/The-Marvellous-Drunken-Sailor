import * as THREE from 'three'

const getPointer = e => ({
  x: (e.touches ? e.touches[0] : e).clientX,
  y: (e.touches ? e.touches[0] : e).clientY,
})

let gameState = null

const getShipId = o =>
  !o.parent
    ? null
    : (o.parent.name === 'ships' && o.name) || getShipId(o.parent)

export const init = (scene, { camera }, { onSelectShip }) => {
  let anchorClient = null
  let anchorCamera = null

  const raycaster = new THREE.Raycaster()
  const mouse = new THREE.Vector2()

  const cell = { x: 0, y: 0 }

  const down = e => {
    const pointer = getPointer(e)

    mouse.x = pointer.x / window.innerWidth * 2 - 1
    mouse.y = -(pointer.y / window.innerHeight) * 2 + 1

    raycaster.setFromCamera(mouse, camera)

    // const intersects = raycaster.intersectObjects(scene.children)
    //
    // console.log(intersects.find(x => getShipId(x.object)))

    const { origin, direction } = raycaster.ray

    const d = origin.z / direction.z

    cell.x = Math.floor(origin.x - direction.x * d + 0.5)
    cell.y = Math.floor(origin.y - direction.y * d + 0.5)

    const ship = gameState.ships.find(
      s => s.position.x == cell.x && s.position.y == cell.y
    )

    onSelectShip((ship && ship.id) || null)

    e.preventDefault()
    e.stopPropagation()
    e.stopImmediatePropagation()
  }

  const main = document.getElementById('mainScene')

  main.addEventListener('click', down)
  // main.addEventListener('touchstart', down)
  // main.addEventListener('mousedown', down)
}

export const onStateChanged = (_, s) => (gameState = s)
