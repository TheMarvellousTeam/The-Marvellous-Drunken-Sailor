import { SHIP_SPEC } from '~/util/const'

export const getPossibleMove_ = (state, shipId) => {
  // TODO add islands
  // TODO add enemy ships
  const bloked = [...state.ships.map(s => s.position)]
  const start = state.ships.filter(s => s.id == shipId)[0].position
  const maxDepth = state.paAvailable[shipId]

  const moves = [
    { vx: 1, vy: 0 },
    { vx: -1, vy: 0 },
    { vx: 0, vy: -1 },
    { vx: 0, vy: 1 },
  ]

  let from = {}
  let todo = [start]
  bloked.push(start)
  let ok = []
  let currentDepth = 0
  while (currentDepth < maxDepth) {
    let newTodo = []
    while (todo.length > 0) {
      let current = todo.shift()
      for (let k = 0; k < moves.length; k++) {
        const test = { x: current.x + moves[k].vx, y: current.y + moves[k].vy }
        if (!bloked.filter(p => p.x == test.x && p.y == test.y).length) {
          newTodo.push(test)
          ok.push(test)
          from[`${test.x},${test.y}`] = current
          bloked.push(test)
        }
      }
    }
    todo = newTodo
    currentDepth++
  }

  let possibilities = []
  for (let i = 0; i < ok.length; i++) {
    let path = [ok[i]]
    while (!(path[0].x == start.x && path[0].y == start.y)) {
      path.unshift(from[`${path[0].x},${path[0].y}`])
    }
    possibilities.push({
      target: ok[i],
      path,
    })
  }

  return possibilities
}

export const getPossibleMove = (state, shipId) => {
  const ship = state.ships.find(x => x.id === shipId)

  return [
    {
      target: { x: ship.position.x, y: ship.position.y + 2 },
      path: [
        { x: ship.position.x, y: ship.position.y },
        { x: ship.position.x, y: ship.position.y + 1 },
        { x: ship.position.x, y: ship.position.y + 2 },
      ],
    },
    {
      target: { x: ship.position.x, y: ship.position.y + 3 },
      path: [
        { x: ship.position.x, y: ship.position.y },
        { x: ship.position.x, y: ship.position.y + 1 },
        { x: ship.position.x, y: ship.position.y + 2 },
        { x: ship.position.x, y: ship.position.y + 3 },
      ],
    },
    {
      target: { x: ship.position.x, y: ship.position.y + 1 },
      path: [
        { x: ship.position.x, y: ship.position.y },
        { x: ship.position.x, y: ship.position.y + 1 },
      ],
    },
  ]
}

export const canFire = (state, shipId) => {
  const ship = state.ships.find(x => x.id === shipId)

  return ship.pa > 0
}

export const canMove = (state, shipId) => {
  const ship = state.ships.find(x => x.id === shipId)

  return ship.pm > 0
}

export const getPossibleFireTarget = (state, shipId) =>
  getPossibleMove(state, shipId).map(p => p.target)
