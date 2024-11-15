import { EventEmitter } from '../../../../common/event-emitter'
import { MeshNodeType } from '../../../../data-core/enums/robot/mesh-node-type.model'
import { CanType } from '../../../../data-core/enums/robot/robot-can-type.model'
import { MeshEdge } from '../../../../data-core/models/robot/mesh-edge.model'
import { MeshNode } from '../../../../data-core/models/robot/mesh-node.model'
import { DeviceRobotTool } from '../../../device-robot/device-robot.tool'
import { DeviceRobotCalibrationDetailsEvent } from '../../device-robot-calibration.event'

export class DeviceRobotCalibrationHtmlNodeDetailsController {
  constructor() {
    this.regist()
  }

  element = {
    node: {
      parent: document.querySelector('.details.mesh-node') as HTMLDivElement,
      id: document.getElementById('node_id') as HTMLInputElement,
      rfid: document.getElementById('node_rfid') as HTMLInputElement,
      name: document.getElementById('node_name') as HTMLInputElement,
      x: document.getElementById('node_x') as HTMLInputElement,
      y: document.getElementById('node_y') as HTMLInputElement,
      nodetype: {
        ChargingPort: document.getElementById(
          'node_type_ChargingPort'
        ) as HTMLDivElement,
        DropPort: document.getElementById(
          'node_type_DropPort'
        ) as HTMLDivElement,
        StorePort: document.getElementById(
          'node_type_StorePort'
        ) as HTMLDivElement,
        MagneticPin: document.getElementById(
          'node_type_MagneticPin'
        ) as HTMLDivElement,
        SterilizedPort: document.getElementById(
          'node_type_SterilizedPort'
        ) as HTMLDivElement,
        Compactor: document.getElementById(
          'node_type_Compactor'
        ) as HTMLDivElement,
      },
      cantype: {
        parent: document.querySelector('.can-type') as HTMLDivElement,
        Dry: document.getElementById('node_type_Dry') as HTMLDivElement,
        Wet: document.getElementById('node_type_Wet') as HTMLDivElement,
        Recycle: document.getElementById('node_type_Recycle') as HTMLDivElement,
        Hazard: document.getElementById('node_type_Hazard') as HTMLDivElement,
      },
    },
    edge: {
      direction: document.getElementById('edge_direction') as HTMLInputElement,
      distance: document.getElementById('edge_distance') as HTMLInputElement,
    },

    save: document.getElementById('node_save') as HTMLButtonElement,
  }

  event: EventEmitter<DeviceRobotCalibrationDetailsEvent> = new EventEmitter()

  regist() {
    this.element.node.nodetype.ChargingPort.addEventListener('click', () => {
      this.nodetypechange(MeshNodeType.ChargingPort)
      this.event.emit('nodetypechange', MeshNodeType.ChargingPort)
    })
    this.element.node.nodetype.DropPort.addEventListener('click', () => {
      this.nodetypechange(MeshNodeType.DropPort)
      this.event.emit('nodetypechange', MeshNodeType.DropPort)
    })
    this.element.node.nodetype.MagneticPin.addEventListener('click', () => {
      this.nodetypechange(MeshNodeType.MagneticPin)
      this.event.emit('nodetypechange', MeshNodeType.MagneticPin)
    })
    this.element.node.nodetype.StorePort.addEventListener('click', () => {
      this.nodetypechange(MeshNodeType.StorePort)
      this.event.emit('nodetypechange', MeshNodeType.StorePort)
    })
    this.element.node.nodetype.SterilizedPort.addEventListener('click', () => {
      this.nodetypechange(MeshNodeType.SterilizedPort)
      this.event.emit('nodetypechange', MeshNodeType.SterilizedPort)
    })
    this.element.node.nodetype.Compactor.addEventListener('click', () => {
      this.nodetypechange(MeshNodeType.Compactor)
      this.event.emit('nodetypechange', MeshNodeType.Compactor)
    })
    this.element.node.cantype.Wet.addEventListener('click', () => {
      this.cantypechange(CanType.Wet)
      this.event.emit('cantypechange', CanType.Wet)
    })
    this.element.node.cantype.Dry.addEventListener('click', () => {
      this.cantypechange(CanType.Dry)
      this.event.emit('cantypechange', CanType.Dry)
    })
    this.element.node.cantype.Recycle.addEventListener('click', () => {
      this.cantypechange(CanType.Recycle)
      this.event.emit('cantypechange', CanType.Recycle)
    })
    this.element.node.cantype.Hazard.addEventListener('click', () => {
      this.cantypechange(CanType.Hazard)
      this.event.emit('cantypechange', CanType.Hazard)
    })

    this.element.node.x.addEventListener('input', () => {
      this.event.emit('nodexchange')
    })
    this.element.node.y.addEventListener('input', () => {
      this.event.emit('nodeychange')
    })
    this.element.edge.distance.addEventListener('input', () => {
      this.event.emit('distancechange')
    })

    this.element.save.addEventListener('click', () => {
      this.event.emit('save')
    })
  }

