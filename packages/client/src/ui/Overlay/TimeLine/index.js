import { h } from 'preact'
import styled, { keyframes } from 'preact-emotion'

export const TimeLine = ({ players, currentPlayerId, me, endTurn }) => (
  <Container>
    {!players.some(x => x.id == me.id) && <span>you are spectating</span>}

    {players.map(player => (
      <Player selected={player.id == currentPlayerId} key={player.id}>
        {me.id == player.id ? 'you' : player.name}
      </Player>
    ))}

    {me.id == currentPlayerId && <button onClick={endTurn}>end my turn</button>}
  </Container>
)

const Player = styled.div`
  font-weight: ${props => (props.selected ? 'bold' : 'normal')};
  padding: 10px;
  margin-left: 20px;
`
const Container = styled.div`
  display: flex;
  flex-direction: row;
  background-color: #aaa;
  padding: 10px;
`
