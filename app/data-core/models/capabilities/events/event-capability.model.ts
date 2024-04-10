import { IModel } from '../../model.interface'
import { EnumNameValue } from '../enum-name-value.model'

/**	EventCapability (事件记录能力)	*/
export class EventCapability implements IModel {
  /**	EnumNameValue[]	资源类型	O	*/
  ResourceTypes?: EnumNameValue[]
  /**	EnumNameValue[]	事件类型	O	*/
  EventTypes?: EnumNameValue[]
}
