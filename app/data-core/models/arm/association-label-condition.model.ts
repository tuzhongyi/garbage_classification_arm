import { AssociationJudgeCondition } from '../../enums/association-judge-condition.enum'
import { IModel } from '../model.interface'

/**	AssociationLabelCondition (关联标签过滤条件)	*/
export class AssociationLabelCondition implements IModel {
  /**	String	标签ID(检测标签)	M	*/
  LabelId!: string
  /**	String	标签数值(检测标签)	M	*/
  LabelValue!: string
  /**	String	标签名称	O	*/
  LabelName?: string
  /**	Int32	目标置信度，0-100，默认：0	M	*/
  Confidence!: number
  /**
   * String	目标关联判断条件
   * AssociationJudgeCondition
   * Inside：在关联目标内部
   * Outside：在关联目标外部
   * M
   **/
  JudgeCondition!: AssociationJudgeCondition
  /**	Int32	在关联目标内部、外部面积占比[0-100]	O	*/
  Ratio?: number
  /**	Int32	分组ID，如果分组ID相同的，则必须多分类数值同时出现满足要求才触发事件，否则任意一个出现满足即可触发。	O	*/
  GroupId?: number
}
