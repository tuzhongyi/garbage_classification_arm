import { EventType } from '../../enums/event-type.enum'
import { IModel } from '../model.interface'
import { EventTrigger } from './event-trigger.model'
import { WeekTimeSegment } from './week-time-segment.model'

/**	CameraAIEvent (监控点AI事件部署)	*/
export class CameraAIEvent implements IModel {
  /**	Int32	事件类型(唯一)	M	*/
  Type!: EventType
  /**	String	事件名称	M	*/
  Name!: string
  /**	WeekTimeSegment	周工作表	M	*/
  WorkSheet!: WeekTimeSegment
  /**	EventTrigger	事件联动	M	*/
  EventTrigger!: EventTrigger
}
