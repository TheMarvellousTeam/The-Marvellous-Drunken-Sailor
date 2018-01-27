import * as world_manager from './world'

export const create = ctx => {
	const world = world_manager.initWorld()

	ctx.storage.rooms[ctx.storage.rooms.next_id] = [ctx.request.body.uid]
	ctx.storage.worlds[ctx.storage.rooms.next_id] = world
	ctx.storage.actions[ctx.storage.rooms.next_id] = {
		next_id: 0,
		data: {}
	}
	ctx.body = {
		room_id: ctx.storage.next_id,
		player_team: 0,
		world: world,
	}
	ctx.storage.rooms.next_id++
}

export const join = ctx => {
	const room_id = ctx.params.room_id
	ctx.storage.rooms[room_id].push(ctx.request.body.uid)
	ctx.body = {
		room_id: room_id,
		player_team: 1,
		world: ctx.storage.worlds[room_id]
	}
}