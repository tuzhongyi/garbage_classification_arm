import { PagedDurationParams } from '../../../models/params.interface'

/**	GetRecordsParams  (查询记录请求参数)	*/
export class GetEventRecordsParams extends PagedDurationParams {
  /**	String	事件类型	O	R */
  EventType?: number
  /**	Boolean	是否已上传	O	R */
  Uploaded?: boolean
}
