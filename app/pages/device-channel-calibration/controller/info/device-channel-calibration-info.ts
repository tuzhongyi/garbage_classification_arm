import { CalibrationAreaType } from '../../../../data-core/enums/calibration_area_type.enum'
import { MeshNodeType } from '../../../../data-core/enums/robot/mesh-node-type.model'
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

  loadAreaType(isdrop: boolean) {
    if (isdrop) {
      this.html.details.info.loadAreaType([CalibrationAreaType.DropPort])
    } else {
      this.html.details.info.loadAreaType([
        CalibrationAreaType.StorePort,
        CalibrationAreaType.Ground,
      ])
    }
  }
  loadChannelCalibration(
    robotId: string,
    isdrop: boolean,
    data: ChannelCalibrationPoint | ChannelCalibrationArea
  ) {
    let nodetypes: MeshNodeType[] = []
    if (data instanceof ChannelCalibrationPoint) {
      nodetypes = [MeshNodeType.ChargingPort, MeshNodeType.StorePort]
      this.loadPoint(data)
    } else if (data instanceof ChannelCalibrationArea) {
      nodetypes = isdrop ? [MeshNodeType.DropPort] : [MeshNodeType.StorePort]
      this.loadArea(data)
    }
    this.html.details.chart.reload()
    this.business.robot.nodes(robotId, nodetypes).then((nodes) => {
      this.html.details.info.loadNode(nodes, !isdrop)
      this.html.details.info.load(data)
    })
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
