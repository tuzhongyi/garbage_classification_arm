import { EventEmitter } from '../../../../common/event-emitter'
import { Language } from '../../../../common/language'
import { EnumTool } from '../../../../common/tools/enum-tool/enum.tool'
import { HtmlTool } from '../../../../common/tools/html-tool/html.tool'
import { CalibrationAreaType } from '../../../../data-core/enums/calibration_area_type.enum'
import { MeshNodeType } from '../../../../data-core/enums/robot/mesh-node-type.model'
import { ChannelCalibrationArea } from '../../../../data-core/models/arm/analysis/channel-calibration-area.model'
import { ChannelCalibrationPoint } from '../../../../data-core/models/arm/analysis/channel-calibration-point.model'
import { IIdNameModel } from '../../../../data-core/models/model.interface'
import { MeshNodePosition } from '../../../../data-core/models/robot/mesh-node-position.model'
import { MeshNode } from '../../../../data-core/models/robot/mesh-node.model'
import { DeviceChannelCalibrationInfoEvent } from './device-channel-calibration-info.event'

export class DeviceChannelCalibrationHtmlInfoController {
  event: EventEmitter<DeviceChannelCalibrationInfoEvent> = new EventEmitter()

  constructor() {
    this.regist()
    this.init()
  }
  private element = {
    name: document.getElementById('info_name') as HTMLInputElement,
    node: document.getElementById('info_node') as HTMLSelectElement,
    point: {
      corner: document.getElementById('info_point_corner') as HTMLSelectElement,
      position: {
        x: document.getElementById('info_point_position_x') as HTMLInputElement,
        y: document.getElementById('info_point_position_y') as HTMLInputElement,
      },
    },
    type: {
      area: document.getElementById('info_area_type') as HTMLSelectElement,
      node: document.getElementById('info_node_type') as HTMLSelectElement,
    },
    div: {
      points: document.querySelectorAll(
        '.form-item.point'
      ) as NodeListOf<HTMLElement>,
      areas: document.querySelectorAll(
        '.form-item.area'
      ) as NodeListOf<HTMLElement>,
    },
  }

  private data = {
    nodes: [] as MeshNode[],
    info: undefined as
      | ChannelCalibrationPoint
      | ChannelCalibrationArea
      | undefined,
  }

  private async init(data?: ChannelCalibrationPoint | ChannelCalibrationArea) {
    let types = [
      MeshNodeType.StorePort,
      MeshNodeType.DropPort,
      MeshNodeType.ChargingPort,
      MeshNodeType.MagneticPin,
      MeshNodeType.Other,
    ]
    this.element.type.node.innerHTML = ''

    if (data instanceof ChannelCalibrationArea) {
      types = [
        MeshNodeType.StorePort,
        MeshNodeType.DropPort,
        MeshNodeType.Other,
      ]
    } else if (data instanceof ChannelCalibrationPoint) {
      types = [
        MeshNodeType.StorePort,
        MeshNodeType.ChargingPort,
        MeshNodeType.MagneticPin,
        MeshNodeType.Other,
      ]
    }

    HtmlTool.select.append({ Id: '', Name: '全部' }, this.element.type.node)
    for (let i = 0; i < types.length; i++) {
      let item = {
        Id: types[i],
        Name: await EnumTool.MeshNodeType(types[i]),
      }
      HtmlTool.select.append(item, this.element.type.node)
    }
  }

  private regist() {
    this.element.type.node.addEventListener('change', (e) => {
      let none: IIdNameModel = {
        Id: '',
        Name: '无',
      }
      let nodes: IIdNameModel[] = this.data.nodes
      if (this.element.type.node.value == MeshNodeType.Other) {
        nodes = [none]
      } else if (this.element.type.node.value) {
        nodes = this.data.nodes.filter(
          (n) => n.NodeType == this.element.type.node.value
        )
      } else {
        nodes = [none, ...nodes]
      }

      this.loadNode(nodes)
    })
    this.element.node.addEventListener('change', () => {
      this.selectNode()
    })
    this.element.name.addEventListener('input', () => {
      if (this.data.info) {
        this.data.info.Name = this.element.name.value
      }
    })
    this.element.type.area.addEventListener('change', () => {
      if (this.data.info instanceof ChannelCalibrationArea) {
        this.data.info.AreaType = this.element.type.area
          .value as CalibrationAreaType
      }
    })
    this.element.point.corner.addEventListener('change', () => {
      if (this.data.info instanceof ChannelCalibrationPoint) {
        this.data.info.IsCorner = !!this.element.point.corner.value
      }
    })
    this.element.point.position.x.addEventListener('input', () => {
      if (this.data.info instanceof ChannelCalibrationPoint) {
        this.data.info.NodePosition.X = parseInt(
          this.element.point.position.x.value
        )
      }
    })
    HtmlTool.input.number.mousewheelchangevalue(
      this.element.point.position.x,
      (value) => {
        if (this.data.info instanceof ChannelCalibrationPoint) {
          this.data.info.NodePosition.X = value
        }
      }
    )
    this.element.point.position.y.addEventListener('input', () => {
      if (this.data.info instanceof ChannelCalibrationPoint) {
        this.data.info.NodePosition.Y = parseInt(
          this.element.point.position.y.value
        )
      }
    })
    HtmlTool.input.number.mousewheelchangevalue(
      this.element.point.position.y,
      (value) => {
        if (this.data.info instanceof ChannelCalibrationPoint) {
          this.data.info.NodePosition.Y = value
        }
      }
    )
  }

