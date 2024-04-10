import { Transform, Type } from 'class-transformer'
import 'reflect-metadata'
import { EventType } from '../../../enums/event-type.enum'
import { IModel } from '../../model.interface'
import { transformDateTime } from '../../transformer'
import { EventResource } from './event-resource.model'

/**	EventRecord (本地事件记录)	*/
export class EventRecord implements IModel {
  /**	Int64	事件ID	M	*/
  Id!: number
  /**	DateTime	事件时间	M	*/
  @Transform(transformDateTime)
  EventTime!: Date
  /**	String	事件类型	M	*/
  EventType!: EventType
  /**	DateTime	开始时间	O	*/
  @Transform(transformDateTime)
  BeginTime?: Date
  /**	DateTime	结束时间	O	*/
  @Transform(transformDateTime)
  EndTime?: Date
  /**	Boolean	是否已上传服务器	O	*/
  Uploaded?: boolean
  /**	String	上传成功后服务器分配的事件ID	O	*/
  UploadEventId?: string
  /**	EventResource[]	报警事件资源列表	O	*/
  @Type(() => EventResource)
  Resources?: EventResource[]
}
