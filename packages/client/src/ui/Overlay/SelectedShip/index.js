import { h } from 'preact'
import styled, { keyframes } from 'preact-emotion'
import { ActionBar } from './ActionBar'

export const SelectedShip = ({
  me,
  ships,
  currentPlayerId,
  selectedShip,
  ...props
}) => {
  const ship = ships.find(x => x.id === selectedShip)

  return (
    <Container>
      <div>
        <span>{ship.blueprint}</span>
        <span>{`${ship.pa}pa ${ship.pm}pm`}</span>
        <span>{`${ship.health}pv`}</span>
      </div>

      {me.id == currentPlayerId &&
        ship.playerId == me.id && <ActionBar {...props} />}
    </Container>
  )
}

const appearAnimation = keyframes`
  0%{ transform: translateX(-300px);}
  100%{ transform: translateX(0px);}
`

const Container = styled.div`
  animation: ${appearAnimation} 300ms ease;
  background-color: #aaa;
  padding: 10px;
`
