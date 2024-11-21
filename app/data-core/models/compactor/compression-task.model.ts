import { IIdModel } from '../model.interface'

/**	CompressionTask (垃圾压缩设备压缩任务状态)	*/
export class CompressionTask implements IIdModel {
  /**	String	任务ID	M	*/
  Id!: string
  /**
   * Int32
   * 压缩的距离，单位：毫米
   * 检测器离压缩板的距离
   * O
   **/
  Distance?: number
  /**	Double	压缩反向的重量，单位：公斤	O	*/
  Pressure?: number
  /**	Int32	最大距离，单位：毫秒	O	*/
  MaxDistance?: number
  /**	Int32	最大反向的重量，单位：公斤	O	*/
  MaxPressure?: number
  /**	Boolean	是否已完成	O	*/
  Finished?: boolean
}
