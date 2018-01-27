import * as THREE from 'three'

const getPointer = e => ({
  x: (e.touches ? e.touches[0] : e).clientX,
  y: (e.touches ? e.touches[0] : e).clientY,
})

export const init = (_, { camera }) => {
  let anchorClient = null
  let anchorCamera = null

  const down = e => {
    anchorClient = getPointer(e)
    anchorCamera = camera.position.clone()

    e.preventDefault()
    e.stopPropagation()
  }

  const move = e => {
    if (!anchorClient) return

    const pointer = getPointer(e)

    const delta = {
      x: pointer.x - anchorClient.x,
      y: pointer.y - anchorClient.y,
    }

    camera.position.x = anchorCamera.x - delta.x * 0.02
    camera.position.y = anchorCamera.y + delta.y * 0.02

    camera._targetLookAt = camera._targetLookAt || {}
    camera._targetLookAt.x = camera.position.x
    camera._targetLookAt.y = camera.position.y + 4

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

  let c = d * 0.03

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

  camera.updateProjectionMatrix()
}
