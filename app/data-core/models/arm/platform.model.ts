import { PlatformProtocolVersion } from '../../enums/platform-protocol-version.enum'
import { IModel } from '../model.interface'

/**	Platform (进程信息)	*/
export class Platform implements IModel {
  /**	Boolean	是否启用
   * true：启用
   * false：禁用
   * 	M
   **/
  Enabled!: boolean
  /**	String	协议版本：1.0	M	*/
  ProtocolVersion!: PlatformProtocolVersion
  /**	String	服务器地址	M	*/
  HostAddress!: string
  /**	Int32	服务器端口号	M	*/
  PortNo!: number
  /**	String	设备ID	M	*/
  DeviceId!: string
  /**	String	密钥，BASE64(SM4()),默认密钥：howell1409	M	*/
  DeviceKey!: string
}
