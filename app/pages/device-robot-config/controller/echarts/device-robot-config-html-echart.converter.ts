import { Guid } from '../../../../common/tools/guid/guid'
import { ImageTool } from '../../../../common/tools/image-tool/image.tool'
import { MeshEdge } from '../../../../data-core/models/robot/mesh-edge.model'
import { MeshNode } from '../../../../data-core/models/robot/mesh-node.model'
import { Position, Size } from '../../../device-robot/device-robot.model'

export class DeviceRobotConfigHtmlEChartConverter {
  size: Size = {
    width: 0,
    height: 0,
  }
  itemStyle = {
    MagneticPin: {
      itemStyle: {
        color: 'rgba(177,212,255,1)',
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
  }

  getLabel() {
    return {
      show: true,
      fontSize: '18px',
      offset: [0, 2],
      textBorderColor: '#fff',
      textBorderWidth: 1,
      formatter: (args: any) => {
        if (args.data) {
          return args.data.id
        }
        return ''
      },
    }
  }

  ChargingPort(node: MeshNode) {
    let port = {
      x: node.Position.X,
      y: node.Position.Y,
      name: node.Name ? node.Name : '充电口',
      id: node.Id,
      data: node,
      label: this.getLabel(),
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
      label: this.getLabel(),
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
      label: this.getLabel(),
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
      label: this.getLabel(),
    }
    port = Object.assign(port, this.itemStyle.DropPort)
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
  Robot2(position: Position) {
    let guid = Guid.NewGuid().ToString('N')
    let robot = {
      x: position.x,
      y: position.y,
      id: guid,
      name: guid,
      label: {
        show: false,
      },
      lineHeight: 50,
      symbol: ImageTool.robot,
      symbolSize: 20,
    }
    return robot
  }
  Robot1(id: string, position: Position) {
    let robot = {
      x: position.x,
      y: position.y,
      id: id,
      name: '机器人',
      label: {
        show: false,
      },
      symbol: ImageTool.robot,
      symbolSize: 20,
    }
    return robot
  }
  Position(data: Position) {
    data.y = this.size.height - data.y
    return data
  }
}
