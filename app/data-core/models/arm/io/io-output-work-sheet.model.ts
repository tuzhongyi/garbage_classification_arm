import { Type } from 'class-transformer'
import { IOState } from '../../../enums/io/io-state.enum'
import { IIdModel } from '../../model.interface'
import { WeekTimeSegment } from '../week-time-segment.model'

/**	IOOutputWorkSheet (IO输出工作表)	*/
export class IOOutputWorkSheet implements IIdModel<number> {
  /**	Int32	输出通道ID	M	*/
  Id!: number
  /**	Boolean	是否启用	M	*/
  Enabled!: boolean
  /**	String	工作表时间段内的IO状态	M	*/
  State!: IOState
  /**	WeekTimeSegment	周工作表	O	*/
  @Type(() => WeekTimeSegment)
  WorkSheet?: WeekTimeSegment
}
