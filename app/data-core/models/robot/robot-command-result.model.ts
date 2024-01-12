import { Transform } from 'class-transformer'
import { IModel } from '../model.interface'
import { transformDateTime } from '../transformer'

/**	RobotCommandResult (控制命令执行结果)	*/
export class RobotCommandResult<T = any> implements IModel {
  /**	Int32	命令ID(设备收到请求后创建)	O	*/
  Id?: number
  /**	String	命令类型	M	*/
  CmdType!: string
  /**	DateTime	执行时间	M	*/
  @Transform(transformDateTime) Time!: Date
  /**	Int32	异常码，如果成功返回0	M	*/
  Code!: number
  /**	String	异常码描述内容	O	*/
  Desc?: string
  /**	Object	命令数据、参数	O	*/
  Data?: T
}
