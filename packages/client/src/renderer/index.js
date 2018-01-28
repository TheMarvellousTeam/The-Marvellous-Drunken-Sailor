import { create as createScene } from './scene'

const handler = [
  require('./grid'),
  require('./ship'),
  require('./light'),
  require('./helper'),

  //should be before camera to preventDefault
  require('./reactive'),
  require('./camera'),
]

export const create = actions => {
  const x = createScene()

  handler.forEach(({ init }) => init && init(x.scene, x, actions))

  let date = Date.now()

  return {
    onFrame: state => {
      const delta = Date.now() - date
      date = Date.now()

      handler.forEach(
        ({ onFrame }) => onFrame && onFrame(x.scene, state, date, delta, x)
      )

      x.render()
    },

    onStateChanged: state => {
      if (x.attached() && !state.started) x.detech()
      if (!x.attached() && state.started) x.attach()

      handler.forEach(
        ({ onStateChanged }) => onStateChanged && onStateChanged(x.scene, state)
      )
    },
  }
}
