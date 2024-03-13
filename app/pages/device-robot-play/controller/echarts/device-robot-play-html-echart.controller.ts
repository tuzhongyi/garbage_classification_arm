import * as echarts from 'echarts'
import { EventEmitter } from '../../../../common/event-emitter'
import { MeshNodeType } from '../../../../data-core/enums/robot/mesh-node-type.model'
import {
  DeviceRobotModel,
  Size,
} from '../../../device-robot/device-robot.model'
import { DeviceRobotPlayEChartEvent } from '../../device-robot-play.event'

import { DeviceRobotCalibrationHtmlEChartConverter } from './device-robot-play-html-echart.converter'
import { option } from './device-robot-play.option'
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
    let _data = this.converter.Position(this.size, data)
    this.option.series[0].data.push(_data)
    this.option.series[1].data.push(_data)
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
  start = {
    set: (id: string) => {
      let index = this.start.index(id)
      if (index >= 0) {
        let data = this.option.series[0].data[index]
        data.label = {
          show: true,
          formatter: '✔',
        }
        this.echart.setOption(this.option)
      }
    },
    index: (id: string) => {
      return (this.option.series[0].data as any[]).findIndex((x) => x.id === id)
    },
    clear: () => {
      for (let i = 0; i < this.option.series[0].data.length; i++) {
        let data = this.option.series[0].data[i]
        if (data.data) {
          if (data.data.NodeType == MeshNodeType.StorePort) {
            data.label.formatter = ''
          }
        }
      }
    },
  }
  end = {
    set: (id: string) => {
      let index = this.start.index(id)
      if (index >= 0) {
        let data = this.option.series[0].data[index]
        data.label = {
          show: true,
          formatter: '✔',
        }
        this.echart.setOption(this.option)
      }
    },
    index: (id: string) => {
      return (this.option.series[0].data as any[]).findIndex((x) => x.id === id)
    },
    clear: () => {
      for (let i = 0; i < this.option.series[0].data.length; i++) {
        let data = this.option.series[0].data[i]
        if (data.data) {
          if (data.data.NodeType == MeshNodeType.DropPort) {
            data.label = {
              show: false,
              formatter: '',
            }
          }
        }
      }
      this.echart.setOption(this.option)
    },
  }
  async load(data: DeviceRobotModel) {
    this.clear()

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

        default:
          break
      }

      this.appendNode(port)
    }

    for (let i = 0; i < data.edges.length; i++) {
      let link = this.converter.Link(data.edges[i])
      this.appendLink(link)
    }

    let robot = this.converter.Robot({
      x: data.location.Position.X,
      y: data.location.Position.Y,
    })
    this.appendItem(robot)
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
