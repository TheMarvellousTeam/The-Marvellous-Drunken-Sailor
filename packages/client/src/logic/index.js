import fetch from '~/util/fetch'
import { SRV_AD, SHIP_SPEC } from '~/util/const'
import * as mutations from './mutation'
import { applyAction } from './action'

const defaultState = {
  roomId: null,

  currentPlayerId: null,
  me: {},

  players: [],
  ships: [],
  actions: [],
  map: null,

  selectedShip: null,

  // moveShip | fireShip
  selectedTool: null,
}

export const create = () => {
  const state = { ...defaultState }

  // read roomId
  const m = location.search.match(/roomId=([\w-]+)/)
  state.roomId = m ? m[1] : null

  // generate player identity
  state.me = {
    id: Math.random()
      .toString(16)
      .slice(2),
    name: Math.random()
      .toString(16)
      .slice(2),
  }

  const listenRoom = async () => {
    state.connecting = true

    // try to join
    // may fail, in that case, fallback to spectactor
    await fetch(`${SRV_AD}/room/${state.roomId}/player`, {
      method: 'POST',
      body: { player: state.me },
    })
      // silent error
      .catch(err => console.log(err))

    // polling update loop
    const loop = async () => {
      const res = await fetch(`${SRV_AD}/room/${state.roomId}`)

      // init
      if (state.actions.length == 0) {
        state.ships = res.state0_ships
        state.currentPlayerId = res.state0_currentPlayerId
      }

      state.connecting = false
      state.players = res.players
      state.started = res.started

      // apply actions
      const lastActionId = state.actions.length
        ? state.actions[state.actions.length - 1].id
        : -Infinity

      const newActions = res.actions.filter(x => x.id > lastActionId)

      newActions.forEach(a => {
        applyAction(state, a)

        state.actions.push(a)
      })

      out.onStateChanged(state)

      setTimeout(loop, 2000)
    }

    loop()
  }

  if (state.roomId) listenRoom()

  const out = {
    getState: () => state,
    onStateChanged: () => 0,
  }

  // add mutations

  Object.keys(mutations).forEach(
    key =>
      (out[key] = async (...args) => {
        await mutations[key](out.onStateChanged, state, ...args)

        out.onStateChanged(state)
      })
  )

  return out
}
