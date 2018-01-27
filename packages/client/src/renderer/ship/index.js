export * from './init'

export const applyAction = (scene, gameState, action) => null

export const onFrame = (scene, gameState, t) => {
  const shipsContainer = scene.getObjectByName('ships')

  for (let i = shipsContainer.children.length; i--; ) {
    const { roll_theta, children, name } = shipsContainer.children[i]

    const [o] = children

    const ship = gameState.ships.find(e => e.id == name)
    if ( ship.orientation.y == 0 ) {
    	o.rotation.y = Math.cos(t * 0.003 + roll_theta) * 0.26
    	o.rotation.x = 0
    } else if ( ship.orientation.x == 0 ) {
    	o.rotation.x = Math.cos(t * 0.003 + roll_theta) * 0.26
    	o.rotation.y = 0
    }
  }
}
