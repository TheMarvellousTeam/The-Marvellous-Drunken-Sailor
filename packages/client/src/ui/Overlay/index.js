import { h } from 'preact'
import styled from 'preact-emotion'
import { SelectedShip } from './SelectedShip'
import { TimeLine } from './TimeLine'

export const Overlay = ({ state, ...props }) => (
  <Container>
    <TimeLine {...props} />

    {state.selectedShip && (
      <SelectedShip key={state.selectedShip} state={state} {...props} />
    )}
  </Container>
)

const Container = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`
