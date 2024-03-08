import { PagedDurationParams } from '../../../models/params.interface'

/**	TrashCanCapability (垃圾桶能力)	*/
export class SearchLogParams extends PagedDurationParams {
  /**	String	主类型	O	*/
  Major?: string
  /**	String	子类型（设备定义）	O	*/
  Minor?: string
}
