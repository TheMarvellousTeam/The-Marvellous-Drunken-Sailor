import { h } from 'preact'
import styled from 'preact-emotion'
import { canMove, canFire } from '~/logic/game'

export const ActionBar = ({ onSelectTool, state }) => (
  <Container>
    {canMove(state, state.selectedShip) && (
      <Button onClick={() => onSelectTool('moveShip')}>move ship</Button>
    )}
    {canFire(state, state.selectedShip) && (
      <Button onClick={() => onSelectTool('fireShip')}>fire ship</Button>
    )}
  </Container>
)

const Button = styled.button`
  padding: 10px;
`

const Container = styled.div`
  background-color: #aaa;
  padding: 10px;
`
