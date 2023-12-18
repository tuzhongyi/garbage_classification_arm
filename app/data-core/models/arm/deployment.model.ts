import { IModel } from '../model.interface'

/**	Deployment (部署服务器)	*/
export class Deployment implements IModel {
  /**	String	服务器地址	M	*/
  HostAddress!: string
  /**	Int32	服务器端口号	M	*/
  PortNo!: number
  /**	String	设备用户名	O	*/
  UserName?: string
  /**	String	设备密码	O	*/
  Password?: string
  /**	String	垃圾分类服务器ID	O	*/
  GarbageServerId?: string
  /**	Stirng	垃圾分类服务器名称	O	*/
  GarbageServerName?: string
  /**	String	摄像机接入服务器ID	O	*/
  ISUPServerId?: string
  /**	String	摄像机接入服务器名称	O	*/
  ISUPServerName?: string
  /**	String	摄像机接入作用域ID	O	*/
  ISUPDomainId?: string
  /**	String	摄像机接入作用域名称	O	*/
  ISUPDomainName?: string
  /**	Int32	NB设备箱匹配时长，单位：秒，默认：300	O	*/
  NBPairSeconds?: number
  /**	String	设备型号，G3、G5	O	*/
  DeviceModel?: string
}
