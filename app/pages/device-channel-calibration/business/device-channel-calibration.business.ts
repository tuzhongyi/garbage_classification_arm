import { DeviceChannelCalibrationModel } from '../device-channel-calibration.model'
import { DeviceChannelCalibrationChannelBusiness } from './device-channel-calibration-channel.business'
import { DeviceChannelCalibrationRobotBusiness } from './device-channel-calibration-robot.business'

export class DeviceChannelCalibrationBusiness {
  channel = new DeviceChannelCalibrationChannelBusiness()
  robot = new DeviceChannelCalibrationRobotBusiness()

  async source() {
    let model = new DeviceChannelCalibrationModel()
    model.robots = await this.robot.load()
    model.channels = await this.channel.load()
    return model
  }
}
