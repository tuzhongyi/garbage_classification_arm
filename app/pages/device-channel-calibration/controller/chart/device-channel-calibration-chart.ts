import { ChannelCalibrationArea } from '../../../../data-core/models/arm/analysis/channel-calibration-area.model'
import { ChannelCalibrationPoint } from '../../../../data-core/models/arm/analysis/channel-calibration-point.model'
import { Polygon } from '../../../../data-core/models/arm/polygon.model'
import { MeshNodePosition } from '../../../../data-core/models/robot/mesh-node-position.model'
import { DeviceChannelCalibrationBusiness } from '../../business/device-channel-calibration.business'
import { DeviceChannelCalibrationConverter as Converter } from '../../device-channel-calibration.converter'
import { DeviceChannelCalibrationCreater as Creater } from '../../device-channel-calibration.creater'
import { DeviceChannelCalibrationHtmlController } from '../../device-channel-calibration.html.controller'
import {
  DeviceChannelCalibrationMode as CalibrationMode,
  DeviceChannelCalibrationModel,
} from '../../device-channel-calibration.model'

export class DeviceChannelCalibrationChart {
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
    this.html.details.chart.event.on('createPoint', this.createPoint.bind(this))
    this.html.details.chart.event.on(
      'createPolygon',
      this.createPolygon.bind(this)
    )
    this.html.details.chart.event.on('clear', this.clear.bind(this))
  }

  private clear() {
    this.model.data.Areas = []
    this.model.data.Points = []
    this.html.details.table.clear()
  }

  private createPoint(position: MeshNodePosition) {
    if (!this.model.data.Points) {
      this.model.data.Points = []
    }
    let id = this.model.data.Points!.length + 1

    let point = Creater.Point(id, position)
    this.model.data.Points.push(point)

    this.html.loadDetails(this.model.data)
    this.html.details.table.select(CalibrationMode.point, id)
  }
  private createPolygon(polygon: Polygon) {
    if (!this.model.data.Areas) {
      this.model.data.Areas = []
    }
    let id = this.model.data.Areas!.length + 1
    let area = Creater.Area(id, polygon)
    this.model.data.Areas.push(area)

    this.html.loadDetails(this.model.data)
    this.html.details.table.select(CalibrationMode.polygon, id)
  }

  select(data: ChannelCalibrationPoint | ChannelCalibrationArea) {
    if (data instanceof ChannelCalibrationPoint) {
      let point = Converter.point.to(
        this.model.data.Resolution,
        data.Coordinate
      )
      this.html.details.chart.selectPoint({
        point: data.Coordinate,
        text: `(${point.X}, ${point.Y})`,
      })
    } else if (data instanceof ChannelCalibrationArea) {
      this.html.details.chart.selectPolygon(data.Polygon)
    }
    this.html.details.chart.reload()
  }
}
