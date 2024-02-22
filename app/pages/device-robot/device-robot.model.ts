import { MeshEdge } from '../../data-core/models/robot/mesh-edge.model'
import { MeshLocation } from '../../data-core/models/robot/mesh-location.model'
import { MeshNodePosition } from '../../data-core/models/robot/mesh-node-position.model'
import { MeshNode } from '../../data-core/models/robot/mesh-node.model'
import { RobotBattery } from '../../data-core/models/robot/robot-battery.model'
import { RobotTrashCan } from '../../data-core/models/robot/robot-trash-can.model'
import { Robot } from '../../data-core/models/robot/robot.model'

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

export class DeviceRobotModel {
  constructor() {
    this.location.Position = new MeshNodePosition()
    this.location.Position.X = 0
    this.location.Position.Y = 0
  }
  nodes: MeshNode[] = []
  edges: MeshEdge[] = []
  location: MeshLocation = new MeshLocation()
  robot!: Promise<Robot>
  battery!: Promise<RobotBattery>
  trashcans: RobotTrashCan[] = []
}
