import { Transform } from 'class-transformer'
import { IModel } from '../model.interface'
import { transformDateTime } from '../transformer'

/**	FrpInfo (端口映射信息)	*/
export class FrpInfo implements IModel {
  /**	Int64	映射ID	O	*/
  Id?: number
  /**	String	映射名称（保留）	O	*/
  Name?: string
  /**	String	本地主机地址	M	*/
  Localhost!: string
  /**	Int32	本地端口号	M	*/
  LocalPort!: number
  /**	Int32	映射访问的远程服务器端口号	M	*/
  RemotePort!: number
  /**	Int32	协议类型：0-TCP，1-UDP	M	*/
  Protocol!: number
  /**	DateTime	创建时间	O	*/
  @Transform(transformDateTime)
  CreationTime?: Date
  /**	Int32	连接状态，0-未连接，1-已连接	O	*/
  State?: number
}
