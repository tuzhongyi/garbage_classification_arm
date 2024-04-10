import { Type } from 'class-transformer'
import 'reflect-metadata'
import { IModel } from '../../model.interface'
import { Point } from '../point.model'
/**	EventDataObject (事件目标)	*/
export class EventDataObject implements IModel {
  /**	String	目标ID	M	*/
  Id!: string
  /**	Point[]	目标所在的归一化多边形	M	*/
  @Type(() => Point)
  Polygon!: Point[]
  /**	Double	置信度：0-100	M	*/
  Confidence!: number
}