  private selectNode() {
    if (this.element.node.value) {
      let node = this.data.nodes.find((n) => n.Id == this.element.node.value)
      if (node) {
        if (this.data.info instanceof ChannelCalibrationPoint) {
          this.element.point.position.x.value = node.Position.X.toString()
          this.element.point.position.y.value = node.Position.Y.toString()

          this.data.info.NodeId = this.element.node.value
          this.data.info.NodeType = node.NodeType
          this.data.info.CanType = node.CanType
          this.data.info.NodePosition = new MeshNodePosition()
          this.data.info.NodePosition.X = node.Position.X
          this.data.info.NodePosition.Y = node.Position.Y
        } else if (this.data.info instanceof ChannelCalibrationArea) {
          this.data.info.NodeId = this.element.node.value
        } else {
        }
      } else {
        if (this.data.info instanceof ChannelCalibrationPoint) {
          this.data.info.NodeId = ''
          this.data.info.NodeType = undefined
          this.data.info.CanType = undefined
          this.data.info.NodePosition = new MeshNodePosition()
          this.data.info.NodePosition.X = 0
          this.data.info.NodePosition.Y = 0
        } else if (this.data.info instanceof ChannelCalibrationArea) {
          this.data.info.NodeId = undefined
        } else {
        }
      }

      this.event.emit('selectNode', node)
    }
  }

  private loadPoint(info: ChannelCalibrationPoint) {
    this.element.div.areas.forEach((div) => {
      div.style.display = 'none'
    })
    this.element.div.points.forEach((div) => {
      div.style.display = ''
    })
    this.element.name.value = info.Name
    this.element.node.value = info.NodeId ?? ''
    this.element.point.corner.value = info.IsCorner ? 'true' : ''
    this.element.point.position.x.value = info.NodePosition.X.toString()
    this.element.point.position.y.value = info.NodePosition.Y.toString()
  }
  private loadArea(info: ChannelCalibrationArea) {
    this.element.div.areas.forEach((div) => {
      div.style.display = ''
    })
    this.element.div.points.forEach((div) => {
      div.style.display = 'none'
    })
    this.element.name.value = info.Name
    this.element.node.value = info.NodeId ?? ''
    this.element.type.area.value = info.AreaType
  }

  private loadNode(nodes: IIdNameModel[]) {
    this.element.node.innerHTML = ''
    for (let i = 0; i < nodes.length; i++) {
      HtmlTool.select.append(nodes[i], this.element.node)
    }
    this.selectNode()
  }

  loadAreaType(types: CalibrationAreaType[]) {
    this.element.type.area.innerHTML = ''
    for (let i = 0; i < types.length; i++) {
      let model: IIdNameModel = {
        Id: types[i],
        Name: Language.CalibrationAreaType(types[i]),
      }
      HtmlTool.select.append(model, this.element.type.area)
    }
  }

  load(info: ChannelCalibrationPoint | ChannelCalibrationArea) {
    this.data.info = info
    this.init(info)
    if (info instanceof ChannelCalibrationArea) {
      this.loadArea(info)
    } else if (info instanceof ChannelCalibrationPoint) {
      this.loadPoint(info)
    } else {
      console.error(
        'DeviceChannelCalibrationHtmlInfoController:load not instanceof'
      )
    }
  }

  clear() {
    this.element.name.value = ''
    this.element.node.innerHTML = ''
    this.element.point.corner.value = ''
    this.element.point.position.x.value = ''
    this.element.point.position.y.value = ''
    this.element.type.area.value = ''
  }

  async initNode(nodes: MeshNode[]) {
    this.data.nodes = nodes
    let none: IIdNameModel = {
      Id: '',
      Name: '无',
    }

    this.loadNode([none, ...this.data.nodes])
  }
}
