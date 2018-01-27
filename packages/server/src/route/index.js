import * as room_manager from './room'
import koaBody from 'koa-bodyparser'

export const initRoutes = app => {
	app.get('/health', ctx => (ctx.body = 'ok'))

	app.get('/list', ctx => ( ctx.body = ctx.storage.rooms))
	app.post('/create', koaBody(), ctx => ( room_manager.create(ctx) ))
	app.post('/join/:id', koaBody(), ctx => ( room_manager.join(ctx) ))
}
