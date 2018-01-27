import { create } from './renderer'
import { create as createLogic } from './logic'

const x = createLogic()

x.onStateChanged = state => console.log('state has changed!', state)

window.onClick = () => x.onCreateRoom('room_1234')

// const renderer = create()
//
// renderer.onStateChage(gameState)
// renderer.onFrame()
//
// // render loop
// {
//   const loop = () => {
//     renderer.onFrame()
//
//     requestAnimationFrame(loop)
//   }
//   loop()
// }
