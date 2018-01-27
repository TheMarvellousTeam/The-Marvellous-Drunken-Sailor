export * from './init'

export const applyAction = (scene, gameState, action) => null

export const onFrame = (scene, _, t) => {
  const shipsContainer = scene.getObjectByName('ships')

  for (let i = shipsContainer.children.length; i--; ) {
    const { roll_theta, children } = shipsContainer.children[i]

    const [o] = children

    o.rotation.y = Math.cos(t * 0.003 + roll_theta) * 0.26
  }
}
