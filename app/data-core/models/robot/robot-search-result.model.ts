import { IModel } from '../model.interface'

/**	RobotSearchResult (搜索内网机器人返回结果)	*/
export class RobotSearchResult implements IModel {
  /**	Int32	序号，从1开始递增	M	*/
  No!: number
  /**	String	设备型号	M	*/
  DeviceType!: string
  /**	String	设备序列号	M	*/
  SerialNumber!: string
  /**	String	协议类型，CoAP	M	*/
  ProtocolType!: string
  /**	String	设备IP地址：192.168.1.2	M	*/
  HostAddress!: string
  /**	Int32	设备端口号	M	*/
  PortNo!: number
}
