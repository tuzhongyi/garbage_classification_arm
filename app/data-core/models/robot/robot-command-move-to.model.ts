import { MeshDestination } from './mesh-destination.model'
import { RobotCommand } from './robot-command.model'

/**	移动目的地	*/
export class RobotMoveToCommandData {
  /**	MeshDestination	目的地	M	*/
  Destination!: MeshDestination
}

/**	RobotMoveToCommand (移动目的地)	*/
export class RobotMoveToCommand extends RobotCommand<RobotMoveToCommandData> {}
