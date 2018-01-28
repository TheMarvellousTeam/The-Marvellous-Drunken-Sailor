const WORLD_HEIGHT = 25 // must be multiple of 5
const WORLD_WIDTH = 11
const N_SHIPS = 5

const createFleet = (shipArray, player_id) => {
	let shipId = 0
	let yorient = 1
	let ybase = 0
	if (player_id == 1) {
		shipId = N_SHIPS
		yorient = -1
		ybase = WORLD_HEIGHT
	}
	let xbase = (WORLD_WIDTH - N_SHIPS) / 2

	const initFunc = [createScout, createHeavy, createScout, createDestroyer, createScout]
	initFunc.forEach( func => {
		let ship = func( xbase, ybase, yorient)
		ship.id = shipId
		shipArray.push(ship)
		shipId++
		xbase++
	})
}

const createShip = (x, y, yorient) => {
	return {
		position: {x: x, y: y},
		orientation: {x: 0, y: yorient},
	}
}

const createScout = (x, y, yorient) => {
	let ship = createShip(x, y, yorient)
	ship.blueprint = 'scout'
	ship.pv = 2
	return ship
}

const createHeavy = (x, y ,yorient) => {
	let ship = createShip(x, y, yorient)
	ship.blueprint = 'heavy'
	ship.pv = 5
	return ship
}

const createDestroyer = (x, y, yorient) => {
	let ship = createShip(x, y, yorient)
	ship.blueprint = 'destroyer'
	ship.pv = 2
	return ship
}

export const createWorld = () => {
	let world = {
		currentPlayer: 2,
		ships: [[], []],
	}
	createFleet(world.ships[0], 0)
	createFleet(world.ships[1], 1)
	return world
}