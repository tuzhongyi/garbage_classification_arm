import { MeshEdge } from '../../../../data-core/models/robot/mesh-edge.model'
import { MeshNode } from '../../../../data-core/models/robot/mesh-node.model'
import { Position, Size } from '../../../device-robot/device-robot.model'

export class DeviceRobotConfigHtmlEChartConverter {
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
        formatter: '',
      },
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
      symbol:
        'image://data:image/gif;base64,R0lGODlhEAAQAMQAAORHHOVSKudfOulrSOp3WOyDZu6QdvCchPGolfO0o/XBs/fNwfjZ0frl3/zy7////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAkAABAALAAAAAAQABAAAAVVICSOZGlCQAosJ6mu7fiyZeKqNKToQGDsM8hBADgUXoGAiqhSvp5QAnQKGIgUhwFUYLCVDFCrKUE1lBavAViFIDlTImbKC5Gm2hB0SlBCBMQiB0UjIQA7',
      symbolSize: 20,
    }
    return robot
  }
  Position(size: Size, data: Position) {
    data.y = size.height - data.y
    return data
  }
}
