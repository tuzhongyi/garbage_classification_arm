import { IIdNameModel } from '../model.interface'

/**	GarbageServer (垃圾业务服务器)	*/
export class GarbageServer implements IIdNameModel {
  /**	String	服务器ID	M	*/
  Id!: string
  /**	String	服务器名称	M	*/
  Name!: string
  /**	String	服务器地址	M	*/
  Url!: string
  /**	String	描述信息	O	*/
  Description?: string
}
