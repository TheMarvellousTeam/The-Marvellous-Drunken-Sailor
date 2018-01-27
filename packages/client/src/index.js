import { create as createRenderer } from './renderer'
import { create as createLogic } from './logic'
import { create as createUi } from './ui'
import { gameState } from './logic/placeholderState'

const x = createLogic()
//
// x.onStateChanged = state => console.log('state has changed!', state)
//
// window.onClick = () => x.onCreateRoom('room_1234')

const renderer = createRenderer(x)
const ui = createUi(x)

ui.onStateChanged(gameState)

renderer.onStateChanged(gameState)
renderer.onFrame()

// render loop
{
  const loop = () => {
    renderer.onFrame()

    requestAnimationFrame(loop)
  }
  loop()
}
