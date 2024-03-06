import { Polygon } from '../../../../data-core/models/arm/polygon.model'
import { MeshNodePosition } from '../../../../data-core/models/robot/mesh-node-position.model'
import { DeviceChannelCalibrationBusiness } from '../../business/device-channel-calibration.business'
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
    this.html.details.chart.event.on('createPoint', (position) => {
      this.createPoint(position)
    })
    this.html.details.chart.event.on('createPolygon', (polygon) => {
      this.createPolygon(polygon)
    })
    this.html.details.chart.event.on('clear', () => {
      this.model.data.Areas = []
      this.model.data.Points = []
      this.clear()
    })
  }

  private clear() {
    this.html.details.table.clear()
  }

  private createPoint(position: MeshNodePosition) {
    if (!this.model.data.Points) {
      this.model.data.Points = []
    }
    let id = this.model.data.Points!.length + 1
    let type = this.html.properties.areaType.get()
    let point = Creater.Point(id, type, position)
    this.model.data.Points.push(point)

    this.html.details.chart.load(
      this.model.data.Resolution,
      this.model.data.Areas?.map((x) => x.Polygon),
      this.model.data.Points?.map((x) => x.Coordinate)
    )
    this.html.details.table.load(
      this.model.data.Areas,
      this.model.data.Points,
      this.model.data.Resolution
    )
    this.html.details.table.select(CalibrationMode.point, id)
  }
  private createPolygon(polygon: Polygon) {
    if (!this.model.data.Areas) {
      this.model.data.Areas = []
    }
    let id = this.model.data.Areas!.length + 1
    let type = this.html.properties.areaType.get()
    let area = Creater.Area(id, type, polygon)
    this.model.data.Areas.push(area)

    this.html.details.chart.load(
      this.model.data.Resolution,
      this.model.data.Areas?.map((x) => x.Polygon),
      this.model.data.Points?.map((x) => x.Coordinate)
    )
    this.html.details.table.load(
      this.model.data.Areas,
      this.model.data.Points,
      this.model.data.Resolution
    )
    this.html.details.table.select(CalibrationMode.polygon, id)
  }
}
