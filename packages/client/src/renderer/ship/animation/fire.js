import { models } from '../../_models'
import { play } from '~/util/sound'
const FIRE_DURATION = 100
const MUZZLE_DURATION = 30
const RECOIL_DURATION = 70
const SPLASH_DURATION = 40
const SPLASH_DELAY = 40

export const applyAnimation = (shipsContainer, animation) => {
  if (animation.k == 0) play('sound/boom/ripping_explosion.mp3')

  if (animation.k == SPLASH_DELAY) play('sound/heavy_splash.mp3')

  animation.k++

  const ship = shipsContainer.getObjectByName(animation.action.shipId)

  // muzzle
  let muzzle
  {
    muzzle = ship.children[0].getObjectByName('effect_muzzle')

    const model = models['effect_muzzle']

    if (!muzzle && model) {
      muzzle = model.clone()
      muzzle.name = 'effect_muzzle'

      ship.children[0].add(muzzle)

      // for destroyer
      muzzle.rotation.x = -0.9
      muzzle.position.z = 0.4
      muzzle.position.x = 0.115
      muzzle.position.y = -0.17
    }

    if (muzzle) {
      const x = animation.k / MUZZLE_DURATION

      const s =
        (x < 0.3 ? x / 0.3 : Math.max(0, 1 - (x - 0.3) / 0.7)) * 1 + 0.001

      muzzle.scale.set(s, s, s)
    }
  }

  // splash
  let splash
  {
    splash = shipsContainer.parent.getObjectByName('effect_splash')

    const model = models['effect_splash']

    if (!splash && model) {
      splash = model.clone()
      splash.name = 'effect_splash'

      shipsContainer.parent.add(splash)

      splash.position.x = animation.action.target.x
      splash.position.y = animation.action.target.y
    }

    if (splash) {
      const x = (animation.k - SPLASH_DELAY) / SPLASH_DURATION

      const s =
        (x < 0.3 ? x / 0.3 : Math.max(0, 1 - (x - 0.3) / 0.7)) * 2 + 0.001

      splash.visible = s > 0

      splash.scale.set(2, 2, s)
    }
  }

  // recoil
  {
    const x = animation.k / RECOIL_DURATION

    const s = (x < 0.3 ? x / 0.3 : Math.max(0, 1 - (x - 0.3) / 0.7)) * 0.5

    ship.children[0].position.y = -s
  }

  if (animation.k > FIRE_DURATION) {
    ship.children[0].position.x = 0
    muzzle && ship.children[0].remove(muzzle)
    splash && shipsContainer.parent.remove(splash)

    animation.done = true
    return
  }
}
