import { EventEmitter } from '../../common/event-emitter'
import { MeshNodeType } from '../../data-core/enums/robot/mesh-node-type.model'
import { MeshNode } from '../../data-core/models/robot/mesh-node.model'
import { DeviceRobotModel } from '../device-robot/device-robot.model'
import { DeviceRobotPlayEChartDisplayController } from './controller/details/device-robot-play-chart-display.controller'
import { DeviceRobotPlayEChartDisplay } from './controller/details/device-robot-play-chart-display.model'
import { DeviceRobotPlayStateChartController } from './controller/details/device-robot-play-state-color.controller'
import { DeviceRobotPlayHtmlStatusController } from './controller/details/device-robot-play.html-status.controller'
import { DeviceRobotPlayHtmlTrashCansController } from './controller/details/device-robot-play.html-trashcans.controller'
import { DeviceRobotPlayHtmlTemplateController } from './controller/details/template/device-robot-play-template.controller'
import { DeviceRobotPlayHtmlEChartController } from './controller/echarts/device-robot-play-html-echart.controller'
import { DeviceRobotPlayEvent } from './device-robot-play.event'
import { DeviceRobotPlayMode } from './device-robot-play.model'
import './less/device-robot-play-details.less'
import './less/device-robot-play.less'

export class DeviceRobotPlayHtmlController {
  constructor() {
    this.init()
    this.regist()
  }

  element = {
    mode: document.getElementById('mode') as HTMLSelectElement,
    content: document.getElementById('content') as HTMLDivElement,
    // buttons: {
    //   reset: document.getElementById('btn_reset') as HTMLButtonElement,
    //   move: document.getElementById('btn_command_move') as HTMLButtonElement,
    //   change: document.getElementById(
    //     'btn_command_change'
    //   ) as HTMLButtonElement,
    //   weigh: document.getElementById('btn_command_weigh') as HTMLButtonElement,
    // },
  }

  event: EventEmitter<DeviceRobotPlayEvent> = new EventEmitter()
  echart = new DeviceRobotPlayHtmlEChartController()
  status = new DeviceRobotPlayHtmlStatusController()
  statechart = new DeviceRobotPlayStateChartController()
  trashcans = new DeviceRobotPlayHtmlTrashCansController()
  display = new DeviceRobotPlayEChartDisplayController()
  template = new DeviceRobotPlayHtmlTemplateController()

  private mode = DeviceRobotPlayMode.single

  selected: {
    store?: MeshNode
    drop?: MeshNode
    target?: MeshNode
    start?: MeshNode
    end?: MeshNode
  } = {}

  private init() {
    this.template.create(this.element.content, this.mode)
  }

  private regist() {
    this.element.mode.addEventListener('change', (e) => {
      this.mode = this.element.mode.selectedIndex
      this.clear()
      this.element.content.innerHTML = ''
      this.template.create(this.element.content, this.mode)
      this.event.emit('modechange', this.mode)
    })

    this.template.event.on('move', () => {
      if (this.selected.target) {
        this.event.emit('moveto', this.selected.target)
      }
    })
    this.template.event.on('weigh', () => {
      if (this.selected.target) {
        this.event.emit('weigh', this.selected.target)
      }
    })
    this.template.event.on('spray', (args) => {
      this.event.emit('spray', args)
    })
    this.template.event.on('compaction', (args) => {
      if (this.selected.start && this.selected.end) {
        this.event.emit('compaction', {
          start: this.selected.start,
          end: this.selected.end,
          args,
        })
      }
    })
    this.template.event.on('change', () => {
      if (this.selected.store && this.selected.drop) {
        this.event.emit('changeto', this.selected.store, this.selected.drop)
      }
    })
    this.template.event.on('reset', () => {
      this.clear()
    })
    this.echart.event.on('nodeselect', (node) => {
      switch (this.mode) {
        case DeviceRobotPlayMode.single:
          this.selectTarget(node)
          break
        case DeviceRobotPlayMode.change:
          switch (node.NodeType) {
            case MeshNodeType.DropPort:
              this.selectDrop(node)
              break
            case MeshNodeType.StorePort:
              this.selectStore(node)
              break

            default:
              break
          }
          break
        case DeviceRobotPlayMode.compaction:
          if (this.selected.start) {
            this.selectEnd(node)
          } else {
            this.selectStart(node)
          }
          break
        default:
          break
      }
    })
  }

  clear() {
    this.template.clear()
    this.echart.target.clear()
    this.echart.start.clear()
    this.echart.end.clear()
    this.selected.target = undefined
    this.selected.store = undefined
    this.selected.drop = undefined
    this.selected.start = undefined
    this.selected.end = undefined
  }

  async selectTarget(data: MeshNode) {
    this.selected.target = data
    this.template.load(data)
    this.echart.target.set(data.Id)
  }
  async selectDrop(data: MeshNode) {
    this.selected.drop = data
    this.template.load({ drop: data })
    this.echart.end.set(data.Id)
  }
  async selectStore(data: MeshNode) {
    this.selected.store = data
    this.template.load({ store: data })
    this.echart.start.set(data.Id)
  }
  async selectStart(data: MeshNode) {
    this.selected.start = data
    this.template.load({ start: { node: data } })
    this.echart.start.set(data.Id, '始')
  }
  async selectEnd(data: MeshNode) {
    this.selected.end = data
    this.template.load({ end: { node: data } })
    this.echart.end.set(data.Id, '终')
  }

  async load(model: DeviceRobotModel, config: DeviceRobotPlayEChartDisplay) {
    this.echart.load(model, config)
    this.status.load(model)
  }
}
