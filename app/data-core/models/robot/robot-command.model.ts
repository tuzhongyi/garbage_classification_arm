import { IModel } from '../model.interface'

/**	RobotCommand (控制命令)	*/
export class RobotCommand<T = any> implements IModel {
  /**	Int32	命令ID(设备收到请求后创建)	O	*/
  Id?: number
  /**	String	命令类型	M	*/
  CmdType!: string
  /**	Object	命令数据、参数	O	*/
  Data?: T
}
