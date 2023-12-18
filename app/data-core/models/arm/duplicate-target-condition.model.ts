import { IModel } from '../model.interface'

/**	DuplicateTargetCondition (目标去重过滤条件)	*/
export class DuplicateTargetCondition implements IModel {
  /**	Boolean	是否启用条件	M	*/
  Enabled!: boolean
  /**	Int32	重叠比例[20-100]	O	*/
  OverlapRatio?: number
}
