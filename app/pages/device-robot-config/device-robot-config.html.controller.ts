import * as echarts from 'echarts'
import '../../../assets/styles/table-sticky.less'
import { EventEmitter } from '../../common/event-emitter'
import { MeshNodeType } from '../../data-core/enums/robot/mesh-node-type.model'
import { MeshEdge } from '../../data-core/models/robot/mesh-edge.model'
import { MeshNode } from '../../data-core/models/robot/mesh-node.model'
import { DeviceRebotConfigHtmlTableController } from './controller/device-robot-config-html-table.controller'
import { itemStyle, option } from './controller/device-robot-config.option'
import { DeviceRobotConfigEvent } from './device-robot-config.event'
import './device-robot-config.less'
import {
  DeviceRobotConfigModel,
  Position,
  Size,
} from './device-robot-config.model'

export class DeviceRobotConfigHtmlController {
  constructor() {
    this.regist()
    this.init()

    this.echart = echarts.init(this.element.canvas)
  }

  element = {
    canvas: document.getElementById('canvas') as HTMLCanvasElement,

    control: {
      top: document.getElementById('btn_top') as HTMLButtonElement,
      down: document.getElementById('btn_down') as HTMLButtonElement,
      left: document.getElementById('btn_left') as HTMLButtonElement,
      right: document.getElementById('btn_right') as HTMLButtonElement,
      rotate: document.getElementById('btn_rotate') as HTMLButtonElement,
      node: document.getElementById('btn_node') as HTMLButtonElement,
      store: document.getElementById('btn_store') as HTMLButtonElement,
      drop: document.getElementById('btn_drop') as HTMLButtonElement,
      start: document.getElementById('btn_start') as HTMLButtonElement,
      stop: document.getElementById('btn_stop') as HTMLButtonElement,
      clear: document.getElementById('btn_clear') as HTMLButtonElement,
    },
    test: document.getElementById('test') as HTMLImageElement,
    table: new DeviceRebotConfigHtmlTableController(),
  }

  size: Size = {
    width: 0,
    height: 0,
  }

  echart: echarts.ECharts
  option: any = Object.assign({}, option)
  event: EventEmitter<DeviceRobotConfigEvent> = new EventEmitter()

  regist() {
    this.element.control.top.addEventListener('click', () => {
      this.event.emit('top')
    })
    this.element.control.down.addEventListener('click', () => {
      this.event.emit('down')
    })
    this.element.control.left.addEventListener('click', () => {
      this.event.emit('left')
    })
    this.element.control.right.addEventListener('click', () => {
      this.event.emit('right')
    })
    this.element.control.rotate.addEventListener('click', () => {})
    this.element.control.node.addEventListener('click', () => {})
    this.element.control.drop.addEventListener('click', () => {})
    this.element.control.store.addEventListener('click', () => {})
    this.element.control.start.addEventListener('click', () => {
      this.event.emit('start')
    })
    this.element.control.stop.addEventListener('click', () => {
      this.event.emit('stop')
    })
    this.element.control.clear.addEventListener('click', () => {
      this.event.emit('clear')
    })
  }

  init() {
    this.initCanvas()
  }

  clear() {
    this.option.series[0].data = []
    this.option.series[0].links = []
  }

  getMagneticPin(node: MeshNode) {
    let port = {
      x: node.Position.X,
      y: node.Position.Y,
      name: node.Id,
    }
    port = Object.assign(port, itemStyle.MagneticPin)
    return port
  }
  getChargingPort(node: MeshNode) {
    let port = {
      x: node.Position.X,
      y: node.Position.Y,
      name: node.Name ? node.Name : '充电口',
    }
    port = Object.assign(port, itemStyle.ChargingPort)
    return port
  }
  getStorePort(node: MeshNode) {
    let port = {
      x: node.Position.X,
      y: node.Position.Y,
      name: node.Id,
    }
    port = Object.assign(port, itemStyle.StorePort)
    return port
  }
  getDropPort(node: MeshNode) {
    let port = {
      x: node.Position.X,
      y: node.Position.Y,
      name: node.Id,
    }
    port = Object.assign(port, itemStyle.DropPort)
    return port
  }
  getLink(edge: MeshEdge) {
    let link = {
      source: edge.Start.Id ?? 0,
      target: edge.End.Id,
    }
    return link
  }
  getRobot(position: Position) {
    let robot = {
      x: position.x,
      y: position.y,
      name: '机器人',
      label: {
        show: false,
      },
      symbol:
        'image://data:image/gif;base64,R0lGODlhEAAQAMQAAORHHOVSKudfOulrSOp3WOyDZu6QdvCchPGolfO0o/XBs/fNwfjZ0frl3/zy7////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAkAABAALAAAAAAQABAAAAVVICSOZGlCQAosJ6mu7fiyZeKqNKToQGDsM8hBADgUXoGAiqhSvp5QAnQKGIgUhwFUYLCVDFCrKUE1lBavAViFIDlTImbKC5Gm2hB0SlBCBMQiB0UjIQA7',
      symbolSize: 20,
    }
    return robot
  }

  private appendNode(data: any) {
    let _data = this.convert(data)
    this.option.series[0].data.push(_data)
  }
  convert(data: Position) {
    data.y = this.size.height - data.y
    return data
  }

  private appendLink(data: any) {
    this.option.series[0].links.push(data)
  }

  load(data: DeviceRobotConfigModel) {
    this.clear()

    for (let i = 0; i < data.nodes.length; i++) {
      let node = data.nodes[i]
      let port: any = {}
      switch (node.NodeType) {
        case MeshNodeType.ChargingPort:
          port = this.getChargingPort(node)
          break
        case MeshNodeType.MagneticPin:
          port = this.getMagneticPin(node)
          break
        case MeshNodeType.DropPort:
          port = this.getDropPort(node)
          break
        case MeshNodeType.StorePort:
          port = this.getStorePort(node)
          break

        default:
          break
      }

      this.appendNode(port)
    }

    for (let i = 0; i < data.edges.length; i++) {
      let link = this.getLink(data.edges[i])
      this.appendLink(link)
    }

    let robot = this.getRobot({
      x: data.location.Position.X,
      y: data.location.Position.Y,
    })
    this.appendNode(robot)
    this.echart.setOption(this.option)
  }
  initCanvas() {
    this.element.canvas.width = this.element.canvas.parentElement!.clientWidth
    this.element.canvas.height = this.element.canvas.parentElement!.clientHeight
    this.size = {
      width: this.element.canvas.width,
      height: this.element.canvas.height,
    }
    // this.ctx.translate(0, this.size.height)
    // this.ctx.scale(1, -1)
  }

  draw() {}
}