  clear() {
    this.element.node.id.value = ''
    this.element.node.name.value = ''
    this.element.node.rfid.value = ''
    this.element.node.x.value = ''
    this.element.node.y.value = ''
    this.element.edge.direction.value = ''
    this.element.edge.distance.value = ''
  }

  load(node: MeshNode, edge?: MeshEdge, calibrating = false) {
    this.element.node.id.value = node.Id
    this.element.node.name.value = node.Name
    this.element.node.rfid.value = node.Rfid ?? ''
    this.element.node.x.value = node.Position.X.toString()
    this.element.node.y.value = node.Position.Y.toString()
    this.element.node.x.disabled = false
    this.element.node.y.disabled = false

    this.nodetypechange(node.NodeType)
    if (node.CanType) {
      this.cantypechange(node.CanType)
    }

    let edges = document.querySelectorAll<HTMLDivElement>('.mesh-edge')
    this.element.save.innerText = calibrating ? '保存并继续' : '保存'
    edges.forEach((e) => {
      e.style.display = calibrating ? '' : 'none'
    })

    if (edge) {
      this.element.edge.direction.value =
        DeviceRobotTool.converter.direction.language(edge.Direction ?? 0)

      this.element.node.x.disabled =
        edge.Direction == 0 || edge.Direction == 180
      this.element.node.y.disabled =
        edge.Direction == 90 || edge.Direction == 270

      this.element.edge.distance.value = edge.Distance.toString()
    }
  }

  private nodetypechange(type: MeshNodeType) {
    let selected = document.querySelector('.node-type .selected')
    if (selected) {
      selected.classList.remove('selected')
    }

    switch (type) {
      case MeshNodeType.ChargingPort:
        this.element.node.nodetype.ChargingPort.classList.add('selected')
        this.element.node.cantype.parent.style.display = 'none'
        break
      case MeshNodeType.DropPort:
        this.element.node.nodetype.DropPort.classList.add('selected')
        this.element.node.cantype.parent.style.display = ''
        break
      case MeshNodeType.MagneticPin:
        this.element.node.nodetype.MagneticPin.classList.add('selected')
        this.element.node.cantype.parent.style.display = 'none'
        break
      case MeshNodeType.StorePort:
        this.element.node.nodetype.StorePort.classList.add('selected')
        this.element.node.cantype.parent.style.display = ''
        break
      case MeshNodeType.SterilizedPort:
        this.element.node.nodetype.SterilizedPort.classList.add('selected')
        this.element.node.cantype.parent.style.display = 'none'
        break
      case MeshNodeType.Compactor:
        this.element.node.nodetype.Compactor.classList.add('selected')
        this.element.node.cantype.parent.style.display = 'none'
        break

      default:
        break
    }
  }

  private cantypechange(type: CanType) {
    let selected = document.querySelector('.can-type .selected')
    if (selected) {
      selected.classList.remove('selected')
    }

    switch (type) {
      case CanType.Wet:
        this.element.node.cantype.Wet.classList.add('selected')
        break
      case CanType.Dry:
        this.element.node.cantype.Dry.classList.add('selected')
        break
      case CanType.Recycle:
        this.element.node.cantype.Recycle.classList.add('selected')
        break
      case CanType.Hazard:
        this.element.node.cantype.Hazard.classList.add('selected')
        break

      default:
        break
    }
  }
}
