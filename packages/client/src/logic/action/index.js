import { SRV_AD, SHIP_SPEC } from '~/util/const'

export const applyAction = (state, action) => {
  switch (action.type) {
    case 'fireShip': {
      const ship = state.ships.find(x => x.id == action.shipId)

      ship.pa--

      const shipAtTarget = state.ships.find(
        s => s.position.x == action.target.x && s.position.y == action.target.y
      )

      if (shipAtTarget)
        shipAtTarget.health =
          shipAtTarget.health - SHIP_SPEC[ship.blueprint].damage

      // reset ui
      state.selectedTool = null

      break
    }

    case 'moveShip': {
      const ship = state.ships.find(x => x.id == action.shipId)

      ship.position = action.path[action.path.length - 1]

      ship.pm -= action.path.length - 1

      // reset ui
      state.selectedTool = null

      break
    }

    case 'endTurn': {
      // change currentPlayerId
      const playerIndex = state.players.findIndex(
        x => x.id == state.currentPlayerId
      )

      state.currentPlayerId =
        state.players[(playerIndex + 1) % state.players.length].id

      // reset pa / pm
      state.ships.forEach(ship => {
        ship.pm = SHIP_SPEC[ship.blueprint].pm
        ship.pa = SHIP_SPEC[ship.blueprint].pa
      })

      // reset ui
      state.selectedTool = null

      break
    }
  }
}
