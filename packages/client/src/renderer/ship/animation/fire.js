import { models } from '../../_models'

const FIRE_DURATION = 100
const MUZZLE_DURATION = 30
const RECOIL_DURATION = 70

const applyTransform = (o, m) => {
  if (o.geometry) o.geometry.applyMatrix(m)

  for (let i = o.children.length; i--; ) applyTransform(o.children[i], m)
}

export const applyAnimation = (shipsContainer, animation) => {
  animation.k++

  const ship = shipsContainer.getObjectByName(animation.action.shipId)

  let muzzle = ship.children[0].getObjectByName('effect_muzzle')

  const model = models['effect_muzzle']

  const a = -0.9

  if (!muzzle && model) {
    muzzle = model.clone()
    muzzle.name = 'effect_muzzle'

    ship.children[0].add(muzzle)

    muzzle.rotation.x = -0.9

    // for destroyer
    muzzle.position.z = 0.4
    muzzle.position.x = 0.115
    muzzle.position.y = -0.17
  }

  if (muzzle) {
    const x = animation.k / MUZZLE_DURATION

    const s = (x < 0.3 ? x / 0.3 : Math.max(0, 1 - (x - 0.3) / 0.7)) * 1

    muzzle.scale.set(s, s, s)
  }

  // recoil
  {
    const x = animation.k / RECOIL_DURATION

    const s = (x < 0.3 ? x / 0.3 : Math.max(0, 1 - (x - 0.3) / 0.7)) * 0.5

    ship.children[0].position.y = -s
  }

  if (animation.k > FIRE_DURATION) {
    ship.children[0].position.x = 0
    ship.children[0].remove(muzzle)

    animation.done = true
    return
  }
}
