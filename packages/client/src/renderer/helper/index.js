import * as THREE from 'three'

import { getPossibleMove, getPossibleFireTarget } from '~/logic/game'

const geo = new THREE.PlaneBufferGeometry(0.8, 0.8)
const matFire = new THREE.MeshBasicMaterial({
  transparent: true,
  color: 0xf41f2f,
  opacity: 0.6,
})
const matMove = new THREE.MeshBasicMaterial({
  transparent: true,
  color: 0x449624,
  opacity: 0.6,
})

export const init = scene => {
  const container = new THREE.Object3D()

  scene.add(container)
  container.name = 'helper'
  container.position.z = 0.05
}

let previousKey = null
export const onStateChanged = (scene, gameState) => {
  const shipId = gameState.selectedShip
  const tool = gameState.selectedTool

  const key = shipId + '' + tool

  if (key == previousKey) return

  const container = scene.getObjectByName('helper')

  while (container.children.length) container.remove(container.children[0])

  let toEnhance = []
  let mat = tool === 'moveShip' ? matMove : matFire 

  if (shipId && tool === 'moveShip')
    toEnhance = getPossibleMove(gameState, shipId).map(p => p.target)

  if (shipId && tool === 'fireShip')
    toEnhance = getPossibleFireTarget(gameState, shipId)

  toEnhance.forEach(({ x, y }) => {
    const mesh = new THREE.Mesh(geo, mat)

    mesh.position.x = x
    mesh.position.y = y

    container.add(mesh)
  })
}
