import { DeviceProtocolType } from '../../enums/device-protocol-type.enum'
import { IIdNameModel } from '../model.interface'

/**	ISUPServer (ISUP接入服务器)	*/
export class ISUPServer implements IIdNameModel {
  /**	String	服务器ID	M	*/
  Id!: string
  /**	String	服务器名称	M	*/
  Name!: string
  /**	String	服务器地址	M	*/
  Url!: string
  /**	String	接入密钥，howell1409	M	*/
  SecretKey!: string
  /**	Int32	接入端口号，57031	M	*/
  AccessPort!: number
  /**	String	接入协议，ISUP5.0，N/A表示无效	M	*/
  AccessProtocol!: string
  /**	String	描述信息	O	*/
  Description?: string
  /**	String	协议类型	O	*/
  ProtocolType?: DeviceProtocolType
}
