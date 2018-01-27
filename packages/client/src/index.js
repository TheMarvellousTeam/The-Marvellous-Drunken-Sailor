import { create } from './renderer'
import { gameState } from './logic'

const renderer = create()

renderer.onStateChage(gameState)
renderer.onFrame()

// render loop
{
  const loop = () => {
    renderer.onFrame()

    requestAnimationFrame(loop)
  }
  loop()
}
