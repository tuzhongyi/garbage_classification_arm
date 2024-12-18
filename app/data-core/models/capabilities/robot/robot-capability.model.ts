import { Type } from 'class-transformer'
import 'reflect-metadata'
import { IModel } from '../../model.interface'
import { ICapability } from '../capability.interface'
import { EnumNameValue } from '../enum-name-value.model'
/**	RobotCapability (机器人能力)	*/
export class RobotCapability
  implements IModel, ICapability<EnumNameValue[] | boolean | undefined>
{
  [key: string]: boolean | EnumNameValue[] | undefined
  /**	Boolean	是否支持读取电池信息	M	*/
  Battery!: boolean
  /**	EnumNameValue[]	电池状态	O	*/
  @Type(() => EnumNameValue)
  BatteryStates?: EnumNameValue[]
  /**	Boolean	是否支持标定	M	*/
  Calibration!: boolean
  /**	EnumNameValue[]	网状节点类型	O	*/
  @Type(() => EnumNameValue)
  MeshNodeTypes?: EnumNameValue[]
  /**	EnumNameValue[]	机器人状态	O	*/
  @Type(() => EnumNameValue)
  DeviceStates?: EnumNameValue[]
  /**	EnumNameValue[]	机器人命令	O	*/
  @Type(() => EnumNameValue)
  CommandTypes?: EnumNameValue[]
}
