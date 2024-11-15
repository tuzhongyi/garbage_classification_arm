import { RobotCommandType } from '../../enums/robot/robot-command-type.enum'
import { MeshDestination } from './mesh-destination.model'
import { RobotCommand } from './robot-command.model'

/**	搬运桶	*/
export class RobotTransportToCommandData {
  /**	MeshDestination	起点	M	*/
  StartingPoint!: MeshDestination
  /**	Boolean	起点是否有桶	O	*/
  StartHasTrashCan?: boolean
  /**	MeshDestination	终点	M	*/
  Destination!: MeshDestination
  /**	Boolean	终点是否有桶	O	*/
  DestHasTrashCan?: boolean
  /**	Boolean	是否盖上起点桶的盖子	O	*/
  StartCovered?: boolean
  /**	Double	被更换垃圾的重量，单位KG，精度：小数点后两位。	O	*/
  Weight?: number
}

/**	RobotTransportToCommand (搬运桶)	*/
export class RobotTransportToCommand extends RobotCommand<RobotTransportToCommandData> {
  CmdType = RobotCommandType.TransportTo
}
