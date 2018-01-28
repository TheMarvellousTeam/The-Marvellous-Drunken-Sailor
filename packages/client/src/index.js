import { create as createRenderer } from './renderer'
import { create as createLogic } from './logic'
import { create as createUi } from './ui'

const x = createLogic()

x.onStateChanged = state => {
  ui.onStateChanged(state)
  renderer.onStateChanged(state)
}

const renderer = createRenderer(x)
const ui = createUi(x)

x.onStateChanged(x.getState())

// render loop
{
  const loop = () => {
    renderer.onFrame(x.getState())

    requestAnimationFrame(loop)
  }
  loop()
}
