import { Transform } from 'class-transformer'
import { PagedParams } from '../../../models/params.interface'
import { transformDate } from '../../../models/transformer'

/**	GetRecordsParams  (查询记录请求参数)	*/
export class GetRecordsParams extends PagedParams {
  /**	Date	操作记录日期	O	*/
  @Transform(transformDate)
  Date?: Date
}
