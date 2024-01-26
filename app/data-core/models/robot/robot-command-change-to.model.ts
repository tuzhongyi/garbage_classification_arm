import { RobotCommandType } from '../../enums/robot/robot-command-type.enum'
import { MeshDestination } from './mesh-destination.model'
import { RobotCommand } from './robot-command.model'

/**	搬运桶	*/
export class RobotChangeToCommandData {
  /**	MeshDestination	存放口	M	*/
  DropPort!: MeshDestination
  /**	MeshDestination	投放口	M	*/
  StorePort!: MeshDestination
}

/**	RobotChangeToCommand (搬运桶)	*/
export class RobotChangeToCommand extends RobotCommand<RobotChangeToCommandData> {
  CmdType = RobotCommandType.ChangeTo
}
