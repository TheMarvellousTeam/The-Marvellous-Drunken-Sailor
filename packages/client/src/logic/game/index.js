export const getPossibleMove = (state, shipId) => [
  { target: { x: 0, y: 1 }, path: [{ x: 0, y: 0 }, { x: 0, y: 1 }] },
]

export const getPossibleFireTarget = (state, shipId) => [
  { x: 0, y: 1 },
  { x: 0, y: 2 },
  { x: 0, y: 3 },
]
