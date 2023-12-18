import { EventType } from '../../enums/event-type.enum'
import { IModel } from '../model.interface'

/**	EventInfo	(事件信息)	*/
export class EventInfo implements IModel {
  /**	Int32	事件类型(唯一)	M	*/
  Type!: EventType
  /**	String	事件名称	M	*/
  Name!: string
}
