import { EventEmitter } from '../../../../common/event-emitter'
import { Language } from '../../../../common/language'
import { HtmlTool } from '../../../../common/tools/html-tool/html.tool'
import { CalibrationAreaType } from '../../../../data-core/enums/calibration_area_type.enum'
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
    area: {
      type: document.getElementById('info_area_type') as HTMLSelectElement,
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

  private regist() {
    this.element.node.addEventListener('change', () => {
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
    })
    this.element.name.addEventListener('input', () => {
      if (this.data.info) {
        this.data.info.Name = this.element.name.value
      }
    })
    this.element.area.type.addEventListener('change', () => {
      if (this.data.info instanceof ChannelCalibrationArea) {
        this.data.info.AreaType = this.element.area.type
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
    this.element.area.type.value = info.AreaType
  }

  loadNode(nodes: MeshNode[], cannull = false) {
    this.element.node.innerHTML = ''
    this.data.nodes = nodes
    if (cannull) {
      let none: IIdNameModel = {
        Id: '',
        Name: '无',
      }
      HtmlTool.select.append(none, this.element.node)
    }

    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i]
      HtmlTool.select.append(node, this.element.node)
    }
  }
  loadAreaType(types: CalibrationAreaType[]) {
    this.element.area.type.innerHTML = ''
    for (let i = 0; i < types.length; i++) {
      let model: IIdNameModel = {
        Id: types[i],
        Name: Language.CalibrationAreaType(types[i]),
      }
      HtmlTool.select.append(model, this.element.area.type)
    }
  }

  load(info: ChannelCalibrationPoint | ChannelCalibrationArea) {
    this.data.info = info
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
    this.element.area.type.value = ''
  }
}
