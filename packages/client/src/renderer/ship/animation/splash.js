import { models } from '../../_models'
import { play } from '~/util/sound'

const SPLASH_DURATION = 60

export const applyAnimation = (shipsContainer, animation) => {
  if (animation.k == 0) play('sound/heavy_splash.mp3')

  animation.k++

  let splash = shipsContainer.parent.getObjectByName('effect_splash')

  const model = models['effect_splash']

  if (!splash && model) {
    splash = model.clone()
    splash.name = 'effect_splash'

    shipsContainer.parent.add(splash)

    splash.position.x = animation.action.target.x
    splash.position.y = animation.action.target.y
  }

  if (splash) {
    const x = animation.k / SPLASH_DURATION

    const s = (x < 0.3 ? x / 0.3 : Math.max(0, 1 - (x - 0.3) / 0.7)) * 2

    splash.scale.set(2, 2, s)
  }

  if (animation.k > SPLASH_DURATION) {
    shipsContainer.parent.remove(splash)

    animation.done = true
    return
  }
}
