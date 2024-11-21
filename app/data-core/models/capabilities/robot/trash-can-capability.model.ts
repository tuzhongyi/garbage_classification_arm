import { Type } from 'class-transformer'
import 'reflect-metadata'
import { IModel } from '../../model.interface'
import { ICapability } from '../capability.interface'
import { EnumNameValue } from '../enum-name-value.model'
/**	TrashCanCapability (垃圾桶能力)	*/
export class TrashCanCapability
  implements IModel, ICapability<EnumNameValue[] | boolean | undefined>
{
  [key: string]: EnumNameValue[] | boolean | undefined
  /**	EnumNameValue[]	桶类型	O	*/
  @Type(() => EnumNameValue)
  CanTypes?: EnumNameValue[]
  /**	EnumNameValue[]	桶盖状态	O	*/
  @Type(() => EnumNameValue)
  CoverStates?: EnumNameValue[]
  /**	Boolean	运行状态	M	*/
  RunningStatus!: boolean
  /**	EnumNameValue[]	进程状态	O	*/
  @Type(() => EnumNameValue)
  ProcessStates?: EnumNameValue[]
  @Type(() => EnumNameValue)
  TrashCanRecordTypes?: EnumNameValue[]
}
