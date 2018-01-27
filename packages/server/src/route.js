import * as room_manager from './room'
import koaBody from 'koa-bodyparser'

export const initRoutes = app => {
	app.get('/health', ctx => (ctx.body = 'ok'))

	app.get('/list', ctx => ( ctx.body = ctx.storage.rooms ))
	app.post('/create', koaBody(), ctx => ( room_manager.create(ctx) ))
	app.post('/:room_id/join', koaBody(), ctx => ( room_manager.join(ctx) ))
	app.get('/:room_id/world', ctx => ( ctx.body = ctx.storage.worlds[ctx.params.room_id] ))
	app.get('/:room_id/actions', ctx => ( ctx.body = ctx.storage.actions[ctx.params.room_id] ))
	app.post('/:room_id/actions', koaBody(), ctx =>
		( ctx.storage.actions[ctx.params.room_id].push(ctx.request.body.action) ))
	app.get('/:room_id/end_turn', ctx => 
		( ctx.storage.worlds[ctx.params.room_id].current_player = !ctx.storage.worlds[ctx.params.room_id].current_player ))
}
