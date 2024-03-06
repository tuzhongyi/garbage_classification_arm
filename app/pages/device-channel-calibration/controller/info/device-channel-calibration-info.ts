import { DeviceChannelCalibrationBusiness } from '../../business/device-channel-calibration.business'
import { DeviceChannelCalibrationHtmlController } from '../../device-channel-calibration.html.controller'
import { DeviceChannelCalibrationModel } from '../../device-channel-calibration.model'

export class DeviceChannelCalibrationInfo {
  constructor(
    private html: DeviceChannelCalibrationHtmlController,
    private business: DeviceChannelCalibrationBusiness,
    private getModel: () => DeviceChannelCalibrationModel
  ) {
    this.regist()
  }

  get model() {
    return this.getModel()
  }

  private regist() {
    this.html.details.info.event.on('selectNode', (node) => {})
  }
}
