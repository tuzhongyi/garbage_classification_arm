import { Type } from 'class-transformer'
import 'reflect-metadata'
import { IModel } from '../../model.interface'
import { ICapability } from '../capability.interface'
import { EnumNameValue } from '../enum-name-value.model'
/**	DeviceCapability (设备能力)	*/
export class DeviceCapability
  implements IModel, ICapability<EnumNameValue[] | boolean | undefined>
{
  [key: string]: boolean | EnumNameValue[] | undefined
  /**	Boolean	NTP校时是否支持	M	*/
  NTPServer!: boolean
  /**	EnumValue[]	NTP校时模式	O	*/
  @Type(() => EnumNameValue)
  NTPTimeMode?: EnumNameValue[]
  /**	Boolean	运行状态	M	*/
  RunningStatus!: boolean
  /**	EnumValue[]	进程状态	O	*/
  @Type(() => EnumNameValue)
  ProcessStates?: EnumNameValue[]
  /**	EnumNameValue[]	IO输入输出状态	O	R */
  @Type(() => EnumNameValue)
  IOStates?: EnumNameValue[]
  /**	EnumNameValue[]	针脚工作模式	O	R */
  @Type(() => EnumNameValue)
  PinModes?: EnumNameValue[]
  /**	EnumNameValue[]	针脚电阻模式	O	R */
  @Type(() => EnumNameValue)
  PudModes?: EnumNameValue[]
  /**	EnumNameValue[]	投口类型	O	R */
  @Type(() => EnumNameValue)
  DropPortTypes?: EnumNameValue[]
  /**	EnumNameValue[]	投口状态	O	R */
  @Type(() => EnumNameValue)
  DropPortStates?: EnumNameValue[]
  /**	EnumNameValue[]	投口垃圾桶状态	O	R */
  @Type(() => EnumNameValue)
  TrashCanPortStates?: EnumNameValue[]
}
