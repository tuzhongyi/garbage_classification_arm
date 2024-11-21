import { Type } from 'class-transformer'
import 'reflect-metadata'
import { IModel } from '../../model.interface'
import { ICapability } from '../capability.interface'
import { EnumNameValue } from '../enum-name-value.model'
/**	SortationCapability (分拣能力)	*/
export class SortationCapability
  implements IModel, ICapability<EnumNameValue[] | boolean | undefined>
{
  [key: string]: boolean | EnumNameValue[] | undefined
  /**	Boolean	是否支持分拣	M	*/
  Supported!: boolean
  /**	Boolean	搜索分拣设备是否支持	M	*/
  Searching!: boolean
  /**	EnumNameValue[]	分拣操作台旋转角度	O	*/
  @Type(() => EnumNameValue)
  Rotations?: EnumNameValue[]
  /**	EnumNameValue[]	分拣命令列表	O	*/
  @Type(() => EnumNameValue)
  CommandTypes?: EnumNameValue[]
}
