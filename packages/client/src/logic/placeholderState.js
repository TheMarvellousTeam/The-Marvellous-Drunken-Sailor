export const gameState = {
  myTurn: false,

  lobby: [],

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

  actions: [
    {
      id: 1,
      type: 'moveShip',
      shipId: 12,
      path: [
        { x: -2, y: 0 },
        { x: -2, y: 1 },
        { x: -2, y: 2 },
        { x: -2, y: 3 },
        { x: -1, y: 3 },
        { x: 0, y: 3 },
        { x: 1, y: 3 },
        { x: 2, y: 3 },
      ],
    },
    {
      id: 2,
      type: 'moveShip',
      shipId: 13,
      path: [
        { x: 0, y: 2 },
        { x: 0, y: 3 },
        { x: 0, y: 4 },
        { x: 1, y: 4 },
        { x: 2, y: 4 },
      ],
    },
    {
      id: 3,
      type: 'moveShip',
      shipId: 10,
      path: [
        { x: 0, y: -2 },
        { x: 0, y: -1 },
        { x: 0, y: 0 },
        { x: 0, y: 1 },
        { x: 1, y: 1 },
        { x: 2, y: 1 },
      ],
    },
    {
      id: 4,
      type: 'fireShip',
      shipId: 13,
      target: { x: 5, y: 2 },
    },
  ],

  ships: [
    {
      id: 12,
      position: { x: -2, y: 0 },
      orientation: { x: -1, y: 0 },
      health: 12,
      blueprint: 'dreadnougth',
    },
    {
      id: 13,
      position: { x: 0, y: 2 },
      orientation: { x: 0, y: 1 },
      health: 12,
      blueprint: 'dreadnougth',
    },
    {
      id: 10,
      position: { x: 0, y: -2 },
      orientation: { x: 0, y: -1 },
      health: 12,
      blueprint: 'dreadnougth',
    },
    {
      id: 14,
      position: { x: 2, y: 0 },
      orientation: { x: 1, y: 0 },
      health: 12,
      blueprint: 'dreadnougth',
    },
  ],
}
