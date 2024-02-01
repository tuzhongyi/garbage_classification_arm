import { Type } from 'class-transformer'
import 'reflect-metadata'
import { CalibrationAreaType } from '../../../enums/calibration_area_type.enum'
import { INameModel } from '../../model.interface'
import { Polygon } from '../polygon.model'

/**	ChannelCalibrationArea (标定区域)	*/
export class ChannelCalibrationArea implements INameModel {
  /**	Int32	编号，从1开始	M	*/
  No!: number
  /**	String	存桶区名称	M	*/
  Name!: string
  /**	Polygon	标定区域多边形，图像上的归一化坐标。	M	*/
  @Type(() => Polygon)
  Polygon!: Polygon
  /**	String	对应MeshNode的节点ID	O	*/
  NodeId?: string
  /**	String	区域类型	M	*/
  AreaType!: CalibrationAreaType
}
