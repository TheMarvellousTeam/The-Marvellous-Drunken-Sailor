import { create as createRenderer } from './renderer'
import { create as createLogic } from './logic'
import { create as createUi } from './ui'
import { gameState } from './logic/placeholderState'
import fetch from '~/util/fetch'
import { SRV_AD } from '~/util/const'

const x = createLogic()

x.onStateChanged = state => {
	console.log('state has changed!', state)
	document.getElementById("lobby").style.display = state.roomId ? "none" : "block"
	ui.onStateChanged(state)
	//renderer.onStateChanged(state)
}

const renderer = createRenderer(x)
const ui = createUi(x)

x.onLoadList()

renderer.onStateChanged(gameState)
renderer.onFrame(gameState)

// render loop
{
  const loop = () => {
    renderer.onFrame(gameState)

    requestAnimationFrame(loop)
  }
  loop()
}
