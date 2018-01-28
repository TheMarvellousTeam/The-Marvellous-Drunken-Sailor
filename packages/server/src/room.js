import * as world_manager from './world'

export const create = ctx => {
	const world = world_manager.createWorld()

	ctx.storage.rooms[ctx.storage.nextRoomId] = [ctx.request.body.uid]
	ctx.storage.worlds[ctx.storage.nextRoomId] = world
	ctx.storage.actions[ctx.storage.nextRoomId] = []
	ctx.body = {
		room_id: ctx.storage.nextRoomId,
		player_team: 0,
		current_player: ctx.storage.worlds[ctx.storage.nextRoomId].currentPlayer
		world: world,
	}
	ctx.storage.nextRoomId++
}

export const join = ctx => {
	const room_id = ctx.params.room_id
	ctx.storage.rooms[room_id].push(ctx.request.body.uid)
	ctx.body = {
		room_id: room_id,
		player_team: 1,
		current_player: ctx.storage.worlds[ctx.storage.nextRoomId].currentPlayer
		world: ctx.storage.worlds[room_id]
	}
}