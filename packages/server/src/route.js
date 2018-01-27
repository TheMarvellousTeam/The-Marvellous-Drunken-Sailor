import * as room_manager from './room'
import koaBody from 'koa-bodyparser'

export const initRoutes = app => {
	app.get('/health', ctx => (ctx.body = 'ok'))

	app.get('/list', ctx => ( ctx.body = ctx.storage.rooms ))
	app.post('/create', koaBody(), ctx => ( room_manager.create(ctx) ))
	app.post('/:room_id/join', koaBody(), ctx => ( room_manager.join(ctx) ))
	app.get('/:room_id/pull', ctx => { 
		const roomId = ctx.params.room_id
		ctx.body = {
			actions: ctx.storage.actions[roomId],
			world: ctx.storage.worlds[roomId]
		} 
	})
	app.post('/:room_id/action', koaBody(), ctx => {
		ctx.storage.actions[ctx.params.room_id].push(ctx.request.body.action)
		// resolve action
	})
	app.get('/:room_id/end_turn', ctx => 
		( ctx.storage.worlds[ctx.params.room_id].current_player = !ctx.storage.worlds[ctx.params.room_id].current_player ))

}