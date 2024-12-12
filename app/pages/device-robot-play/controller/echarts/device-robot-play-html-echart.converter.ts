import { ColorTool } from '../../../../common/tools/color/color.tool'
import { EnumTool } from '../../../../common/tools/enum-tool/enum.tool'
import { Guid } from '../../../../common/tools/guid/guid'
import { ImageTool } from '../../../../common/tools/image-tool/image.tool'
import { CoverState } from '../../../../data-core/enums/robot/cover-state.enum'
import { MeshEdge } from '../../../../data-core/models/robot/mesh-edge.model'
import { MeshNode } from '../../../../data-core/models/robot/mesh-node.model'
import { RobotTrashCan } from '../../../../data-core/models/robot/robot-trash-can.model'
import { Position, Size } from '../../../device-robot/device-robot.model'

export class DeviceRobotCalibrationHtmlEChartConverter {
  itemStyle = {
    MagneticPin: {
      itemStyle: {
        color: '#b1d4ff',
        borderColor: '#7e7e7e',
        borderWidth: 1,
      },
    },
    DropPort: {
      symbol: 'rect',
      itemStyle: {
        color: '#ffeec4',
        borderColor: '#7e7e7e',
        borderWidth: 1,
      },
    },
    StorePort: {
      symbol: 'rect',
      itemStyle: {
        color: '#d9ffff',
        borderColor: '#7e7e7e',
        borderWidth: 1,
      },
    },
    ChargingPort: {
      symbol: 'rect',
      itemStyle: {
        color: '#cfffd3',
        borderColor: '#7e7e7e',
        borderWidth: 1,
      },
    },
    SterilizedPort: {
      symbol: 'rect',
      itemStyle: {
        color: '#d3bdff',
        borderColor: '#7e7e7e',
        borderWidth: 1,
      },
    },
    Compactor: {
      symbol: 'rect',
      itemStyle: {
        color: '#ffc8f0',
        borderColor: '#7e7e7e',
        borderWidth: 1,
      },
    },
  }

  ChargingPort(node: MeshNode) {
    let port = {
      x: node.Position.X,
      y: node.Position.Y,
      name: node.Name ? node.Name : '充电口',
      id: node.Id,
      data: node,

      label: {
        show: false,
      },
    }
    port = Object.assign(port, this.itemStyle.ChargingPort)
    return port
  }
  MagneticPin(node: MeshNode) {
    let port = {
      x: node.Position.X,
      y: node.Position.Y,
      name: node.Name,
      id: node.Id,
      data: node,

      label: {
        show: false,
      },
    }
    port = Object.assign(port, this.itemStyle.MagneticPin)
    return port
  }
  StorePort(node: MeshNode) {
    let port = {
      x: node.Position.X,
      y: node.Position.Y,
      name: node.Name,
      id: node.Id,
      data: node,

      label: {
        show: false,
      },
    }
    port = Object.assign(port, this.itemStyle.StorePort)
    return port
  }
  DropPort(node: MeshNode) {
    let port = {
      x: node.Position.X,
      y: node.Position.Y,
      name: node.Name,
      id: node.Id,
      data: node,
      label: {
        show: false,
      },
    }
    port = Object.assign(port, this.itemStyle.DropPort)
    return port
  }
  SterilizedPort(node: MeshNode) {
    let port = {
      x: node.Position.X,
      y: node.Position.Y,
      name: node.Name ? node.Name : '消毒作业口',
      id: node.Id,
      data: node,
      label: {
        show: false,
      },
    }
    port = Object.assign(port, this.itemStyle.SterilizedPort)
    return port
  }
  Compactor(node: MeshNode) {
    let port = {
      x: node.Position.X,
      y: node.Position.Y,
      name: node.Name ? node.Name : '压缩口',
      id: node.Id,
      data: node,
      label: {
        show: false,
        formatter: '',
      },
    }
    port = Object.assign(port, this.itemStyle.Compactor)
    return port
  }
  Link(edge: MeshEdge) {
    let link = {
      id: edge.Id,
      source: edge.Start.Id ?? 0,
      target: edge.End.Id,
      data: edge,
    }
    return link
  }
  Robot(position: Position) {
    let robot = {
      x: position.x,
      y: position.y,
      z: 10,
      name: '机器人',
      label: {
        show: false,
        formatter: '',
      },
      symbol: ImageTool.robot,
      symbolSize: 20,
      itemStyle: {
        color: '#000',
      },
      tooltip: {
        show: false,
      },
      select: {
        disabled: true,
      },
      emphasis: {
        disabled: true,
      },
    }
    return robot
  }
  Position(size: Size, data: Position): Position
  Position(size: Size, data: number[]): number[]
  Position(size: Size, data: Position | number[]) {
    if (Array.isArray(data)) {
      return [data[0], size.height - data[1]]
    } else {
      data.y = size.height - data.y
      return data
    }
  }

  async TrashCan(
    data: RobotTrashCan,
    images: { [key: string]: HTMLImageElement }
  ) {
    let id = Guid.NewGuid().ToString('N')
    let port = {
      x: data.Position!.X,
      y: data.Position!.Y,
      name: `${await EnumTool.trashcan.CanType(data.CanType)}_${
        data.NodeId ?? id
      }`,
      id: id,
      data: data,

      label: {
        show: false,
        formatter: '',
      },
      symbol: `image://${images[data.CanType].src}`,
      symbolSize: 30,
      symbolOffset: [35, 0],
      itemStyle: {
        color: ColorTool.trashcan[data.CanType],
      },
      select: {
        disabled: true,
      },
      tooltip: {
        show: true,
      },
      emphasis: {
        disabled: true,
      },
    }
    return port
  }

  TrashCanImage(data: RobotTrashCan) {
    let canvas = document.createElement('canvas')
    canvas.width = 20
    canvas.height = 20
    let ctx = canvas.getContext('2d') as CanvasRenderingContext2D
    ctx.moveTo(0, 0)
    ctx.lineTo(0, canvas.height)
    ctx.lineTo(canvas.width, canvas.height)
    ctx.lineTo(canvas.width, 0)
    if (data.CoverState === CoverState.Closed) {
      ctx.lineTo(0, 0)
    }
    ctx.strokeStyle = '#1a1a1a'
    ctx.lineJoin = 'round'
    ctx.lineCap = 'round'
    ctx.lineWidth = 3
    ctx.stroke()
    ctx.beginPath()
    let volume = (data.Volume ?? 0) / 100
    ctx.fillStyle = '#0f0'
    ctx.fillRect(
      2,
      canvas.height * (1 - volume),
      canvas.width - 4,
      canvas.height * volume - 2
    )
    return canvas.toDataURL()
  }
}
