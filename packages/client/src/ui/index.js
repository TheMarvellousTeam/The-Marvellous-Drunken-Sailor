import preact, { h, render } from 'preact'

preact.createElement = preact.h
preact.PropTypes = { func: {} }
preact.Children = { only: arr => (Array.isArray(arr) ? arr[0] : arr) }

const Overlay = require('./Overlay').Overlay

export const create = actions => {
  const overlayDOM = document.getElementById('overlay')

  return {
    onStateChanged: gameState =>
      render(
        <Overlay {...actions} gameState={gameState} />,
        overlayDOM,
        overlayDOM.children[0]
      ),
  }
}
