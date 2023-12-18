import { DayOfWeek } from '../../enums/day-of-week.enum'
import { IModel } from '../model.interface'
import { TimeSegment } from './time-segment.model'

/**	DayTimeSegment (每日工作表时间段)	*/
export class DayTimeSegment implements IModel {
  /**	Int32	星期几0-6	M	*/
  DayOfWeek!: DayOfWeek
  /**	TimeSegment[]	工作时间段，最多4个时间段	O	*/
  Segments?: TimeSegment[]
}
