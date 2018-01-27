import { h } from 'preact'
import styled from 'preact-emotion'

export const Lobby = ({ gameState, ...props }) => (
  <Container>
    <Button onClick={() => props.onCreateRoom("toto")} >Create</Button>
    { Object.keys(gameState.lobby).map(k => <Button onClick={() => props.onJoinRoom({k})}>Join {gameState.lobby[k][0]}</Button>) }
  </Container>
)

const Container = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: #ffffff;
`
const Button = styled.button`
  padding: 10px;
`
