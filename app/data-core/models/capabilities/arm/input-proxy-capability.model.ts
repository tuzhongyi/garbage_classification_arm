import { Type } from 'class-transformer'
import 'reflect-metadata'
import { IModel } from '../../model.interface'
import { ICapability } from '../capability.interface'
import { EnumValue } from '../enum-value.model'
/**	InputProxyCapability (代理输入通道能力)	*/
export class InputProxyCapability
  implements IModel, ICapability<EnumValue[] | boolean | undefined>
{
  [key: string]: boolean | EnumValue[] | undefined
  /**	Boolean	搜索代理通道是否支持	M	*/
  Searching!: boolean
  /**	EnumValue[]	代理通道状态	O	*/
  @Type(() => EnumValue)
  ProxyChannelStates?: EnumValue[]
  /**	EnumValue[]	设备协议类型	O	*/
  @Type(() => EnumValue)
  DeviceProtocolTypes?: EnumValue[]
}
