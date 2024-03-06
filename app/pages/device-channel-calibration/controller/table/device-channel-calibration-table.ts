import { CalibrationAreaType } from '../../../../data-core/enums/calibration_area_type.enum'
import { ChannelCalibrationArea } from '../../../../data-core/models/arm/analysis/channel-calibration-area.model'
import { ChannelCalibrationPoint } from '../../../../data-core/models/arm/analysis/channel-calibration-point.model'
import { DeviceChannelCalibrationBusiness } from '../../business/device-channel-calibration.business'
import { DeviceChannelCalibrationConverter as Converter } from '../../device-channel-calibration.converter'
import { DeviceChannelCalibrationHtmlController } from '../../device-channel-calibration.html.controller'
import { DeviceChannelCalibrationModel } from '../../device-channel-calibration.model'

export class DeviceChannelCalibrationTable {
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

  regist() {
    this.html.details.table.event.on('select', (data) => {
      let robotId = this.model.data.RobotId
      let type = this.html.properties.areaType.get()
      let isdrop = type === CalibrationAreaType.DropPort
      if (isdrop) {
        this.html.details.info.loadAreaType([CalibrationAreaType.DropPort])
      } else {
        this.html.details.info.loadAreaType([
          CalibrationAreaType.StorePort,
          CalibrationAreaType.Ground,
        ])
      }

      this.business.robot.nodes(robotId, isdrop).then((nodes) => {
        this.html.details.info.loadNode(nodes, !isdrop)
        this.html.details.info.load(data)
      })

      if (data instanceof ChannelCalibrationPoint) {
        let _point = Converter.point.to(
          this.model.data.Resolution,
          data.Coordinate
        )
        this.html.details.chart.selectPoint({
          point: data.Coordinate,
          text: `(${_point.X},${_point.Y})`,
        })
        this.html.details.chart.reload()
      } else if (data instanceof ChannelCalibrationArea) {
        this.html.details.chart.selectPolygon(data.Polygon)
        this.html.details.chart.reload()
      }
    })
    this.html.details.table.event.on('remove', (data) => {
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
    })
  }
}
