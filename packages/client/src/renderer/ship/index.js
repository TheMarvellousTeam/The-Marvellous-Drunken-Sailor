export const applyAction = (scene, gameState, action) => null

export const init = scene => {
  const container = new THREE.Object3D()

  scene.add(container)
  container.name = 'ships'
  container.position.z = 0.1
}

const getRotation = ({ x, y }) =>
  (x == 0 && y > 0 && Math.PI * 0.5) ||
  (x == 0 && y < 0 && Math.PI * 1.5) ||
  (x < 0 && y == 0 && Math.PI) ||
  (x > 0 && y == 0 && 0) ||
  0

export const onStateChage = (scene, gameState) => {
  const shipsContainer = scene.getObjectByName('ships')

  // create
  gameState.ships.forEach(ship => {
    if (shipsContainer.getObjectByName(ship.id)) return

    const object = new THREE.Object3D()
    object.name = ship.id
    object.position.set(ship.position.x, ship.position.y, 0.25)
    object.rotation.z = getRotation(ship.orientation)
    object.roll_theta = Math.random() * Math.PI

    var geometry = new THREE.BoxGeometry(0.5, 0.9, 0.5)
    var material = new THREE.MeshPhongMaterial({ color: 0xf8f8f8 })
    var cube = new THREE.Mesh(geometry, material)

    shipsContainer.add(object)
    object.add(cube)
  })
}

export const onFrame = (scene, _, t) => {
  const shipsContainer = scene.getObjectByName('ships')

  for (let i = shipsContainer.children.length; i--; ) {
    const { roll_theta, children } = shipsContainer.children[i]

    const [o] = children

    o.rotation.y = Math.sin(t * 0.001 + roll_theta) * 0.2
  }
}
