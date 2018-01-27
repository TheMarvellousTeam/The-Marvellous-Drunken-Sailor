import fetch from '~/util/fetch'
import { SRV_AD } from '~/util/const'

export const create = () => {
  let state = {
    lobby: [],
    actionToPull : -1,
    actionToRender: [],
  }

  const onLoadList = async () => {
    const res = await fetch(`${SRV_AD}/list`)
    state.lobby = res

    out.onStateChanged(state)
  }

  const onJoinRoom = async (roomId, username) => {
    const res = await fetch(`${SRV_AD}/${roomId}/join`, {
      method: 'POST',
      body: {uid: username}
    })

    state.roomId = res.room_id
    state.myTeam = res.playerTeam
    state.myTurn = true
    state.world = res.world

    out.onStateChanged(state)
  }

  const onDoAction = async action => {
    const res = await fetch(`${SRV_AD}/${state.roomId}/actions`, {
      method: 'POST',
      body: {action}
    })

  }

  const onEndTurn = async () => {
    const res = await fetch(`${SRV_AD}/${state.roomId}/end_turn`)
  }

  const onCreateRoom = async name => {
    const res = await fetch(`${SRV_AD}/create`, {
      method: 'POST',
      body: { uid: name },
    })

    state.roomId = res.room_id
    state.myTeam = res.playerTeam
    state.myTurn = false
    state.world = res.world

    out.onStateChanged(state)

    pollingLoop()
  }

  const pollingLoop = async () => {
    const res = await fetch(`${SRV_AD}/${state.roomId}/pull`)

    //TODO apply new action

    state.myTurn = (state.myTeam == res.world.currentPlayer)
    state.actionToRender.push( ...res.actions.filter(e => e.id > state.actionToPull ) )
    state.actionToPull = state.actionToRender[state.actionToRender.length-1]

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
    onStateChanged: () => 0,
  }

  return out
}
