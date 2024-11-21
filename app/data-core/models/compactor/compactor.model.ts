import { IIdModel } from '../model.interface'

/**	Compactor (垃圾压缩设备信息)	*/
export class Compactor implements IIdModel {
  /**	String	压缩设备ID	M	*/
  Id!: string
  /**	String	设备名称	O	*/
  Name?: string
  /**	String	型号：GCCD	O	*/
  Model?: string
  /**	String	设备类型：GCCD	M	*/
  DeviceType!: string
  /**	String	自定义信息	O	*/
  CustomizedInfo?: string
  /**	String	协议类型，HWMSG	M	*/
  ProtocolType!: string
  /**	String	设备IP地址：192.168.1.2	M	*/
  HostAddress!: string
  /**	Int32	设备端口号	M	*/
  PortNo!: number
  /**	Int32	机器人定义的网格节点ID	O	*/
  MeshNodeId?: number
  /**	String	设备状态 Online：在线 Offline：不在线 	O	*/
  CompactorState?: string
}
