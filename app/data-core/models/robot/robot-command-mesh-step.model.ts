import { RobotCommandType } from '../../enums/robot/robot-command-type.enum'
import { RobotCommand } from './robot-command.model'

/**	MeshStep (步进)	*/
export class RobotMeshStepCommandData {
  /**	Int32	面向方向:0-360度，0=上，90=右，180=下，270=左。	M	*/
  Direction!: number
  /**	Int32	移动单元，1个单元表示一个磁钉。	O/D	*/
  Unit?: number
  /**	Int32	移动距离，单位：cm	O/D	*/
  Distance?: number
  /**	String	RFID编号（移动到的目的地编号），16进制字符串	O	*/
  Rfid?: string
}
/**	RobotMeshStepCommand (步进)	*/
export class RobotMeshStepCommand extends RobotCommand<RobotMeshStepCommandData> {
  CmdType = RobotCommandType.MeshStep
}
