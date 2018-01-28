import { h } from 'preact'
import styled, { keyframes } from 'preact-emotion'
import { ActionBar } from './ActionBar'
import { Portrait } from './Portrait'

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
      <Portrait ship={ship} />

      <Info>
        <span style={{ fontWeight: 'bold' }}>{ship.blueprint} </span>
        <span>{`${ship.pa}pa ${ship.health}pv`}</span>
      </Info>

      {me.id == currentPlayerId &&
        ship.playerId == me.id && <ActionBar {...props} />}
    </Container>
  )
}

const appearAnimation = keyframes`
  0%{ transform: translateX(-400px);}
  50%{ transform: translateX(-400px);}
  100%{ transform: translateX(0px);}
`

const Info = styled.div`
  margin-left: 20px;
  display: flex;
  flex-direction: column;
  font-size: 0.9em;
`
const Container = styled.div`
  margin-top: 4px;
  animation: ${appearAnimation} 600ms ease;
  background-color: #aaa;
  padding: 10px;
  height: 45px;

  border-radius: 0 4px 4px 0;

  display: flex;
  flex-direction: row;
`
