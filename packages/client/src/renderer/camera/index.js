import * as THREE from 'three'

const getPointer = e => ({
  x: (e.touches ? e.touches[0] : e).clientX,
  y: (e.touches ? e.touches[0] : e).clientY,
})

let state = null

export const init = (_, { camera }) => {
  let anchorClient = null
  let anchorCamera = null
  let startDate = null
  let deltaSup = false

  const down = e => {
    deltaSup = false
    startDate = Date.now()
    anchorClient = getPointer(e)
    anchorCamera = camera.position.clone()
  }

  const move = e => {
    if (!anchorClient || Date.now() < startDate + 70) return

    const pointer = getPointer(e)

    const delta = {
      x: pointer.x - anchorClient.x,
      y: pointer.y - anchorClient.y,
    }

    deltaSup = deltaSup || Math.abs(delta.x) + Math.abs(delta.y) > 16

    if (!deltaSup) return

    camera.position.x = anchorCamera.x - delta.x * 0.03
    camera.position.y = anchorCamera.y + delta.y * 0.03

    camera._targetLookAt = camera._targetLookAt || {}
    camera._targetLookAt.x = camera.position.x
    camera._targetLookAt.y = camera.position.y + 4

    // switch (state.players.findIndex(x => x.id == state.me.id)) {
    //   case -1:
    //     camera._targetLookAt.x = camera.position.x + 4
    //   case 0:
    //     camera._targetLookAt.y = camera.position.y + 4
    //   case 1:
    //     camera._targetLookAt.y = camera.position.y - 4
    // }

    e.preventDefault()
    e.stopPropagation()
  }

  const up = e => (anchorClient = null)

  const main = document.getElementById('mainScene')

  main.addEventListener('touchstart', down, true)
  main.addEventListener('touchmove', move, true)
  main.addEventListener('touchend', up)
  main.addEventListener('touchcancel', up)
  main.addEventListener('mousedown', down)
  main.addEventListener('mousemove', move)
  main.addEventListener('mouseup', up)
}

const dist = (x, y) => Math.sqrt(x * x + y * y)

export const onFrame = (_1, _2, _3, _4, { camera }) => {
  if (!camera._targetLookAt) return

  const vx = camera._targetLookAt.x - camera._lookingAt.x
  const vy = camera._targetLookAt.y - camera._lookingAt.y
  const d = dist(vx, vy)

  let c = d * 0.1

  if (d < 0.02) {
    c = d
    camera._targetLookAt = null
  }

  camera._lookingAt = new THREE.Vector3(
    camera._lookingAt.x + vx * c / d,
    camera._lookingAt.y + vy * c / d,
    0
  )

  camera.lookAt(camera._lookingAt)
  // camera.up = new THREE.Vector3(0, 0, 1)

  camera.updateProjectionMatrix()
}

export const onStateChanged = (_, s) => (state = s)
