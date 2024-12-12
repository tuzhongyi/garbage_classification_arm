import * as echarts from 'echarts'
import { EventEmitter } from '../../../../common/event-emitter'
import { MeshNodeType } from '../../../../data-core/enums/robot/mesh-node-type.model'
import {
  DeviceRobotModel,
  Size,
} from '../../../device-robot/device-robot.model'
import { DeviceRobotPlayEChartEvent } from '../../device-robot-play.event'
import { DeviceRobotPlayEChartDisplay } from '../details/device-robot-play-chart-display.model'

import { option } from './device-robot-play-chart.option'
import { DeviceRobotCalibrationHtmlEChartConverter } from './device-robot-play-html-echart.converter'
export class DeviceRobotPlayHtmlEChartController {
  event: EventEmitter<DeviceRobotPlayEChartEvent> = new EventEmitter()
  constructor() {
    this.initCanvas()
    this.echart = echarts.init(this.canvas)
    this.regist()
  }

  private canvas = document.getElementById('canvas') as HTMLCanvasElement
  private images = {
    Dry: document.getElementById('img_Dry') as HTMLImageElement,
    Wet: document.getElementById('img_Wet') as HTMLImageElement,
    Recycle: document.getElementById('img_Recycle') as HTMLImageElement,
    Hazard: document.getElementById('img_Hazard') as HTMLImageElement,
  }
  private echart: echarts.ECharts
  private option: any = Object.assign({}, option)
  private size: Size = {
    width: 0,
    height: 0,
  }
  private converter = new DeviceRobotCalibrationHtmlEChartConverter()
  config?: DeviceRobotPlayEChartDisplay

  private initCanvas() {
    this.canvas.width = this.canvas.parentElement!.clientWidth
    this.canvas.height = this.canvas.parentElement!.clientHeight
    this.size = {
      width: this.canvas.width,
      height: this.canvas.height,
    }
  }

  private regist() {
    this.echart.on('click', 'series.graph', (e: any) => {
      if (e.dataType === 'node') {
        this.event.emit('nodeselect', e.data.data)
      }
      if (e.dataType === 'edge') {
        this.event.emit('edgeselect', e.data.data)
      }
    })
    this.echart.on('graphroam', (params: any) => {
      let option = this.echart.getOption() as any
      if (params.zoom != null && params.zoom != undefined) {
        option.series[1].zoom = option.series[0].zoom
        option.series[1].center = option.series[0].center
      } else {
        option.series[1].center = option.series[0].center
      }
      this.echart.setOption(option)
    })
  }

  private appendNode(data: any) {
    let _data = this.converter.Position(this.size, data) as any
    this.option.series[0].data.push(_data)
    this.option.series[1].data.push(_data)
  }

  label(display: boolean, text: string = '✔') {
    for (let i = 0; i < this.option.series[0].data.length; i++) {
      this.option.series[0].data[i].label = {
        show: display,
        formatter: this.option.series[0].data[i].id,
      }
      if (this.start.id && this.start.id == this.option.series[0].data[i].id) {
        this.option.series[0].data[i].label = {
          show: true,
          formatter: text,
        }
      }
      if (this.end.id && this.end.id == this.option.series[0].data[i].id) {
        this.option.series[0].data[i].label = {
          show: true,
          formatter: text,
        }
      }
      if (
        this.target.id &&
        this.target.id == this.option.series[0].data[i].id
      ) {
        this.option.series[0].data[i].label = {
          show: true,
          formatter: text,
        }
      }
    }
  }

  private appendItem(data: any) {
    let _data = this.converter.Position(this.size, data)
    this.option.series[1].data.push(_data)
  }

  private appendMark(data: any) {
    let position = [data.x, data.y]
    let coord = this.converter.Position(this.size, position)
    data.coord = coord
    delete data.x
    delete data.y
    this.option.series[0].markPoint.data.push(data)
  }

  private appendLink(data: any) {
    this.option.series[0].links.push(data)
  }
  clear() {
    this.option.series[0].data = []
    this.option.series[0].links = []
    this.option.series[1].data = []
  }
  target = {
    id: undefined as string | undefined,
    set: (id: string, text?: string) => {
      this.start.id = id
      this.label(this.config ? this.config.label : false, text)
      this.echart.setOption(this.option)
    },
    clear: () => {
      this.start.id = undefined
      this.label(this.config ? this.config.label : false)
      this.echart.setOption(this.option)
    },
  }
  start = {
    id: undefined as string | undefined,
    set: (id: string, text?: string) => {
      this.start.id = id
      this.label(this.config ? this.config.label : false, text)
      this.echart.setOption(this.option)
    },
    clear: () => {
      this.start.id = undefined
      this.label(this.config ? this.config.label : false)
      this.echart.setOption(this.option)
    },
  }
  end = {
    id: undefined as string | undefined,
    set: (id: string, text?: string) => {
      this.end.id = id
      this.label(this.config ? this.config.label : false, text)
      this.echart.setOption(this.option)
    },
    clear: () => {
      this.end.id = undefined
      this.label(this.config ? this.config.label : false)
      this.echart.setOption(this.option)
    },
  }
  async load(data: DeviceRobotModel, config: DeviceRobotPlayEChartDisplay) {
    this.clear()
    this.config = config
    for (let i = 0; i < data.nodes.length; i++) {
      let node = data.nodes[i]
      let port: any = {}
      switch (node.NodeType) {
        case MeshNodeType.ChargingPort:
          port = this.converter.ChargingPort(node)
          break
        case MeshNodeType.MagneticPin:
          port = this.converter.MagneticPin(node)
          break
        case MeshNodeType.DropPort:
          port = this.converter.DropPort(node)
          break
        case MeshNodeType.StorePort:
          port = this.converter.StorePort(node)
          break
        case MeshNodeType.SterilizedPort:
          port = this.converter.SterilizedPort(node)
          break
        case MeshNodeType.Compactor:
          port = this.converter.Compactor(node)
          break

        default:
          break
      }

      this.appendNode(port)
    }

    for (let i = 0; i < data.edges.length; i++) {
      let link = this.converter.Link(data.edges[i])
      this.appendLink(link)
    }

    if (this.config.robot) {
      let robot = this.converter.Robot({
        x: data.location.Position.X,
        y: data.location.Position.Y,
      })
      this.appendItem(robot)
    }

    this.label(this.config.label)

    this.echart.setOption(this.option)

    for (let i = 0; i < data.trashcans.length; i++) {
      let item = data.trashcans[i]
      if (item.Position) {
        this.appendItem(
          await this.converter.TrashCan(data.trashcans[i], this.images)
        )
      }
    }
    this.echart.setOption(this.option)
  }
}
