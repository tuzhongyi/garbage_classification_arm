import { INameModel } from '../model.interface'

/**	SortationDevice (分拣设备信息)	*/
export class SortationDevice implements INameModel {
  /**	String	设备唯一ID	M	*/
  Id!: string
  /**	String	设备名称，默认：同IP地址	M	*/
  Name!: string
  /**	String	设备IP地址：192.168.1.100	M	*/
  HostAddress!: string
  /**	Int32	设备端口号	M	*/
  PortNo!: number
  /**	String	协议类型：HWMSG	M	*/
  ProtocolType!: string
  /**	String	型号	O	*/
  Model?: string
  /**	String	序列号	O	*/
  SerialNumber?: string
  /**	String	设备类型	O	*/
  DeviceType?: string
  /**	String	软件版本号	O	*/
  FirmwareVersion?: string
  /**	String	设备用户名	O	*/
  UserName?: string
  /**	String	设备密码	O	*/
  Password?: string
  /**	String	自定义信息	O	*/
  CustomizedInfo?: string
  /**	Int32	状态，0-正常，1-离线	O	*/
  Status?: number
  /**	Int32	投口门状态，0-关闭，1-开启	O	*/
  DropPortStatus?: number
  /**	Int32	控制台开关状态，0-关闭，1-开始	O	*/
  ConsoleOpenStatus?: number
  /**	Int32	气泵压力值，单位：pa	O	*/
  AirPressure?: number
}
