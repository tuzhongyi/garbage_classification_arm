import { IModel } from '../../model.interface'
import { EnumNameValue } from '../enum-name-value.model'

/**	DepolymentCapability (代理输入通道能力)	*/
export class DepolymentCapability implements IModel {
  /**	Boolean	垃圾分类服务器是否支持	M	*/
  GarbageServer!: boolean
  /**	Boolean	ISUP服务器是否支持	M	*/
  ISUPServer!: boolean
  /**	Boolean	AI模型是否支持	M	*/
  AIModel!: boolean
  /**	EnumValue[]	AI任务类型	O	*/
  AITaskTypes?: EnumNameValue[]
  /**	EnumValue[]	事件类型	O	*/
  EventTypes?: EnumNameValue[]
  /**	EnumValue[]	AI事件触发类型	O	*/
  AITriggerTypes?: EnumNameValue[]
  /**	EnumValue[]	数值判断条件	O	*/
  NumberJudgeCondition?: EnumNameValue[]
  /**	EnumValue[]	关联目标判断条件	O	*/
  AssociationJudgeCondition?: EnumNameValue[]
}
