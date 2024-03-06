import { CalibrationAreaType } from '../../data-core/enums/calibration_area_type.enum'
import { LensType } from '../../data-core/enums/lens-type.enum'
import { MeshNode } from '../../data-core/models/robot/mesh-node.model'

export interface DeviceChannelCalibrationEvent {
  save(): void
  selectRobot(id: string): void
  selectChannel(id: number): void
  selectAreaType(type: CalibrationAreaType): void
  selectLensType(type: LensType): void
}

export interface DeviceChannelCalibrationInfoEvent {
  selectNode(node?: MeshNode): void
}
