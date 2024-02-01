import { Type } from 'class-transformer'
import 'reflect-metadata'
import { IModel } from '../model.interface'
import { ChannelCalibrationArea } from './analysis/channel-calibration-area.model'
import { ChannelCalibrationPoint } from './analysis/channel-calibration-point.model'
import { Resolution } from './analysis/resolution.model'

/**	ChannelCalibration (代理通道网状标定信息)	*/
export class ChannelCalibration implements IModel {
  /**	Int32	通道ID，从1开始	M	*/
  ChannelId!: number
  /**	String	参照坐标系机器人ID	M	*/
  RobotId!: string
  /**	String	机器人名称	O	*/
  RobotName?: string
  /**	String	镜头类型	M	*/
  LensType!: string
  /**	Resolution	分辨率，拉取主码流图片后自动填入。	M	*/
  Resolution!: Resolution
  /**	ChannelCalibrationArea[]	存桶区区域位置列表	O	*/
  @Type(() => ChannelCalibrationArea)
  Areas?: ChannelCalibrationArea[]
  /**	ChannelCalibrationPoint[]	坐标转换标定的点信息列表	O	*/
  @Type(() => ChannelCalibrationPoint)
  Points?: ChannelCalibrationPoint[]
  /**	String	对应的分析数据源ID，Source对应的结构见3.1.78	O	*/
  AnalysisSourceId?: string
  /**	String	数据源名称	O	*/
  AnalysisSourceName?: string
}
