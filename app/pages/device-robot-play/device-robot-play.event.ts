import { MeshEdge } from '../../data-core/models/robot/mesh-edge.model'
import { MeshNode } from '../../data-core/models/robot/mesh-node.model'
import { IDeviceRobotPlayHtmlTemplateCompactionEventArgs } from './controller/details/template/compaction/device-robot-play-details-compaction.model'
import { IDeviceRobotPlayHtmlTemplateSprayEventArgs } from './controller/details/template/spray/device-robot-play-details-spray.model'
import { DeviceRobotPlayMode } from './device-robot-play.model'

export interface DeviceRobotPlayEvent {
  modechange(mode: DeviceRobotPlayMode): void
  moveto: (node: MeshNode) => void
  weigh: (node: MeshNode) => void
  spray: (args: IDeviceRobotPlayHtmlTemplateSprayEventArgs) => void
  compaction: (args: {
    start: MeshNode
    end: MeshNode
    args: IDeviceRobotPlayHtmlTemplateCompactionEventArgs
  }) => void
  changeto: (store: MeshNode, drop: MeshNode) => void
  modechange(move: boolean): void
}
export interface DeviceRobotPlayEChartEvent {
  nodeselect(data: MeshNode): void
  edgeselect(data: MeshEdge): void
}
