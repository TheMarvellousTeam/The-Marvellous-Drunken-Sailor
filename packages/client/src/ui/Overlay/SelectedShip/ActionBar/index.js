import { h } from 'preact'
import styled from 'preact-emotion'

export const ActionBar = ({ onSelectTool }) => (
  <Container>
    <Button onClick={() => onSelectTool('moveShip')}>move ship</Button>
    <Button onClick={() => onSelectTool('fireShip')}>fire ship</Button>
  </Container>
)

const Button = styled.button`
  padding: 10px;
`

const Container = styled.div`
  background-color: #aaa;
  padding: 10px;
`
