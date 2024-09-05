import { IOState } from '../../../enums/io/io-state.enum'
import { CanType } from '../../../enums/robot/robot-can-type.model'
import { IIdModel } from '../../model.interface'
import { Polygon } from '../polygon.model'

/**	DropPortConfig (投放口垃圾桶配置信息)	*/
export class DropPortConfig implements IIdModel<number> {
  /**	Int32	投放口ID，从1开始	M	*/
  Id!: number
  /**	String	投放口名称	O	*/
  Name?: string
  /**	Int32	通道ID，从1开始	M	*/
  ChannelId!: number
  /**
   *  String
   * 	对应的分析数据源ID
   *  Source对应的结构见3.1.78
   * 	O
   **/
  AnalysisSourceId?: string
  /**	Polygon	投放口垃圾桶位置，图像上的归一化坐标。	M	*/
  TrashCanArea!: Polygon
  /**	Boolean	开启、关闭投口联动	M	*/
  AlarmOutEnabled!: boolean
  /**	String	默认IO输出状态	M	*/
  DefaultIOState!: IOState
  /**	String	满溢时IO输出状态	M	*/
  FullIOState!: IOState
  /**	Int32[]	联动继电器输出编号，编号从1开始	O	*/
  AlarmOutIds?: number[]
  /**	String	投口类型	M	*/
  DropPortType!: CanType
  /**	String	投口状态	O	*/
  DropPortState?: string
  /**	String	投口垃圾桶状态	O	*/
  TrashCanPortState?: string
  /**	String[]	IO联动成FullIOState垃圾桶状态项列表	M	*/
  FullTrashCanPortStates!: string[]
}
