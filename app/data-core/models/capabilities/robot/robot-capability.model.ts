import { IModel } from '../../model.interface'
import { EnumNameValue } from '../enum-name-value.model'

/**	RobotCapability (机器人能力)	*/
export class RobotCapability implements IModel {
  /**	Boolean	是否支持读取电池信息	M	*/
  Battery!: boolean
  /**	EnumNameValue[]	电池状态	O	*/
  BatteryStates?: EnumNameValue[]
  /**	Boolean	是否支持标定	M	*/
  Calibration!: boolean
  /**	EnumNameValue[]	网状节点类型	O	*/
  MeshNodeTypes?: EnumNameValue[]
  /**	EnumNameValue[]	机器人状态	O	*/
  DeviceStates?: EnumNameValue[]
  /**	EnumNameValue[]	机器人命令	O	*/
  CommandTypes?: EnumNameValue[]
}
