export const createWorld = () => ({
  map: null,
})

export const prepareShips = (players, map) =>
  zip(
    players.map(({id}, playerIndex) => {
      const newShips = []
      newShips.push(createHeavy(id, playerIndex, 0, playerIndex*10))
      newShips.push(createScout(id, playerIndex, 1, playerIndex*10))
      newShips.push(createScout(id, playerIndex, 2, playerIndex*10))
      newShips.push(createScout(id, playerIndex, 3, playerIndex*10))
      newShips.push(createHeavy(id, playerIndex, 4, playerIndex*10))
      newShips.push(createDestroyer(id, playerIndex, 2, playerIndex*10 + (playerIndex ? -1 : 1)))
      return newShips
    })
  ).map((ship, i) => ({ ...ship, id: `ship-${i}` }))

export const createScout = (id, playerIndex, x, y) => ({
      playerId: id,
      position: { x, y },
      orientation: { x: 0, y: playerIndex ? -1 : 1 },
      blueprint: 'scout',
      health: 2,
      pa: 5, 
})

export const createHeavy = (id, playerIndex, x, y) => ({
      playerId: id,
      position: {x, y},
      orientation: {x:0, y: playerIndex ? -1 : 1},
      blueprint: 'heavy',
      health: 5,
      pa: 3,
})

export const createDestroyer = (id, playerIndex, x, y) => ({
      playerId: id,
      position: {x, y},
      orientation: {x:0, y: playerIndex ? -1 : 1},
      blueprint: 'destroyer',
      health: 2,
      pa: 3,
})

const zip = arr => [].concat(...arr)