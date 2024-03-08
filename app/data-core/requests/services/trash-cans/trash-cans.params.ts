import { Transform } from 'class-transformer'
import { IParams } from '../../../models/params.interface'
import { transformDate } from '../../../models/transformer'

/**	GetRecordsParams  (查询记录请求参数)	*/
export class GetRecordsParams implements IParams {
  /**	Int32	页码1-n	O	*/ PageIndex?: number
  /**	Int32	页大小1-1000	O	*/ PageSize?: number
  /**	Date	操作记录日期	O	*/
  @Transform(transformDate)
  Date?: Date
}
