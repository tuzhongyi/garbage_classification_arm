import { CalibrationAreaType } from '../../../../data-core/enums/calibration_area_type.enum'
import { ChannelCalibrationArea } from '../../../../data-core/models/arm/analysis/channel-calibration-area.model'
import { ChannelCalibrationPoint } from '../../../../data-core/models/arm/analysis/channel-calibration-point.model'
import { DeviceChannelCalibrationBusiness } from '../../business/device-channel-calibration.business'
import { DeviceChannelCalibrationHtmlController } from '../../device-channel-calibration.html.controller'
import { DeviceChannelCalibrationModel } from '../../device-channel-calibration.model'
import { DeviceChannelCalibrationInfo } from '../info/device-channel-calibration-info'
import { DeviceChannelCalibrationTableEvent } from './device-channel-calibration-table.controller'

export class DeviceChannelCalibrationTable
  implements DeviceChannelCalibrationTableEvent
{
  constructor(
    private html: DeviceChannelCalibrationHtmlController,
    private getModel: () => DeviceChannelCalibrationModel,
    private business: DeviceChannelCalibrationBusiness,
    private info: DeviceChannelCalibrationInfo
  ) {
    this.regist()
  }

  get model() {
    return this.getModel()
  }

  private regist() {
    this.html.details.table.event.on('select', this.select.bind(this))
    this.html.details.table.event.on('remove', this.remove.bind(this))
  }

  select(data: ChannelCalibrationPoint | ChannelCalibrationArea): void {
    let robotId = this.model.data.RobotId
    let type = this.html.properties.areaType.get()
    let isdrop = type === CalibrationAreaType.DropPort

    this.info.loadAreaType(isdrop)
    this.info.loadChannelCalibration(robotId, isdrop, data)
  }
  remove(data: ChannelCalibrationPoint | ChannelCalibrationArea): void {
    {
      let index = -1
      if (data instanceof ChannelCalibrationPoint && this.model.data.Points) {
        index = this.model.data.Points.findIndex((item) => item.No === data.No)
        this.model.data.Points.splice(index, 1)
      }
      if (data instanceof ChannelCalibrationArea && this.model.data.Areas) {
        index = this.model.data.Areas.findIndex((item) => item.No === data.No)
        this.model.data.Areas.splice(index, 1)
      }

      if (index >= 0) {
        this.html.details.chart.load(
          this.model.data.Resolution,
          this.model.data.Areas?.map((x) => x.Polygon),
          this.model.data.Points?.map((x) => x.Coordinate)
        )
      }
    }
  }
}
