import { Type } from 'class-transformer'
import 'reflect-metadata'
import { IModel } from '../../model.interface'
import { ICapability } from '../capability.interface'
import { EnumNameValue } from '../enum-name-value.model'
/**	DepolymentCapability (代理输入通道能力)	*/
export class DepolymentCapability
  implements IModel, ICapability<boolean | EnumNameValue[] | undefined>
{
  [key: string]: boolean | EnumNameValue[] | undefined
  /**	Boolean	垃圾分类服务器是否支持	M	*/
  GarbageServer!: boolean
  /**	Boolean	ISUP服务器是否支持	M	*/
  ISUPServer!: boolean
  /**	Boolean	AI模型是否支持	M	*/
  AIModel!: boolean
  /**	EnumValue[]	AI任务类型	O	*/
  @Type(() => EnumNameValue)
  AITaskTypes?: EnumNameValue[]
  /**	EnumValue[]	事件类型	O	*/
  @Type(() => EnumNameValue)
  EventTypes?: EnumNameValue[]
  /**	EnumValue[]	AI事件触发类型	O	*/
  @Type(() => EnumNameValue)
  AITriggerTypes?: EnumNameValue[]
  /**	EnumValue[]	数值判断条件	O	*/
  @Type(() => EnumNameValue)
  NumberJudgeCondition?: EnumNameValue[]
  /**	EnumValue[]	关联目标判断条件	O	*/
  @Type(() => EnumNameValue)
  AssociationJudgeCondition?: EnumNameValue[]
}
