import fetch from '~/util/fetch'

export const create = () => {
  let state = {
    previousActions: [],
  }

  const onJoinRoom = async roomId => 0

  const onDoAction = async action => 0

  const onEndTurn = async action => 0

  const onCreateRoom = async name => {
    const res = await fetch('http://localhost:8088/create', {
      body: { uid: name },
    })

    state.roomId = res.roomId

    out.onStateChanged(state)

    pollingLoop()
  }

  const pollingLoop = () => {
    // fetch new actions ...

    setTimeout(pollingLoop, 2000)
  }

  const out = {
    onJoinRoom,
    onCreateRoom,
    onStateChanged: () => 0,
  }

  return out
}
