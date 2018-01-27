export * from './init'
import { applyAnimation as applyMoveAnimation } from './animation/move'
import { applyAnimation as applyFireAnimation } from './animation/fire'

export const onFrame = (scene, gameState, t) => {
  const shipsContainer = scene.getObjectByName('ships')

  for (let i = shipsContainer.children.length; i--; ) {
    const { roll_theta, children, name } = shipsContainer.children[i]

    const [o] = children

    const ship = gameState.ships.find(e => e.id == name)
    if (ship.orientation.y == 0) {
      o.rotation.y = Math.cos(t * 0.002 + roll_theta) * 0.12
      o.rotation.x = 0
    } else if (ship.orientation.x == 0) {
      o.rotation.x = Math.cos(t * 0.002 + roll_theta) * 0.12
      o.rotation.y = 0
    }
  }

  // animation
  if (scene.ship_animation && !scene.ship_animation.done) {
    // there is a pending animation
    switch (scene.ship_animation.action.type) {
      case 'moveShip':
        applyMoveAnimation(shipsContainer, scene.ship_animation)

      case 'fireShip':
        applyFireAnimation(shipsContainer, scene.ship_animation)
    }
  } else {
    // is there a next animation to pick?
    const lastActionIdDone = scene.ship_animation
      ? scene.ship_animation.action.id
      : -1

    const next = gameState.actions.find(x => x.id > lastActionIdDone)

    if (next) {
      scene.ship_animation = {
        action: next,
        done: false,
        k: 0,
      }
    }
  }
}
