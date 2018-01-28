import { h } from 'preact'
import styled, { keyframes } from 'preact-emotion'
import { getPlayerColor } from '~/util/color'

export const TimeLine = ({ players, currentPlayerId, me, endTurn }) => (
  <Container>
    {!players.some(x => x.id == me.id) && <span>you are spectating</span>}

    {players.map(player => (
      <Player
        selected={player.id == currentPlayerId}
        color={getPlayerColor(player.id)}
        key={player.id}
      >
        <PlayerColor
          selected={player.id == currentPlayerId}
          style={{ backgroundColor: getPlayerColor(player.id) }}
        />
        <PlayerName>
          {me.id == player.id ? 'you' : player.name.slice(0, 4)}
        </PlayerName>
      </Player>
    ))}

    {me.id == currentPlayerId && <button onClick={endTurn}>end my turn</button>}
  </Container>
)

const PlayerName = styled.div`
  border-radius: 4px;
  background-color: #fff;
  padding: 2px 4px;
  position: absolute;
  bottom: -4px;
  right: -4px;
`
const PlayerColor = styled.div`
  border-radius: 40px;
  border: solid 2px #fff;
  width: 30px;
  height: 30px;
  transition: transform 300ms ease;
  transform: ${props =>
    props.selected ? 'scale(1.4,1.4)' : 'scale(0.8,0.8) translateY(-3px)'};
`
const Player = styled.div`
  width: 60px;
  height: 40px;
  margin-left: 30px;
  border-radius: 4px;
  background-color: rgba(255, 255, 255, 0.3);
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`
const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: #aaa;
  padding: 10px;
  border-radius: 0 0 4px 0;
  font-size: 0.9em;
`
