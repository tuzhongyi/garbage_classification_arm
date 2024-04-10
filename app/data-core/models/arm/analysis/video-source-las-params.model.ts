import { IModel } from '../../model.interface'
import { Polygon } from '../polygon.model'

/**	VideoSourceIasParams (视频数据来源的分析参数)	*/
export class VideoSourceIasParams implements IModel {
  /**	String	唯一ID	M	*/
  Id!: string
  /**	Double	分析帧率(保留，暂时不使用)	O	*/
  FPS?: number
  /**	Polygon	分析区域	O	*/
  Region?: Polygon
}
