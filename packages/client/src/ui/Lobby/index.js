import { h } from 'preact'
import styled from 'preact-emotion'

const randomRoomName = () =>
  Math.random()
    .toString(16)
    .slice(2, 6)

export const Lobby = ({ roomId, started, connecting }) => (
  <Container>
    <div class="gradient">
    <div class="center">
      <div class="logo"></div>
      {!roomId && <a class="playButton" href={`?roomId=${randomRoomName()}`}>Play</a>}
    
    {connecting && <span>{`connecting to ${roomId}`}</span>}
    
    {!connecting && roomId && <span>{`waiting for another player in ${roomId}`}</span>}

      <br/> A<a href="https://github.com/TheMarvellousTeam/">Marvellous Team</a>production
    </div>
    </div>

  </Container>
)

const Container = styled.div`
  position: fixed;
  padding: 10px;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: #ffffff;
`
