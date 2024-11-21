import { Type } from 'class-transformer'
import 'reflect-metadata'
import { IModel } from '../../model.interface'
import { ICapability } from '../capability.interface'
import { EnumValue } from '../enum-value.model'
/**	SecurityCapability (网络安全能力)	*/
export class SecurityCapability implements IModel, ICapability<EnumValue[]> {
  [key: string]: EnumValue[]
  /**	EnumValue[]	支持的用户认证类型	M	*/
  @Type(() => EnumValue)
  AuthTypes!: EnumValue[]
}
