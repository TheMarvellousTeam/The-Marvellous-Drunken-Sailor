import * as THREE from 'three'
import '../../../vendor/MTLLoader'
import '../../../vendor/OBJLoader'

const applyTransform = (o, m) => {
  if (o.geometry) o.geometry.applyMatrix(m)

  for (let i = o.children.length; i--; ) applyTransform(o.children[i], m)
}

export const placeholder = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: 0x00ff00 })
)

placeholder.name = 'placeholder'

const loadModels = models => {
  return Promise.all(
    [
      'ship_heavy',
      'ship_light',
      'ship_destroyer',
      'scenery_water',
      'effect_muzzle',
      'effect_smoke',
      'effect_splash',
      'effect_explosion',
    ].map(name =>
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
  )
}

export const models = {}

const onLoad = []

export const onModelLoaded = fn => onLoad.push(fn)

loadModels(models).then(() => {
  onLoad.forEach(x => x())
  onLoad.length = 0
})
