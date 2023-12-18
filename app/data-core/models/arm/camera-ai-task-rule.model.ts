import { AITriggerType } from '../../enums/ai-trigger-type.enum'
import { IModel } from '../model.interface'
import { AssociationLabelCondition } from './association-label-condition.model'
import { AttributeTargetCondition } from './attribute-target-condition.model'
import { DuplicateTargetCondition } from './duplicate-target-condition.model'
import { NumberCondition } from './number-condition.model'
import { RegionTargetCondition } from './region-target-condition.model'
import { TargetCondition } from './target-condition.model'
import { TargetSizeCondition } from './target-size-condition.model'

/**	CameraAITaskRule (AI任务规则)	*/
export class CameraAITaskRule implements IModel {
  /**	String	规则ID	M	*/
  RuleId!: string
  /**	String	规则名称	M	*/
  RuleName!: string
  /**	String	通道ID（代理通道）	M	*/
  ChannelId!: string
  /**	String	通道名称	O	*/
  ChannelName?: string
  /**	String	标签ID(检测标签)	M	*/
  LabelId!: string
  /**	String	标签数值(检测标签)	M	*/
  LabelValue!: string
  /**	String	标签名称	O	*/
  LabelName?: string
  /**
   * String	触发类型，
   * AreaTargetDetect：区域目标检测
   * AreaTargetCountDetect：区域目标计数
   * M
   **/
  TriggerType!: AITriggerType
  /**	NumberCondition	数量过滤条件（区域目标计数）	O	*/
  NumberCondition?: NumberCondition
  /**	TargetCondition	目标基础过滤条件	O	*/
  TargetCondition?: TargetCondition
  /**	TargetSizeCondition	目标大小过滤条件	O	*/
  TargetSizeCondition?: TargetSizeCondition
  /**	DuplicateTargetCondition	目标去重过滤条件	O	*/
  DuplicateCondition?: DuplicateTargetCondition
  /**	RegionTargetCondition	目标区域过滤条件	O	*/
  RegionCondition?: RegionTargetCondition
  /**	AttributeTargetCondition[]	目标分类标签过滤条件列表	O	*/
  AttributeConditions?: AttributeTargetCondition[]
  /**	AssociationLabelCondition[]	关联目标过滤条件	O	*/
  AssociationLabelConditions?: AssociationLabelCondition[]
}
