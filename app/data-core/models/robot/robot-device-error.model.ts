import { IModel } from '../model.interface'

/**	RobotDeviceError (设备异常码)	*/
export class RobotDeviceError implements IModel {
  /**	Int32	异常码	M	*/
  Code!: number
  /**	String	异常码描述内容	O	*/
  Desc?: string
}
