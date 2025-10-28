import { IParams } from '../../../models/params.interface'

export class SystemCommand implements IParams {
  /**	String	命令内容	M	R */
  Content!: string
}
export class Initialization implements IParams {
  /**	String	设备序列号	M	RW */
  SerialNumber!: string
  /**	String	设备型号，默认：GCHA01	O	RW */
  Model?: string
  /**	String	设备类型，默认：GCHA	O	RW */
  DeviceType?: string
}
