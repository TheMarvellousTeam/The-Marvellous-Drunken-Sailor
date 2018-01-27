import { create as createScene } from './scene'

const handler = [
  require('./grid'),
  require('./ship'),
  require('./light'),
  require('./helper'),
  require('./camera'),
]

export const create = () => {
  const x = createScene()

  x.attach()

  handler.forEach(({ init }) => init && init(x.scene, x))

  let date = Date.now()

  return {
    onFrame: gameState => {
      const delta = Date.now() - date
      date = Date.now()

      handler.forEach(
        ({ onFrame }) => onFrame && onFrame(x.scene, gameState, date, delta, x)
      )

      x.render()
    },

    onStateChanged: gameState =>
      handler.forEach(
        ({ onStateChanged }) =>
          onStateChanged && onStateChanged(x.scene, gameState)
      ),

    applyAction: (gameState, action) =>
      handler.forEach(
        ({ applyAction }) =>
          applyAction && applyAction(x.scene, gameState, action)
      ),
  }
}
