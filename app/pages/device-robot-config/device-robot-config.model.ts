import { MeshEdge } from '../../data-core/models/robot/mesh-edge.model'
import { MeshLocation } from '../../data-core/models/robot/mesh-location.model'
import { MeshNode } from '../../data-core/models/robot/mesh-node.model'

export interface Size {
  width: number
  height: number
}
export interface Position {
  x: number
  y: number
}
export interface Line {
  begin: Position
  end: Position
}

export class EqualsTool {
  static position(a: Position, b: Position) {
    return a.x == b.x && a.y == b.y
  }

  static line(a: Line, b: Line) {
    return this.position(a.begin, b.begin) && this.position(a.end, b.end)
  }
}

export class DeviceRobotConfigTool {
  static equals = EqualsTool
  static copy(position: Position) {
    return {
      x: position.x,
      y: position.y,
    }
  }
}

export class DeviceRobotConfigModel {
  nodes: MeshNode[] = []
  edges: MeshEdge[] = []
  location: MeshLocation = new MeshLocation()
}
