import { create as createScene } from './scene'

const handler = [require('./grid'), require('./ship'), require('./light')]

export const create = () => {
  const x = createScene()

  x.attach()

  handler.forEach(({ init }) => init && init(x.scene))

  let date = Date.now()

  return {
    onFrame: gameState => {
      const delta = Date.now() - date
      date = Date.now()

      handler.forEach(
        ({ onFrame }) => onFrame && onFrame(x.scene, gameState, date, delta)
      )

      x.render()
    },

    onStateChage: gameState =>
      handler.forEach(
        ({ onStateChage }) => onStateChage && onStateChage(x.scene, gameState)
      ),

    applyAction: (gameState, action) =>
      handler.forEach(
        ({ applyAction }) =>
          applyAction && applyAction(x.scene, gameState, action)
      ),
  }
}
