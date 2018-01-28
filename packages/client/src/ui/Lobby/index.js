import { h } from 'preact'
import styled from 'preact-emotion'

const randomRoomName = () =>
  Math.random()
    .toString(16)
    .slice(2, 6)

export const Lobby = ({ roomId, started, connecting }) => (
  <Container>
    {connecting && <span>{`connecting to ${roomId}`}</span>}

    {!connecting &&
      roomId && <span>{`waiting for another player in ${roomId}`}</span>}

    {!roomId && <a href={`?roomId=${randomRoomName()}`}>create room</a>}
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
