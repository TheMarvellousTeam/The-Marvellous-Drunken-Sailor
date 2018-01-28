export const createWorld = () => ({
  map: null,
})

export const prepareShips = (players, map) =>
  zip(
    players.map(({id}, playerIndex) => {
      const newShips = []
      newShips.push(createHeavy(id, playerIndex, 0))
      //newShips.push(createScout(id, playerIndex, 0))
      newShips.push(createScout(id, playerIndex, 1))
      newShips.push(createScout(id, playerIndex, 2))
      newShips.push(createScout(id, playerIndex, 3))
      newShips.push(createDestroyer(id, playerIndex, 4))
      return newShips
    })
  ).map((ship, i) => ({ ...ship, id: `ship-${i}` }))

export const createScout = (id, playerIndex, x) => ({
      playerId: id,
      position: { x: x, y: playerIndex * 10 },
      orientation: { x: 0, y: playerIndex ? -1 : 1 },
      blueprint: 'scout',
      health: 2,
      pa: 5, 
})

export const createHeavy = (id, playerIndex, x) => ({
      playerId: id,
      position: {x: x, y: playerIndex * 10 },
      orientation: {x:0, y: playerIndex ? -1 : 1},
      blueprint: 'heavy',
      health: 5,
      pa: 3,
})

export const createDestroyer = (id, playerIndex, x) => ({
      playerId: id,
      position: {x: x, y: playerIndex * 10 },
      orientation: {x:0, y: playerIndex ? -1 : 1},
      blueprint: 'destroyer',
      health: 2,
      pa: 3,
})

const zip = arr => [].concat(...arr)

/*
export const prepareShips = (players, map) =>
  zip(
    players.map(({ id }, playerIndex) =>
      Array.from({ length: 4 }).map((_, i) => ({
        playerId: id,
        position: { x: i, y: playerIndex * 10 },
        orientation: { x: 0, y: playerIndex ? -1 : 1 },
        blueprint: 'scout',
        health: 2,
        pa: 5,
      }))
    ),
    players.map(({ id }, playerIndex) => {
      playerId: id,
      position: {x: 2, y: playerIndex*10 + playerIndex ? 1 : -1 },
      orientation: {x:0, y: playerIndex ? -1 : 1},
      blueprint: 'heavy',
      health: 5,
      pa: 3,
    }),
    players.map(({id}, playerIndex) => {
      playerId: id,
      position: {x: 3, y: playerIndex*10 + playerIndex ? 1 : -1 },
      orientation: {x:0, y: playerIndex ? -1 : 1},
      blueprint: 'destroyer',
      health: 2,
      pa: 3,
    }),
  ).map((ship, i) => ({ ...ship, id: `ship-${i}` }))
*/