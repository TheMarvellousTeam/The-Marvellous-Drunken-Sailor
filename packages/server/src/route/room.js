import World from '../world/index.js'

export const create = ctx => {
	ctx.storage.rooms.push([ctx.request.body.uid])
	ctx.storage.worlds.push(new World)
	ctx.body = "ok"
}

export const join = ctx => {
	const uid = ctx.request.body.uid
	const room_id = ctx.params.id
	if (room_id < 0 || room_id >= ctx.storage.rooms.length) {
		ctx.body = { "error": "wrong room id madafaka!" }
		return
	}
	if (ctx.storage.rooms[room_id].length == 2) {
		ctx.body = {"error": "already full madafaka!"}
		return
	}

	ctx.storage.rooms[room_id].push(ctx.request.body.uid)
	ctx.storage.worlds[room_id].init()
	ctx.body = "ok"
}