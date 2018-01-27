import { h } from 'preact'
import styled from 'preact-emotion'
import { SelectedShip } from './SelectedShip'

export const Overlay = ({ gameState, ...props }) => (
  <Container>
    yolo
    {gameState.selectedShip && (
      <SelectedShip gameState={gameState} {...props} />
    )}
  </Container>
)

const Container = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100px;
  height: 100px;
`
