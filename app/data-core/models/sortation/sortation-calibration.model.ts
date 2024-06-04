import { Rectangle } from '../arm/rectangle.model'
import { IModel } from '../model.interface'

/**	SortationCalibration (分拣标定信息)	*/
export class SortationCalibration implements IModel {
  /**	Int32	代理通道编号	M	*/
  ChannelId!: number
  /**	String	代理通道名称	M	*/
  ChannelName!: string
  /**	Boolean	是否启用	M	*/
  Enabled!: boolean
  /**	Rectangle	分拣操作台区域，（归一化坐标）	M	*/
  ConsoleArea!: Rectangle
  /**	String	分拣操作台旋转角度（相对于视频），必须保证操作台正对投口的左上角第一个是A1格子。	M	*/
  Rotation!: string
  /**	Int32	操作台区域分割行数，默认：8，一共8x8=64格，最小4行，最大16行	M	*/
  Rows!: number
  /**	Int32	操作台区域分割列数，默认：8，一共8x8=64格，最小4行，最大16行	M	*/
  Columns!: number
  /**	Int32	关门后的光圈延迟调节时长，单位：毫秒，默认：2000	M	*/
  ApertureDelay!: number
  /**	Int32	分拣完成确认时长，单位：毫秒，默认：2000	M	*/
  CompletedDelay!: number
  /**	Int32[]	控制台目标标签数值列表	O	*/
  ConsoleLabels?: number[]
  /**	Int32[]	分拣目标标签数值列表	O	*/
  SortationLabels?: number[]
  /**	String	分拣设备ID，来自2.4.4.1。注意如果没有关联设备，设备将只做分拣识别演算，不进行操作。	M	*/
  DeviceId!: string
  /**	String	分拣设备名称	M	*/
  DeviceName!: string
}
