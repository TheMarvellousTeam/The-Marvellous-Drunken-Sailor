export const placeholderState = {
  myTurn: false,

  players: [
    { id: 1, name: 'nelson', color: 'red' },
    { id: 2, name: 'ackbar', color: 'blue' },
  ],

  lobby: [],

  paAvailable: {
    12: 3,
    13: 3,
    10: 3,
    14: 3,
  },

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
      ],
    },

    {
      id: 2,
      type: 'moveShip',
      shipId: 13,
      path: [{ x: 0, y: 2 }, { x: 0, y: 3 }],
    },
    {
      id: 4,
      type: 'fireShip',
      shipId: 10,
      target: { x: 5, y: 2 },
    },
    {
      id: 4.5,
      type: 'splash',
      target: { x: 0, y: 0 },
    },
    {
      id: 5,
      type: 'fireShip',
      shipId: 12,
      target: { x: 5, y: 2 },
    },
    {
      id: 5.5,
      type: 'splash',
      target: { x: 0, y: 0 },
    },
    {
      id: 6,
      type: 'fireShip',
      shipId: 13,
      target: { x: 5, y: 2 },
    },
    {
      id: 6.5,
      type: 'splash',
      target: { x: 0, y: 0 },
    },
    {
      id: 7,
      type: 'fireShip',
      shipId: 14,
      target: { x: 5, y: 2 },
    },
    {
      id: 7.5,
      type: 'splash',
      target: { x: 0, y: 0 },
    },
    {
      id: 8,
      type: 'shipSunk',
      shipId: 13,
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
      position: { x: 0, y: 0 },
      orientation: { x: 1, y: 0 },
      health: 12,
      blueprint: 'dreadnougth',
    },
  ],
}
