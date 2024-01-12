import { IModel } from '../../model.interface'
import { EnumNameValue } from '../enum-name-value.model'

/**	TrashCanCapability (垃圾桶能力)	*/
export class TrashCanCapability implements IModel {
  /**	EnumNameValue[]	桶类型	O	*/
  CanTypes?: EnumNameValue[]
  /**	EnumNameValue[]	桶盖状态	O	*/
  CoverStates?: EnumNameValue[]
  /**	Boolean	运行状态	M	*/
  RunningStatus!: boolean
  /**	EnumNameValue[]	进程状态	O	*/
  ProcessStates?: EnumNameValue[]
}
