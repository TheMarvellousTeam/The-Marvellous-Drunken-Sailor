import fetch from '~/util/fetch'
import { applyAction } from '../action'
import { SRV_AD } from '~/util/const'

export const endTurn = (update, state) =>
  doAction(update, state, {
    type: 'endTurn',
  })

export const moveShip = (update, state, shipId, path) =>
  doAction(update, state, {
    type: 'moveShip',
    path,
    shipId,
  })

export const fireShip = (update, state, shipId, target) =>
  doAction(update, state, {
    type: 'fireShip',
    target,
    shipId,
  })

export const doAction = async (update, state, action) => {
  action.id = state.actions.length + 1

  state.actions.push(action)

  applyAction(state, action)

  update(state)

  await fetch(`${SRV_AD}/room/${state.roomId}/action`, {
    method: 'POST',
    body: {
      actions: [action],
    },
  })
}
