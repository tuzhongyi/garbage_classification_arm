import { Language } from '../../common/language'
import { CalibrationAreaType } from '../../data-core/enums/calibration_area_type.enum'
import { ChannelCalibrationArea } from '../../data-core/models/arm/analysis/channel-calibration-area.model'
import { ChannelCalibrationPoint } from '../../data-core/models/arm/analysis/channel-calibration-point.model'
import { Point } from '../../data-core/models/arm/point.model'
import { Polygon } from '../../data-core/models/arm/polygon.model'
import { MeshNodePosition } from '../../data-core/models/robot/mesh-node-position.model'

export class DeviceChannelCalibrationCreater {
  static Area(id: number, type: CalibrationAreaType, polygon: Polygon) {
    let area = new ChannelCalibrationArea()
    area.AreaType = type
    area.No = id
    area.Polygon = polygon
    area.Name = `${Language.CalibrationAreaType(area.AreaType)}-${id}`
    return area
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
    point.Name = `${Language.CalibrationAreaType(type)}-${point.No}`
    point.NodePosition = new MeshNodePosition()
    point.NodePosition.X = 0
    point.NodePosition.Y = 0

    return point
  }
}
