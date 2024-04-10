import { Type } from 'class-transformer'
import 'reflect-metadata'
import { IModel } from '../../model.interface'
import { Point } from '../point.model'
/**	EventRule (事件规则)	*/
export class EventRule implements IModel {
  /**	String	规则ID	M	*/
  RuleId!: string
  /**	Int32	触发类型(保留，不用处理)	O	*/
  TriggerType?: number
  /**	Int32	方向(保留，不用处理)	O	*/
  Direction?: number
  /**	Point[]	规则的归一化多边形	O	*/
  @Type(() => Point)
  Polygon?: Point[]
  /**	String[]	触发规则的对象ID，可以在EventDataObject的Objects中找到	O	*/
  ObjectIds?: string[]
}
