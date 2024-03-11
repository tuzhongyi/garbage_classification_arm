import { EventEmitter } from '../../common/event-emitter'
import { EnumTool } from '../../common/tools/enum-tool/enum.tool'
import { MeshNodeType } from '../../data-core/enums/robot/mesh-node-type.model'
import { MeshNode } from '../../data-core/models/robot/mesh-node.model'
import { DeviceRobotModel } from '../device-robot/device-robot.model'
import { DeviceRobotPlayStateChartController } from './controller/details/device-robot-play-state-color.controller'
import { DeviceRobotPlayHtmlStatusController } from './controller/details/device-robot-play.html-status.controller'
import { DeviceRobotPlayHtmlTrashCansController } from './controller/details/device-robot-play.html-trashcans.controller'
import { DeviceRobotPlayHtmlEChartController } from './controller/echarts/device-robot-play-html-echart.controller'
import { DeviceRobotPlayEvent } from './device-robot-play.event'
import './less/device-robot-play-details.less'
import './less/device-robot-play.less'
export class DeviceRobotPlayHtmlController {
  constructor() {
    this.regist()
  }

  element = {
    mode: {
      move: document.getElementById('mode_move') as HTMLButtonElement,
      change: document.getElementById('mode_change') as HTMLButtonElement,
    },
    node: {
      drop: {
        id: document.getElementById('node_drop_id') as HTMLInputElement,
        rfid: document.getElementById('node_drop_rfid') as HTMLInputElement,
        name: document.getElementById('node_drop_name') as HTMLInputElement,

        cantype: document.getElementById(
          'node_drop_cantype'
        ) as HTMLInputElement,
      },
      store: {
        id: document.getElementById('node_store_id') as HTMLInputElement,
        rfid: document.getElementById('node_store_rfid') as HTMLInputElement,
        name: document.getElementById('node_store_name') as HTMLInputElement,

        cantype: document.getElementById(
          'node_store_cantype'
        ) as HTMLInputElement,
      },
      target: {
        id: document.getElementById('node_target_id') as HTMLInputElement,
        rfid: document.getElementById('node_target_rfid') as HTMLInputElement,
        name: document.getElementById('node_target_name') as HTMLInputElement,
        nodeType: document.getElementById(
          'node_target_nodetype'
        ) as HTMLInputElement,
        cantype: document.getElementById(
          'node_target_cantype'
        ) as HTMLInputElement,
      },
    },
    details: {
      moveto: document.getElementById('details_moveto') as HTMLDivElement,
      changeto: document.getElementById('details_changeto') as HTMLDivElement,
    },
    buttons: {
      reset: document.getElementById('btn_reset') as HTMLButtonElement,
      move: document.getElementById('btn_command_move') as HTMLButtonElement,
      change: document.getElementById(
        'btn_command_change'
      ) as HTMLButtonElement,
      weigh: document.getElementById('btn_command_weigh') as HTMLButtonElement,
    },
  }

  event: EventEmitter<DeviceRobotPlayEvent> = new EventEmitter()
  echart = new DeviceRobotPlayHtmlEChartController()
  status = new DeviceRobotPlayHtmlStatusController()
  statechart = new DeviceRobotPlayStateChartController()
  trashcans = new DeviceRobotPlayHtmlTrashCansController()

  private _ismove: boolean = true
  public get ismove(): boolean {
    return this._ismove
  }
  public set ismove(v: boolean) {
    this._ismove = v
    if (this._ismove) {
      this.element.mode.move.className = 'button-blue nohover'
      this.element.mode.change.className = 'button-blue-line nohover'
      this.element.details.changeto.style.display = 'none'
      this.element.details.moveto.style.display = ''
      this.element.buttons.move.style.display = ''
      this.element.buttons.weigh.style.display = ''
      this.element.buttons.change.style.display = 'none'
      this.element.buttons.reset.style.display = 'none'
      this.echart.start.clear()
      this.echart.end.clear()
      this.clearDrop()
      this.clearStore()
    } else {
      this.element.mode.move.className = 'button-blue-line nohover'
      this.element.mode.change.className = 'button-blue nohover'
      this.element.details.changeto.style.display = ''
      this.element.details.moveto.style.display = 'none'
      this.element.buttons.move.style.display = 'none'
      this.element.buttons.weigh.style.display = 'none'
      this.element.buttons.change.style.display = ''
      this.element.buttons.reset.style.display = ''
      this.clearTarget()
    }
  }

  selected: {
    store?: MeshNode
    drop?: MeshNode
    target?: MeshNode
  } = {}

  regist() {
    this.element.mode.move.addEventListener('click', (e) => {
      this.ismove = true
    })
    this.element.mode.change.addEventListener('click', (e) => {
      this.ismove = false
    })
    this.element.buttons.move.addEventListener('click', (e) => {
      if (this.selected.target) {
        this.event.emit('moveto', this.selected.target)
      }
    })
    this.element.buttons.weigh.addEventListener('click', (e) => {
      if (this.selected.target) {
        this.event.emit('weigh', this.selected.target)
      }
    })
    this.element.buttons.change.addEventListener('click', (e) => {
      if (this.selected.store && this.selected.drop) {
        this.event.emit('changeto', this.selected.store, this.selected.drop)
      }
    })
    this.element.buttons.reset.addEventListener('click', (e) => {
      this.clear()
    })
    this.echart.event.on('nodeselect', (node) => {
      if (this.ismove) {
        this.selectTarget(node)
      } else {
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
      }
    })
  }

  clearTarget() {
    for (const key in this.element.node.target) {
      ;(this.element.node.target as any)[key].value = ''
    }
  }
  clearDrop() {
    for (const key in this.element.node.drop) {
      ;(this.element.node.drop as any)[key].value = ''
    }
    this.echart.end.clear()
  }
  clearStore() {
    for (const key in this.element.node.store) {
      ;(this.element.node.store as any)[key].value = ''
    }
    this.echart.start.clear()
  }

  clear() {
    this.clearDrop()
    this.clearStore()
    this.clearTarget()
  }

  async selectTarget(data: MeshNode) {
    this.selected.target = data
    this.element.node.target.id.value = data.Id
    this.element.node.target.rfid.value = data.Rfid ?? ''
    this.element.node.target.name.value = data.Name ?? ''
    this.element.node.target.nodeType.value = await EnumTool.MeshNodeType(
      data.NodeType
    )
    this.element.node.target.cantype.value = await EnumTool.CanType(
      data.CanType
    )
  }
  async selectDrop(data: MeshNode) {
    this.selected.drop = data
    this.element.node.drop.id.value = data.Id
    this.element.node.drop.rfid.value = data.Rfid ?? ''
    this.element.node.drop.name.value = data.Name ?? ''

    this.element.node.drop.cantype.value = await EnumTool.CanType(data.CanType)
    this.echart.end.clear()
    this.echart.end.set(data.Id)
  }
  async selectStore(data: MeshNode) {
    this.selected.store = data
    this.element.node.store.id.value = data.Id
    this.element.node.store.rfid.value = data.Rfid ?? ''
    this.element.node.store.name.value = data.Name ?? ''

    this.element.node.store.cantype.value = await EnumTool.CanType(data.CanType)
    this.echart.start.clear()
    this.echart.start.set(data.Id)
  }

  async load(model: DeviceRobotModel) {
    this.echart.load(model)
    this.status.load(model)
  }
}
