import { h, Component } from 'preact'
import styled from 'preact-emotion'
import { models, setColor } from '../../../../renderer/_models'
import { getPlayerColor } from '~/util/color'
import * as THREE from 'three'

const width = 120
const height = 120

const camera = new THREE.PerspectiveCamera(50, 1, 0.01, 3000)
camera.aspect = width / height
camera.updateProjectionMatrix()

const renderer = new THREE.WebGLRenderer({ alpha: true, antialiasing: !true })
renderer.setSize(width, height)

export class Portrait extends Component {
  componentWillUnmount() {
    cancelAnimationFrame(this._kill)
  }

  componentDidMount() {
    const scene = new THREE.Scene()

    let model

    if (this.props.ship.blueprint === 'destroyer')
      model = models['ship_destroyer']
    if (this.props.ship.blueprint === 'heavy') model = models['ship_heavy']
    if (this.props.ship.blueprint === 'scout') model = models['ship_light']

    if (!model) return

    const shipObject = setColor(
      model.clone(),
      getPlayerColor(this.props.ship.playerId)
    )

    scene.add(shipObject)

    const light = new THREE.PointLight(0xdddddd, 1, 0, 2)
    light.position.set(5, 5, 25)
    scene.add(light)

    this.base.children[0].appendChild(renderer.domElement)

    const loop = () => {
      const ship = scene.getObjectByName(this.props.ship.id)

      const theta = Date.now() * 0.001

      camera.position.set(Math.cos(theta) * 1.3, Math.sin(theta) * 1.3, 0.8)

      camera.lookAt(new THREE.Vector3(0, -0.2, 0))
      camera.up = new THREE.Vector3(0, 0, 1)
      camera.updateProjectionMatrix()

      renderer.render(scene, camera)

      this._kill = requestAnimationFrame(loop)
    }

    loop()
  }

  render() {
    return (
      <Circle>
        <Container />
        <Shadow />
      </Circle>
    )
  }
}

const Circle = styled.div`
  position: relative;
  background-color: #aaa;
  width: 100px;
  height: 100px;
  border-radius: 100px;
  box-shadow: -5px -1px 8px 3px rgba(132, 127, 144, 0.57) inset;
  border: solid 4px #fff;
`
const Container = styled.div`
  position: absolute;
  top: -5px;
  left: 0px;
  width: ${width}px;
  height: ${height}px;
  z-index: 2;
`
const Shadow = styled.div`
  position: absolute;
  top: 66px;
  left: 48px;
  width: 4px;
  height: 4px;
  border-radius: 10px;
  box-shadow: 0 0 16px 6px rgb(0, 0, 0);
  background-color:rgba(0,0,0,0.8);
  transform: scale(1,0.3);
}
`
