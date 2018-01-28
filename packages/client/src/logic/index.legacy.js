import fetch from '~/util/fetch'
import { SRV_AD, SHIP_SPEC } from '~/util/const'

const defaultState = {
  roomId: null,

  players: [
    { id: 1, name: 'nelson', color: 'red' },
    { id: 2, name: 'ackbar', color: 'blue' },
  ],

  // list on joinable
  lobby: [],

  ships: [],
  actions: [],

  selectedShip: null,

  // moveShip | fireShip
  selectedTool: null,
}

const formatState = res => ({
  roomId: res.room_id,

  currentPlayer: res.currentPlayer,

  ships: [
    ...res.world.ships[0].map(x => ({ playerId: 1, ...x })),
    ...res.world.ships[1].map(x => ({ playerId: 2, ...x })),
  ],
})

export const create = () => {
  let state = { ...defaultState }

  const onLoadList = async () => {
    const res = await fetch(`${SRV_AD}/list`)
    state.lobby = res

    out.onStateChanged(state)
  }

  const onJoinRoom = async (roomId, username) => {
    const res = await fetch(`${SRV_AD}/${roomId}/join`, {
      method: 'POST',
      body: { uid: username },
    })

    state.roomId = res.room_id
    state.myTeam = res.player_team
    state.myTurn = true
    state.ships = res.world.ships[state.myTeam]
    state.enemyShips = res.world.ships[state.myTeam ? 0 : 1]
    state.island = res.world.island
    state.availablePa = {}
    state.ships.forEach(
      ship => (state.availablePa[ship.id] = SHIP_SPEC[ship.blueprint].pa)
    )

    out.onStateChanged(state)
  }

  const onDoAction = async action => {
    const a = { ...action, id: state.actions.length }

    state.actions.push(a)

    out.onStateChanged(state)

    const res = await fetch(`${SRV_AD}/${state.roomId}/actions`, {
      method: 'POST',
      body: { action },
    })
  }

  const onEndTurn = async () => {
    const res = await fetch(`${SRV_AD}/${state.roomId}/end_turn`)
    state.ships.forEach(
      ship => (state.availablePa[ship.id] = SHIP_SPEC[ship.blueprint].pa)
    )
  }

  const onCreateRoom = async name => {
    const res = await fetch(`${SRV_AD}/create`, {
      method: 'POST',
      body: { uid: name },
    })

    state.roomId = res.room_id
    state.myTeam = res.player_team
    state.myTurn = false
    state.ships = res.world.ships[state.myTeam]
    state.enemyShips = res.world.ships[state.myTeam ? 0 : 1]
    state.island = res.world.island
    state.availablePa = {}
    state.ships.forEach(
      ship => (state.availablePa[ship.id] = SHIP_SPEC[ship.blueprint].pa)
    )

    out.onStateChanged(state)

    pollingLoop()
  }

  const pollingLoop = async () => {
    const res = await fetch(`${SRV_AD}/${state.roomId}/pull`)

    //TODO apply new action

    state.myTurn = state.myTeam == res.world.currentPlayer
    state.actions = res.actions

    out.onStateChanged(state)

    setTimeout(pollingLoop, 2000)
  }

  const out = {
    onSelectShip: shipId => {
      state.selectedShip = shipId
      state.selectedTool = shipId && state.selectedTool

      out.onStateChanged(state)
    },
    onSelectTool: toolName => {
      state.selectedTool = toolName

      out.onStateChanged(state)
    },
    onJoinRoom,
    onCreateRoom,
    onDoAction,
    onEndTurn,
    onLoadList,
    getState: () => state,
    onStateChanged: () => 0,
  }

  return out
}
