import { create as createRenderer } from './renderer'
import { create as createLogic } from './logic'
import { create as createUi } from './ui'
import fetch from '~/util/fetch'
import { SRV_AD } from '~/util/const'

const x = createLogic()

x.onStateChanged = state => {
  console.log('state has changed!', state)

  document.getElementById('lobby').style.display =
    state.roomId || true ? 'none' : 'block'

  ui.onStateChanged(state)
  renderer.onStateChanged(state)
}

const renderer = createRenderer(x)
const ui = createUi(x)

ui.onStateChanged(x.getState())
renderer.onStateChanged(x.getState())

x.onLoadList()

// render loop
{
  const loop = () => {
    renderer.onFrame(x.getState())

    requestAnimationFrame(loop)
  }
  loop()
}
