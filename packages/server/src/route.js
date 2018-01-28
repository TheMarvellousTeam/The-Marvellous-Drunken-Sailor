import koaBody from 'koa-bodyparser'
import { createWorld, prepareShips } from './world'

export const initRoutes = app => {
  app.get('/health', ctx => (ctx.body = 'ok'))

  // get room info
  app.get('/room/:roomId', ctx => {
    ctx.body = ctx.storage.room[ctx.params.roomId]
  })

  // join / create room
  app.post('/room/:roomId/player', koaBody(), ctx => {
    const room = (ctx.storage.room[ctx.params.roomId] = ctx.storage.room[
      ctx.params.roomId
    ] || {
      players: [],
      ...createWorld(),
      started: false,
      actions: [],
      state0_ships: [],
      state0_currentPlayerId: null,
    })

    // can not join a started room
    if (room.started) return ctx.throw(403, 'game started already')

    // add player
    room.players.push(ctx.request.body.player)

    // if there is two players, start the game
    if (room.players.length >= 2) {
      room.started = true
      room.state0_ships = prepareShips(room.players, room.map)
      room.state0_currentPlayerId =
        room.players[Math.floor(Math.random() * room.players.length)].id
    }

    ctx.body = 'ok'
  })

  app.post('/room/:roomId/action', koaBody(), ctx => {
    const room = ctx.storage.room[ctx.params.roomId]

    if (!room) return ctx.throw(404, 'room not found')

    room.actions.push(...ctx.request.body.actions)

    ctx.body = 'ok'
  })

}
