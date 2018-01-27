export const gameState = {
  myTurn: false,

  blueprint: {
    dreadnougth: {
      param: {
        sigth_range: 10,
        // [...]
      },
    },
  },

  selectedShip: 12,

  selectedTool: 'moveShip',

  // whatever, there is no obstacles
  world: [],

  ships: [
    {
      id: 12,
      position: { x: 0, y: 0 },
      orientation: { x: 1, y: 0 },
      health: 12,
      blueprint: 'dreadnougth',
    },
    {
      id: 13,
      position: { x: 3, y: 2 },
      orientation: { x: -1, y: 0 },
      health: 12,
      blueprint: 'dreadnougth',
    },
    {
      id: 14,
      position: { x: -3, y: -4 },
      orientation: { x: 0, y: 1 },
      health: 12,
      blueprint: 'dreadnougth',
    },
  ],
}
