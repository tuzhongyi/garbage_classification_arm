import { Transform, Type } from 'class-transformer'
import 'reflect-metadata'
import { IModel } from '../model.interface'
import { PagedList } from '../page-list.model'
import { transformDateTime } from '../transformer'

/**	LogItem (日志项)	*/
export class LogItem implements IModel {
  /**	String	主类型	M	*/
  Major!: string
  /**	String	子类型（设备定义）	M	*/
  Minor!: string
  /**	String	用户名(目前没有用户名)	O	*/
  User?: string
  /**	String	远程主机	O	*/
  Remote?: string
  /**	String	日志描述内容	O	*/
  Desc?: string
  /**	DateTime	本地时间	M	*/
  @Transform(transformDateTime) Time!: Date
}

export class PagedListLogItem extends PagedList<LogItem> {
  @Type(() => LogItem)
  Data!: LogItem[]
}
