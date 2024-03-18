import { CalibrationAreaType } from '../../../../data-core/enums/calibration_area_type.enum'
import { ChannelCalibrationArea } from '../../../../data-core/models/arm/analysis/channel-calibration-area.model'
import { ChannelCalibrationPoint } from '../../../../data-core/models/arm/analysis/channel-calibration-point.model'
import { DeviceChannelCalibrationBusiness } from '../../business/device-channel-calibration.business'
import { DeviceChannelCalibrationConverter as Converter } from '../../device-channel-calibration.converter'
import { DeviceChannelCalibrationHtmlController } from '../../device-channel-calibration.html.controller'
import { DeviceChannelCalibrationModel } from '../../device-channel-calibration.model'
export class DeviceChannelCalibrationInfo {
  constructor(
    private html: DeviceChannelCalibrationHtmlController,
    private getModel: () => DeviceChannelCalibrationModel,

    private business: DeviceChannelCalibrationBusiness
  ) {
    this.regist()
  }

  get model() {
    return this.getModel()
  }

  private regist() {
    this.html.details.info.event.on('selectNode', (node) => {})
  }

  loadAreaType() {
    this.html.details.info.loadAreaType([
      CalibrationAreaType.DropPort,
      CalibrationAreaType.StorePort,
      CalibrationAreaType.Ground,
    ])
  }
  loadChannelCalibration(
    data: ChannelCalibrationPoint | ChannelCalibrationArea
  ) {
    if (data instanceof ChannelCalibrationPoint) {
      this.loadPoint(data)
    } else if (data instanceof ChannelCalibrationArea) {
      this.loadArea(data)
    }
    this.html.details.info.load(data)
  }

  private loadPoint(data: ChannelCalibrationPoint) {
    let _point = Converter.point.to(this.model.data.Resolution, data.Coordinate)
    this.html.details.chart.selectPoint({
      point: data.Coordinate,
      text: `(${_point.X},${_point.Y})`,
    })
  }
  private loadArea(data: ChannelCalibrationArea) {
    this.html.details.chart.selectPolygon(data.Polygon)
  }
}
