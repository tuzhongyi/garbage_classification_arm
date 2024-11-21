import { IModel } from '../model.interface'

/**	CompactorParams (垃圾压缩设备参数)	*/
export class CompactorParams implements IModel {
  /**
   * Int32
   * 初始距离，单位：毫米
   * 检测器离压缩板的距离
   * M
   **/
  InitialDistance!: number
  /**
   * Int32
   * 悬空距离，单位：毫米
   * 压缩板离垃圾桶口的记录
   * M
   **/
  HangingDistance!: number
  /**
   * Double
   * 下压重量，单位：公斤
   * [10-50]，精度小数点后两位
   * M
   **/
  Pressure!: number
  /**
   * Int32
   * 压缩距离，单位：毫米
   * 垃圾压缩的最大距离。
   * M
   **/
  PressureDistance!: number
  /**
   * Int32
   * 水平距离：单位：毫米
   * 桶与墙面或水平检测器的最大距离，小于水平距离则表示有垃圾桶放在压缩设备前面。
   * M
   **/
  HorizontalDistance!: number
  /**
   * Int32
   * 可再利用距离，单位：毫米
   * 可再利用的桶的最小压缩距离
   * M
   **/
  ReusedDistance!: number
  /**	Boolean	是否可以压缩，一般情况下有垃圾桶才可以压缩。	O	*/
  CanPressed?: boolean
}
