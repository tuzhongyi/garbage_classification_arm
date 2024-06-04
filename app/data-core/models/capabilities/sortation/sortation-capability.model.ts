import { IModel } from '../../model.interface'
import { EnumNameValue } from '../enum-name-value.model'

/**	SortationCapability (分拣能力)	*/
export class SortationCapability implements IModel {
  /**	Boolean	是否支持分拣	M	*/
  Supported!: boolean
  /**	Boolean	搜索分拣设备是否支持	M	*/
  Searching!: boolean
  /**	EnumNameValue[]	分拣操作台旋转角度	O	*/
  Rotations?: EnumNameValue[]
  /**	EnumNameValue[]	分拣命令列表	O	*/
  CommandTypes?: EnumNameValue[]
}
