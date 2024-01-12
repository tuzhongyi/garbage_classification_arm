import { EnumValue } from '../arm/enum-value.model'
import { IModel } from '../model.interface'

/**	DeviceCapability (设备能力)	*/
export class DeviceCapability implements IModel {
  /**	Boolean	NTP校时是否支持	M	*/
  NTPServer!: boolean
  /**	EnumValue[]	NTP校时模式	O	*/
  NTPTimeMode?: EnumValue[]
  /**	Boolean	运行状态	M	*/
  RunningStatus!: boolean
  /**	EnumValue[]	进程状态	O	*/
  ProcessStates?: EnumValue[]
}
