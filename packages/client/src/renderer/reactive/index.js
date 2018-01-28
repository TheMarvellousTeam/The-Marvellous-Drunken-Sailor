import * as THREE from 'three'
import { getPossibleMove, getPossibleFireTarget } from '~/logic/game'

const getPointer = e => ({
  x: (e.touches ? e.touches[0] : e).clientX,
  y: (e.touches ? e.touches[0] : e).clientY,
})

let gameState = null

const getShipId = o =>
  !o.parent
    ? null
    : (o.parent.name === 'ships' && o.name) || getShipId(o.parent)

export const init = (
  scene,
  { camera },
  { onSelectShip, moveShip, fireShip }
) => {
  let anchorClient = null
  let startDate = null

  const raycaster = new THREE.Raycaster()
  const mouse = new THREE.Vector2()
  const cell = { x: 0, y: 0 }

  const down = e => {
    startDate = Date.now()
    anchorClient = getPointer(e)
  }

  const up = e => {
    if (Date.now() > startDate + 170) return

    const pointer = getPointer(e)

    const delta = {
      x: pointer.x - anchorClient.x,
      y: pointer.y - anchorClient.y,
    }

    if (Math.abs(delta.x) + Math.abs(delta.y) > 16) return

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

    // decide what action to trigger
    {
      // moveShip
      if (gameState.selectedTool == 'moveShip') {
        const x = getPossibleMove(gameState, gameState.selectedShip).find(
          u => u.target.x === cell.x && u.target.y === cell.y
        )

        if (x) return moveShip(gameState.selectedShip, x.path)
      }

      // fireShip
      if (gameState.selectedTool == 'fireShip') {
        const x = getPossibleFireTarget(gameState, gameState.selectedShip).some(
          u => u.x === cell.x && u.y === cell.y
        )

        if (x) return fireShip(gameState.selectedShip, cell)
      }

      // default, select ship
      const ship = gameState.ships.find(
        s => s.position.x == cell.x && s.position.y == cell.y
      )
      onSelectShip((ship && ship.id) || null)
    }
  }

  const main = document.getElementById('mainScene')

  main.addEventListener('touchstart', down)
  main.addEventListener('mousedown', down)
  main.addEventListener('touchend', up)
  main.addEventListener('mouseup', up)
}

export const onStateChanged = (_, s) => (gameState = s)
