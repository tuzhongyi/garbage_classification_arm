import { Type } from 'class-transformer'
import 'reflect-metadata'
import { IModel } from '../../model.interface'
import { ICapability } from '../capability.interface'
import { EnumNameValue } from '../enum-name-value.model'

/**	CompactorCapability (垃圾压缩设备能力)	*/
export class CompactorCapability
  implements IModel, ICapability<EnumNameValue[] | number | boolean>
{
  [key: string]: number | boolean | EnumNameValue[]
  /**	Boolean	是否支持垃圾压缩	M	*/
  Supported!: boolean
  /**	EnumNameValue[]	设备类型	M	*/
  @Type(() => EnumNameValue)
  DeviceTypes!: EnumNameValue[]
  /**	EnumNameValue[]	协议类型	M	*/
  @Type(() => EnumNameValue)
  ProtocolTypes!: EnumNameValue[]
  /**	EnumNameValue[]	在线状态	M	*/
  @Type(() => EnumNameValue)
  CompactorStates!: EnumNameValue[]
  /**	EnumNameValue[]	命令类型	M	*/
  @Type(() => EnumNameValue)
  CommandTypes!: EnumNameValue[]
  /**	Double	最小压力：10.0KG	M	*/
  MinPressure!: number
  /**	Double	最大压力：50.0KG	M	*/
  MaxPressure!: number
  /**	Int32	最小距离：400mm	M	*/
  MinDistance!: number
  /**	Int32	最大距离：1500mm	M	*/
  MaxDistance!: number
}
