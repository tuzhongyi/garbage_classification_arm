import { NumberJudgeCondition } from '../../enums/number-judge-condition.enum'
import { IModel } from '../model.interface'

/**	NumberCondition (数量过滤条件)	*/
export class NumberCondition implements IModel {
  /**	Boolean	是否启用数量条件	M	*/
  Enabled!: boolean
  /**	Int32	最大目标数量	O	*/
  MaxTargetNumber?: number
  /**	Int32	最小目标数量	O	*/
  MinTargetNumber?: number
  /**
   * String	数量判断条件
   * NumberJudgeCondition
   * GreaterThan：大于
   * LessThan：小于
   * Between：介于最大值和最小值之间
   * O
   **/
  JudgeCondition?: NumberJudgeCondition
  /**	Int32	数量计数判断间隔(单位：秒)	O	*/
  CountInterval?: number
}
