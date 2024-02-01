import { ChannelCalibration } from '../../data-core/models/arm/channel-calibration.model'
import { InputProxyChannel } from '../../data-core/models/arm/input-proxy-channel.model'
import { Robot } from '../../data-core/models/robot/robot.model'

export class DeviceChannelCalibrationModel {
  robots: Robot[] = []
  channels: InputProxyChannel[] = []

  data: ChannelCalibration = new ChannelCalibration()
}

export enum DeviceChannelCalibrationMode {
  point,
  polygon,
}

export class Selection<T> {
  selected: boolean = false
  data!: T
}
