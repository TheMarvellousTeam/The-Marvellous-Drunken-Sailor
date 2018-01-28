import { SHIP_SPEC } from '~/util/const'

  const moves = [
    { vx: 1, vy: 0 },
    { vx: -1, vy: 0 },
    { vx: 0, vy: -1 },
    { vx: 0, vy: 1 },
  ]
  const nextMoves = [
    [{ vx: 1, vy: 0 },{ vx: 0, vy: -1 },{ vx: 0, vy: 1 }],
    [{ vx: -1, vy: 0 },{ vx: 0, vy: -1 },{ vx: 0, vy: 1 }],
    [{ vx: 1, vy: 0 },{ vx: -1, vy: 0 },{ vx: 0, vy: -1 }],
    [{ vx: 1, vy: 0 },{ vx: -1, vy: 0 },{ vx: 0, vy: 1 }]
  ]

export const getPossibleMove = (state, shipId) => {
  // TODO add islands
  const bloked = [...state.ships.map(s => s.position)]
  const ship = state.ships.find(x => x.id === shipId)
  const start = ship.position
  const maxDepth = ship.pa

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
        if (!bloked.find(p => p.x == test.x && p.y == test.y)) {
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

export const canFire = (state, shipId) => {
  const ship = state.ships.find(x => x.id === shipId)
  return ship.pa >= SHIP_SPEC[ship.blueprint].fire_cost
}

export const canMove = (state, shipId) => {
  const ship = state.ships.find(x => x.id === shipId)
  return ship.pa > 0
}

export const getPossibleFireTarget = (state, shipId) => {
  //TODO add island
  const ship = state.ships.find(x => x.id === shipId)

  const spec = SHIP_SPEC[ship.blueprint]

  let ok = []
  if ( ship.blueprint == 'destroyer' ) {
    for ( let k = 0; k < moves.length; k++) {
        for ( let p = 1; p <= spec.max_range; p++) {
          const test = {x: ship.position.x + moves[k].vx * p, y: ship.position.y + moves[k].vy * p}
          const testShip = state.ships.find(s => s.position.x == test.x && s.position.y == test.y)
          if ( testShip ){
            if ( testShip.playerId != state.me.id )
              ok.push(test)
            break
          }
          if ( p >= spec.min_range)
            ok.push(test)
        }
    }
  } else if ( ship.blueprint == 'heavy' ) {
    for ( let nx = -spec.max_range; nx <= spec.max_range; nx++) {
      for( let ny = -spec.max_range; ny <= spec.max_range; ny++) {
        const test = {x: ship.position.x + nx, y: ship.position.y + ny}
        const dist = Math.abs(test.x - ship.position.x) + Math.abs(test.y - ship.position.y)
        const testShip = state.ships.find(s => s.position.x == test.x && s.position.y == test.y)
        if ( (!testShip || testShip.playerId != state.me.id) && dist >= spec.min_range && dist <= spec.max_range )
            ok.push(test)
      }
    }
  } else if ( ship.blueprint == 'scout' ) {
    for ( let i = 0; i < moves.length; i++ ) {
      for ( let nx = -spec.max_range; nx <= spec.max_range; nx++) {
        for( let ny = -spec.max_range; ny <= spec.max_range; ny++) {
          const test = {x: ship.position.x + nx, y: ship.position.y + ny}
          const dist = Math.abs(test.x - ship.position.x) + Math.abs(test.y - ship.position.y)
          const testShip = state.ships.find(s => s.position.x == test.x && s.position.y == test.y)
          if ( (!testShip || testShip.playerId != state.me.id ) && dist >= spec.min_range && dist <= spec.max_range ) {
            ok.push(test)
          }
        }
      }  
    }
  }
  return ok
}
