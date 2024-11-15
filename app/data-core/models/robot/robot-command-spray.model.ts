import { RobotCommandType } from '../../enums/robot/robot-command-type.enum'
import { MeshDestination } from './mesh-destination.model'
import { RobotCommand } from './robot-command.model'

/**	喷洒消毒	*/
export class RobotSprayCommandData {
  /**	MeshDestination	消毒作业口位置	M	RW */
  SterilizedPort!: MeshDestination
  /**	Int32	作业次数，默认：1次	M	RW */
  Times = 1
}

/**	RobotWeighCommand (称重)	*/
export class RobotSprayCommand extends RobotCommand<RobotSprayCommandData> {
  /**	命令类型	*/
  CmdType = RobotCommandType.Spray
}
