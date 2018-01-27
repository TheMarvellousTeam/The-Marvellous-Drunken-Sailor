import * as THREE from 'three'
import '../../../vendor/MTLLoader'
import '../../../vendor/OBJLoader'
import { toAngle } from '~/util/orientation'

const applyTransform = (o, m) => {
  if (o.geometry) o.geometry.applyMatrix(m)

  for (let i = o.children.length; i--; ) applyTransform(o.children[i], m)
}

const loadModels = () => {
  const models = {}

  return Promise.all(
    ['ship_heavy', 'ship_light', 'ship_destroyer'].map(name =>
      new Promise((resolve, reject) => {
        const mtlLoader = new THREE.MTLLoader()
        mtlLoader.setPath('obj/')

        mtlLoader.load(
          `${name}.mtl`,
          materials => {
            materials.preload()

            const objLoader = new THREE.OBJLoader()
            objLoader.setMaterials(materials)
            objLoader.setPath('obj/')
            objLoader.load(`${name}.obj`, resolve, null, reject)
          },
          null,
          reject
        )
      }).then(obj => {
        const forTransform = new THREE.Object3D()

        forTransform.scale.set(0.014, 0.014, 0.014)
        forTransform.rotation.x = Math.PI / 2
        forTransform.updateMatrix()

        applyTransform(obj, forTransform.matrix)

        models[name] = obj
      })
    )
  ).then(() => models)
}

let models = {}

const onLoad = []

loadModels().then(o => {
  models = o
  onLoad.forEach(x => x())
  onLoad.length = 0
})

export const init = scene => {
  const container = new THREE.Object3D()

  scene.add(container)
  container.name = 'ships'
  container.position.z = 0.1
}

const createShip = ({ id, position, orientation, blueprint }) => {
  const container = new THREE.Object3D()
  container.name = id
  container.position.set(position.x, position.y, 0.25)
  container.rotation.z = toAngle(orientation)
  container.roll_theta = Math.random() * Math.PI

  const mesh = models['ship_light']

  if (!mesh) {
    const placeholder = new THREE.Object3D()
    placeholder.name = placeholder

    container.add(placeholder)

    onLoad.push(() => {
      const mesh = models['ship_light'].clone()

      container.remove(container.children[0])
      container.add(mesh)
    })
  } else container.add(mesh)

  // var geometry = new THREE.BoxGeometry(0.5, 0.9, 0.5)
  // var material = new THREE.MeshPhongMaterial({ color: 0xf8f8f8 })
  // var cube = new THREE.Mesh(geometry, material)

  return container
}

export const onStateChage = (scene, gameState) => {
  const shipsContainer = scene.getObjectByName('ships')

  // create
  gameState.ships.forEach(ship => {
    if (shipsContainer.getObjectByName(ship.id)) return

    shipsContainer.add(createShip(ship))
  })
}
