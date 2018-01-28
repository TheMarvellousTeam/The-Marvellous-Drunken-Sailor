export const createWord = () => ({
  map: null,
})

const zip = arr => [].concat(...arr)

export const prepareShips = (players, map) =>
  zip(
    players.map(({ id }, playerIndex) =>
      Array.from({ length: 4 }).map((_, i) => ({
        playerId: id,
        position: { x: i, y: playerIndex * 10 },
        orientation: { x: 0, y: playerIndex ? -1 : 1 },
        blueprint: 'scout',
        health: 10,
        pm: 0,
        pa: 0,
      }))
    )
  ).map((ship, i) => ({ ...ship, id: `ship-${i}` }))
