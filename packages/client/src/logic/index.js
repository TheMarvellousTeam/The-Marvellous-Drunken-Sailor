import fetch from '~/util/fetch'

const SRV_AD = 'http://localhost:8088/'

export const create = () => {
  let state = {
    actionToPull : -1,
    actionToRender: [],
  }

  const onJoinRoom = async roomId => {
    const res = await fetch(`${SRV_AD}/${roomId}/join`)
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
      method: 'POST'
      body: { uid: name },
    })

    state.roomId = res.room_id
    state.myTeam = res.playerTeam
    state.myTurn = false
    state.world = res.world

    out.onStateChanged(state)

    pollingLoop()
  }

  const pollingLoop = () => {
    const res = await fetch(`${SRV_AD}/${state.roomId}/pull`)
    // apply new action

    state.myTurn = (state.myTeam == res.world.currentPlayer)
    state.actionToRender.push( ...res.actions.filter(e => e.id > state.actionToPull ) )
    state.actionToPull = state.actionToPull[state.actionToPull.length-1]

    out.onStateChanged(state)

    setTimeout(pollingLoop, 2000)
  }

  const out = {
    onJoinRoom,
    onCreateRoom,
    onDoAction,
    onEndTurn,
    onStateChanged: () => 0,
  }

  return out
}
