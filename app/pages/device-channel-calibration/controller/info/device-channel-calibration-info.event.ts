import { ChannelCalibrationArea } from '../../../../data-core/models/arm/analysis/channel-calibration-area.model'
import { ChannelCalibrationPoint } from '../../../../data-core/models/arm/analysis/channel-calibration-point.model'
import { MeshNode } from '../../../../data-core/models/robot/mesh-node.model'

export interface DeviceChannelCalibrationInfoEvent {
  selectNode(node?: MeshNode): void
  change(data: ChannelCalibrationPoint | ChannelCalibrationArea): void
}
