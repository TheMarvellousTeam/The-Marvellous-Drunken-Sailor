import { toAngle } from '~/util/orientation'

const CHIP_VELOCITY = 0.02

const lerpPoint = (a, b, k) =>
  (k <= 0 && a) ||
  (k >= 1 && b) || {
    x: (1 - k) * a.x + k * b.x,
    y: (1 - k) * a.y + k * b.y,
  }

const animationDone = (path, k) => path.length * CHIP_VELOCITY > k

const lerpPath = (path, k) => {
  const a = path[Math.min(path.length - 1, Math.floor(k * CHIP_VELOCITY))]
  const b = path[Math.min(path.length - 1, Math.floor(k * CHIP_VELOCITY) + 1)]

  return lerpPoint(a, b, (k * CHIP_VELOCITY) % 1)
}

export const applyAnimation = (shipsContainer, animation) => {
  animation.k++

  const ship = shipsContainer.getObjectByName(animation.action.shipId)

  const nextPos = lerpPath(animation.action.path, animation.k)

  const vx = ship.position.x - nextPos.x
  const vy = ship.position.y - nextPos.y

  if (vx === 0 && vy === 0) {
    animation.done = true
    return
  }

  const orientation = {
    x: Math.abs(vx) > Math.abs(vy) ? (vx > 0 ? -1 : 1) : 0,
    y: Math.abs(vy) > Math.abs(vx) ? (vy > 0 ? -1 : 1) : 0,
  }

  ship.position.x = nextPos.x
  ship.position.y = nextPos.y

  ship.rotation.z = toAngle(orientation)
}
