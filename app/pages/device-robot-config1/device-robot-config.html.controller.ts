import { RobotDeviceController } from './controller/device-robot-config-device.controller'
import { RobotMeshEdgeController } from './controller/device-robot-config-mesh-edge.controller'
import { RobotMeshNodeController } from './controller/device-robot-config-mesh-node.controller'
import { RobotChargingPortController } from './controller/device-robot-config-port-charging.controller'
import { RobotDropPortController } from './controller/device-robot-config-port-drop.controller'
import { RobotStorePortController } from './controller/device-robot-config-port-store.controller'
import { DeviceRobotConfigConverter } from './controller/device-robot-config.converter'
import './device-robot-config.less'
import { DeviceRobotConfigTool, Size } from './device-robot-config.model'

export class DeviceRobotConfigHtmlController {
  constructor() {
    this.regist()
    this.init()
  }

  element = {
    canvas: document.getElementById('canvas') as HTMLCanvasElement,

    control: {
      step: document.getElementById('btn_step') as HTMLButtonElement,
      stop: document.getElementById('btn_stop') as HTMLButtonElement,
      left: document.getElementById('btn_left') as HTMLButtonElement,
      right: document.getElementById('btn_right') as HTMLButtonElement,
      rotate: document.getElementById('btn_rotate') as HTMLButtonElement,
      node: document.getElementById('btn_node') as HTMLButtonElement,
      store: document.getElementById('btn_store') as HTMLButtonElement,
      drop: document.getElementById('btn_drop') as HTMLButtonElement,
      start: document.getElementById('btn_start') as HTMLButtonElement,
    },
    test: document.getElementById('test') as HTMLImageElement,
  }
  ctx = this.element.canvas.getContext('2d') as CanvasRenderingContext2D

  cursor = document.getElementById('cursor') as HTMLImageElement

  controller = {
    device: new RobotDeviceController(this.cursor),
    edge: new RobotMeshEdgeController(),
    node: new RobotMeshNodeController(),
    port: {
      drop: new RobotDropPortController(),
      store: new RobotStorePortController(),
      charging: new RobotChargingPortController(),
    },
  }

  size: Size = {
    width: 0,
    height: 0,
  }
  regist() {
    this.element.control.step.addEventListener('click', () => {
      let begin = {
        x: this.controller.device.position.x,
        y: this.controller.device.position.y,
      }
      let end = this.controller.device.run()
      this.controller.edge.add({
        begin: begin,
        end: {
          x: end.x,
          y: end.y,
        },
      })
      this.draw()
    })
    this.element.control.stop.addEventListener('click', () => {})
    this.element.control.left.addEventListener('click', () => {
      this.controller.device.degree += -90
      this.draw()
    })
    this.element.control.right.addEventListener('click', () => {
      this.controller.device.degree += 90
      this.draw()
    })
    this.element.control.rotate.addEventListener('click', () => {
      this.ctx.translate(this.size.width * 0.5, this.size.height * 0.5)
      this.ctx.rotate((90 * Math.PI) / 180)
      this.ctx.translate(-this.size.width * 0.5, -this.size.height * 0.5)
      this.draw()
    })
    this.element.control.node.addEventListener('click', () => {
      let point = this.controller.device.position
      this.controller.node.add({
        x: point.x,
        y: point.y,
      })
      this.draw()
    })
    this.element.control.drop.addEventListener('click', () => {
      let point = this.controller.device.position
      this.controller.port.drop.add({
        x: point.x,
        y: point.y,
      })
      this.draw()
    })
    this.element.control.store.addEventListener('click', () => {
      let point = this.controller.device.position
      this.controller.port.store.add({
        x: point.x,
        y: point.y,
      })
      this.draw()
    })
    this.element.control.start.addEventListener('click', () => {
      let begin = DeviceRobotConfigTool.copy(this.controller.device.position)
      let current = DeviceRobotConfigTool.copy(this.controller.device.run(40))
      this.controller.node.add(current)
      this.controller.edge.add({
        begin: begin,
        end: current,
      })
      this.draw()
    })
  }

  init() {
    this.initCanvas()
    this.initDevice()
    this.initEdge()
    this.initNode()
    this.initDropPort()
    this.initStorePort()
    this.initChargingPort()

    this.draw()
  }
  initCanvas() {
    this.element.canvas.width = this.element.canvas.parentElement!.clientWidth
    this.element.canvas.height = this.element.canvas.parentElement!.clientHeight
    this.size = {
      width: this.element.canvas.width,
      height: this.element.canvas.height,
    }
    DeviceRobotConfigConverter.size = this.size

    // this.ctx.translate(0, this.size.height)
    // this.ctx.scale(1, -1)
  }
  initDevice() {
    this.controller.device.position = {
      x: this.size.width * 0.5,
      y: this.size.height * 0.5,
    }
  }
  initNode() {
    this.controller.node.size = this.size
  }
  initEdge() {
    this.controller.edge.size = this.size
  }
  initDropPort() {
    this.controller.port.drop.size = this.size
  }
  initStorePort() {
    this.controller.port.store.size = this.size
  }
  initChargingPort() {
    this.controller.port.charging.size = this.size
    this.controller.port.charging.add({
      x: this.size.width * 0.5,
      y: this.size.height * 0.5,
    })
  }

  draw() {
    this.ctx.clearRect(
      0,
      0,
      this.element.canvas.width,
      this.element.canvas.height
    )
    this.ctx.fillStyle = '#f0f0f0'
    this.ctx.fillRect(0, 0, this.size.width, this.size.height)

    this.controller.device.draw(this.ctx)
    this.controller.edge.draw(this.ctx)
    this.controller.node.draw(this.ctx)
    this.controller.port.drop.draw(this.ctx)
    this.controller.port.store.draw(this.ctx)
    this.controller.port.charging.draw(this.ctx)
  }
}
