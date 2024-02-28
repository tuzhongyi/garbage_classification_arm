import { MeshNodeType } from '../../data-core/enums/robot/mesh-node-type.model'
import { CanType } from '../../data-core/enums/robot/robot-can-type.model'
import { MeshNode } from '../../data-core/models/robot/mesh-node.model'

export interface DeviceRobotCalibrationEvent {
  start: () => void
  stop: () => void
  top: () => void
  down: () => void
  left(): void
  right(): void
  clear(): void
}

export interface DeviceRobotTableEvent {
  select(id: string): void
}

export interface DeviceRobotCalibrationEChartEvent {
  select(data: MeshNode): void
}

export interface DeviceRobotCalibrationDetailsEvent {
  nodetypechange(type: MeshNodeType): void
  cantypechange(type?: CanType): void
  nodexchange(): void
  nodeychange(): void
  distancechange(): void
  save(): void
}
