import { Type } from 'class-transformer'
import 'reflect-metadata'
import { IModel } from '../../model.interface'
import { EventDataObject } from './event-data-object.model'
import { EventRule } from './event-rule.model'

/**	EventResource (事件资源)	*/
export class EventResource implements IModel {
  /**	String	资源ID	M	*/
  ResourceId!: string
  /**
   * String
   * 资源类型：Camera
   * M
   **/
  ResourceType!: string
  /**	String	资源名称	M	*/
  ResourceName!: string
  /**	Int32	摄像机机位	O	*/
  PositionNo?: number
  /**	EventDataObject[]	目标	O	*/
  @Type(() => EventDataObject)
  Objects?: EventDataObject[]
  /**	EventRule[]	事件规则	O	*/
  @Type(() => EventRule)
  Rules?: EventRule[]
  /**	String	图片ID	O	*/
  PictureId?: string
}
