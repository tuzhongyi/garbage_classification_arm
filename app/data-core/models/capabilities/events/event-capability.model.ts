import { Type } from 'class-transformer'
import 'reflect-metadata'
import { IModel } from '../../model.interface'
import { ICapability } from '../capability.interface'
import { EnumNameValue } from '../enum-name-value.model'
/**	EventCapability (事件记录能力)	*/
export class EventCapability
  implements IModel, ICapability<EnumNameValue[] | undefined>
{
  [key: string]: EnumNameValue[] | undefined
  /**	EnumNameValue[]	资源类型	O	*/
  @Type(() => EnumNameValue)
  ResourceTypes?: EnumNameValue[]
  /**	EnumNameValue[]	事件类型	O	*/
  @Type(() => EnumNameValue)
  EventTypes?: EnumNameValue[]
}
