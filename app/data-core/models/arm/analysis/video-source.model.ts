import { IIdNameModel } from '../../model.interface'

/**	VideoSource (视频数据来源)	*/
export class VideoSource implements IIdNameModel {
  /**	String	ID	M	*/
  Id!: string
  /**	String	名称	M	*/
  Name!: string
  /**	Int32	来源设备类型，1- Camera，摄像机	M	*/
  DeviceType!: number
  /**	String	IP地址	M	*/
  IPAddress!: string
  /**	Int32	端口号	M	*/
  Port!: number
  /**	String	用户名	O	*/
  Username?: string
  /**	String	密码	O	*/
  Password?: string
  /**	Int32	通道编号，从1开始	O	*/
  Channel?: number
  /**	Int32	码流类型，从1开始，1：主码流，2：次码流	O	*/
  StreamType?: number
  /**	String	协议类型，默认：ISAPI	M	*/
  ProtocolType!: string
  /**	String	模式，默认：Snap	O	*/
  Mode?: string
  /**	String	厂商，默认：HIKVISION	O	*/
  Vendor?: string
  /**	String	所属分析服务器ID	O	*/
  AnalysisServerId?: string
}
