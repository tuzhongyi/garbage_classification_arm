import { IModel } from '../model.interface'

/**	RobotCalibration (设备标定)	*/
export class RobotCalibration implements IModel {
  /**	Boolean	是否正在标定，true；标定坐标中，false；未开始标定	M	*/
  UnderCalibration!: boolean
  /**	String	方向单位：Degree(度)	M	*/
  DirectionUnit!: string
  /**	String	距离单位：CM(厘米)	M	*/
  DistanceUnit!: string
  /**	String	标定服务器地址：coap://192.168.10.12:5683/	O	*/
  ServerAddress?: string
}
