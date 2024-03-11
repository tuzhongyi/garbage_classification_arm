import { CalibrationAreaType } from '../../data-core/enums/calibration_area_type.enum'
import { ChannelCalibrationArea } from '../../data-core/models/arm/analysis/channel-calibration-area.model'
import { ChannelCalibrationPoint } from '../../data-core/models/arm/analysis/channel-calibration-point.model'
import { Resolution } from '../../data-core/models/arm/analysis/resolution.model'
import { ChannelCalibration } from '../../data-core/models/arm/channel-calibration.model'
import { Point } from '../../data-core/models/arm/point.model'
import { Polygon } from '../../data-core/models/arm/polygon.model'
import { MeshNodePosition } from '../../data-core/models/robot/mesh-node-position.model'

export class DeviceChannelCalibrationCreater {
  static Area(id: number, type: CalibrationAreaType, polygon: Polygon) {
    let area = new ChannelCalibrationArea()
    area.AreaType = type
    area.No = id
    area.Polygon = polygon
    area.Name = `${this.language(area.AreaType, false)}-${id}`
    return area
  }

  private static language(type: CalibrationAreaType, ispoint = false) {
    switch (type) {
      case CalibrationAreaType.DropPort:
        return '投放口'
      case CalibrationAreaType.StorePort:
        return `存桶${ispoint ? '口' : '区'}`
      case CalibrationAreaType.Ground:
        return '地面区域'

      default:
        return '未知'
    }
  }

  static Point(
    id: number,
    type: CalibrationAreaType,
    position: MeshNodePosition
  ) {
    let point = new ChannelCalibrationPoint()
    point.Coordinate = new Point()
    point.Coordinate.X = position.X
    point.Coordinate.Y = position.Y
    point.No = id
    point.Name = `${this.language(type, true)}-${point.No}`
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
