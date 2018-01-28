import preact, { h, render } from 'preact'
import { play } from '~/util/sound'

preact.createElement = preact.h
preact.PropTypes = { func: {} }
preact.Children = { only: arr => (Array.isArray(arr) ? arr[0] : arr) }

const Overlay = require('./Overlay').Overlay
const Lobby = require('./Lobby').Lobby

export const create = actions => {
  const overlayDOM = document.getElementById('overlay')
  const lobbyDOM = document.getElementById('lobby')

  let music_started = false

  return {
    onStateChanged: state => {
      lobbyDOM.style.display = state.started ? 'none' : 'block'
      overlayDOM.style.display = !state.started ? 'none' : 'block'

      if (state.started && !music_started) {
        music_started = true
        play('sound/03_Marvelous_pirate_withmix_session.ogg', { loop: true })
      }

      render(
        <Overlay {...actions} {...state} state={state} />,
        overlayDOM,
        overlayDOM.children[0]
      )
      render(<Lobby {...actions} {...state} />, lobbyDOM, lobbyDOM.children[0])
    },
  }
}
