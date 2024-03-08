import { RobotCommandType } from '../../enums/robot/robot-command-type.enum'
import { MeshDestination } from './mesh-destination.model'
import { RobotCommand } from './robot-command.model'

/**	移动目的地	*/
export class RobotMoveToCommandData {
  /**	MeshDestination	目的地	M	*/
  Destination!: MeshDestination
  /**	Double	垃圾的重量，单位KG，精度：小数点后两位	O	RW */
  Weight?: number
}

/**	RobotMoveToCommand (移动目的地)	*/
export class RobotMoveToCommand extends RobotCommand<RobotMoveToCommandData> {
  /**	命令类型	*/
  CmdType = RobotCommandType.MoveTo
}
