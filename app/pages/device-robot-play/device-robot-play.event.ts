import { MeshEdge } from '../../data-core/models/robot/mesh-edge.model'
import { MeshNode } from '../../data-core/models/robot/mesh-node.model'

export interface DeviceRobotPlayEvent {
  moveto: (node: MeshNode) => void
  changeto: (store: MeshNode, drop: MeshNode) => void
  modechange(move: boolean): void
}
export interface DeviceRobotPlayEChartEvent {
  nodeselect(data: MeshNode): void
  edgeselect(data: MeshEdge): void
}
