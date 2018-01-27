import { h } from 'preact'
import styled from 'preact-emotion'
import { ActionBar } from './ActionBar'

export const SelectedShip = ({ gameState, ...props }) => (
  <Container>
    {gameState.selectedShip}

    <ActionBar {...props} />
  </Container>
)

const Container = styled.div`
  background-color: #aaa;
  padding: 10px;
`
