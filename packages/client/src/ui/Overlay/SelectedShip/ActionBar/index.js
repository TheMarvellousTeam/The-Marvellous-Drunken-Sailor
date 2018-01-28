import { h } from 'preact'
import styled from 'preact-emotion'
import { canMove, canFire } from '~/logic/game'
import { SHIP_SPEC } from '~/util/const'

export const ActionBar = ({ onSelectTool, state }) => (
  <Container>
    {canMove(state, state.selectedShip) && (
      <Button onClick={() => onSelectTool('moveShip')}>move ship</Button>
    )}
    {canFire(state, state.selectedShip) && (
      <Button onClick={() => onSelectTool('fireShip')}>
        fire ship ({
          SHIP_SPEC[state.ships.find(s => s.id == state.selectedShip).blueprint]
            .fire_cost
        }{' '}
        pa)
      </Button>
    )}
  </Container>
)

const Button = styled.button`
  padding: 8px;
  margin-top: 8px;
  &:first-child {
    margin-top: 0px;
  }
`

const Container = styled.div`
  margin-left: 20px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  height: 90px;
`
