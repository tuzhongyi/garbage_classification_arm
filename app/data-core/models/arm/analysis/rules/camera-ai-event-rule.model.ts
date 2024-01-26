import { IModel } from '../../../model.interface'
import { DropWarningRule } from './drop-warning-rule.model'
import { GarbageDropRule } from './garbage-drop-rule.model'
import { IllegalDropRule } from './illegal-drop-rule.model'
import { MixedIntoRule } from './mixed-into-rule.model'

/**	CameraAIEventRule (摄像机AI事件分析规则)	*/
export class CameraAIEventRule implements IModel {
  /**	String	规则ID	M	*/
  RuleId!: string
  /**	String	规则名称	M	*/
  RuleName!: string
  /**	Int32	事件类型(唯一)	M	*/
  EventType!: number
  /**	Int32	通道ID（代理通道）	M	*/
  ChannelId!: number
  /**	String	通道名称	O	*/
  ChannelName?: string
  /**	String	模型数据ID	M	*/
  ModelId!: string
  /**	String	模型名称	O	*/
  ModelName?: string
  /**	JObject	模型规则	O	*/
  ModelRule?:
    | MixedIntoRule
    | DropWarningRule
    | IllegalDropRule
    | GarbageDropRule
}
