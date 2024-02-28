import * as echarts from 'echarts'
import { EventEmitter } from '../../../../common/event-emitter'
import { MeshNodeType } from '../../../../data-core/enums/robot/mesh-node-type.model'
import {
  DeviceRobotModel,
  Size,
} from '../../../device-robot/device-robot.model'
import { DeviceRobotCalibrationEChartEvent } from '../../device-robot-calibration.event'
import { DeviceRobotCalibrationHtmlEChartConverter } from './device-robot-calibration-html-echart.converter'
import { option } from './device-robot-calibration.option'
export class DeviceRobotCalibrationHtmlEChartController {
  event: EventEmitter<DeviceRobotCalibrationEChartEvent> = new EventEmitter()
  constructor() {
    this.initCanvas()
    this.echart = echarts.init(this.canvas)
    this.regist()
  }

  private canvas = document.getElementById('canvas') as HTMLCanvasElement
  private echart: echarts.ECharts
  private option: any = Object.assign({}, option)
  private size: Size = {
    width: 0,
    height: 0,
  }
  private converter = new DeviceRobotCalibrationHtmlEChartConverter()

  disabled = false

  private initCanvas() {
    this.canvas.width = this.canvas.parentElement!.clientWidth
    this.canvas.height = this.canvas.parentElement!.clientHeight
    this.size = {
      width: this.canvas.width,
      height: this.canvas.height,
    }
    this.converter.size = this.size
  }

  private regist() {
    this.echart.on('click', 'series.graph', (e: any) => {
      if (!this.disabled) {
        if (e.dataType === 'node' && e.data) {
          this.event.emit('select', e.data.data)
        }
      }
    })
  }

  private appendNode(data: any) {
    let _data = this.converter.Position(data)
    this.option.series[0].data.push(_data)
  }
  private insertNode(data: any) {
    let _data = this.converter.Position(data)
    this.option.series[0].data.unshift(_data)
  }

  private appendLink(data: any) {
    this.option.series[0].links.push(data)
  }
  removeRobot() {
    if (this.option.series[0].data.length === 0) {
      return undefined
    }
    let index = this.option.series[0].data.length - 1
    return this.option.series[0].data.splice(index, 1)
  }
  clear() {
    this.option.series[0].data = []
    this.option.series[0].links = []
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
    let robot = this.converter.Robot1((await data.robot).Id ?? '-|-', {
      x: data.location.Position.X,
      y: data.location.Position.Y,
    })

    this.appendNode(robot)
    this.echart.setOption(this.option)
    console.log(this.option)

    setTimeout(() => {
      let robot = this.converter.Robot2({
        x: data.location.Position.X,
        y: data.location.Position.Y,
      })

      this.appendNode(robot)
      this.echart.setOption(this.option)
    }, 0)
  }

  select(id: string) {
    for (let i = 0; i < this.option.series[0].data.length; i++) {
      this.echart.dispatchAction({
        type: 'downplay',
        seriesIndex: 0,
        dataIndex: i,
      })
      let data = this.option.series[0].data
      if (data[i].data && data[i].data.Id === id) {
        this.echart.dispatchAction({
          type: 'select',
          seriesIndex: 0,
          dataIndex: i,
        })
      }
    }
  }

  disable(is: boolean) {
    this.disabled = is
    this.option.series[0].selectedMode = is ? 'false' : 'single'
    this.echart.setOption(this.option)
  }
}
