import { IModel } from '../model.interface'

/**	AttributeTargetCondition (目标属性标签过滤条件)	*/
export class AttributeTargetCondition implements IModel {
  /**	String	标签ID(分类标签)	M	*/
  LabelId!: string
  /**	String	标签数值/分类类型 (分类标签)	M	*/
  LabelValue!: string
  /**	String	标签名称，例如：颜色	O	*/
  LabelName?: string
  /**	String	分类数值	M	*/
  EnumValue!: string
  /**	String	分类数值名称，例如：红色	O	*/
  EnumName?: string
  /**	Int32	分类置信度，0-100	M	*/
  Confidence!: number
  /**	Int32	分组ID，如果分组ID相同的，则必须多分类数值同时出现满足要求才触发事件，否则任意一个出现满足即可触发。	O	*/
  GroupId?: number
}
