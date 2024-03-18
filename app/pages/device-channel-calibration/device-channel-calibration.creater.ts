import { CalibrationAreaType } from '../../data-core/enums/calibration_area_type.enum'
import { ChannelCalibrationArea } from '../../data-core/models/arm/analysis/channel-calibration-area.model'
import { ChannelCalibrationPoint } from '../../data-core/models/arm/analysis/channel-calibration-point.model'
import { Resolution } from '../../data-core/models/arm/analysis/resolution.model'
import { ChannelCalibration } from '../../data-core/models/arm/channel-calibration.model'
import { Point } from '../../data-core/models/arm/point.model'
import { Polygon } from '../../data-core/models/arm/polygon.model'
import { MeshNodePosition } from '../../data-core/models/robot/mesh-node-position.model'

export class DeviceChannelCalibrationCreater {
  static Area(id: number, polygon: Polygon) {
    let area = new ChannelCalibrationArea()
    area.AreaType = CalibrationAreaType.StorePort
    area.No = id
    area.Polygon = polygon
    area.Name = `区域-${id}`
    return area
  }

  static Point(id: number, position: MeshNodePosition) {
    let point = new ChannelCalibrationPoint()
    point.Coordinate = new Point()
    point.Coordinate.X = position.X
    point.Coordinate.Y = position.Y
    point.No = id
    point.Name = `点位-${point.No}`
    point.NodePosition = new MeshNodePosition()
    point.NodePosition.X = 0
    point.NodePosition.Y = 0

    return point
  }

  static Calibration(resolution?: Resolution) {
    let calibration = new ChannelCalibration()
    if (resolution) {
      calibration.Resolution = resolution
    }

    return calibration
  }
}
