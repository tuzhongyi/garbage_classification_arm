import { Transform } from 'class-transformer'
import { CanType } from '../../../enums/robot/robot-can-type.model'
import { IIdModel } from '../../model.interface'
import { MeshDestination } from '../../robot/mesh-destination.model'
import { transformDateTime } from '../../transformer'

/**	TrashCanRecord  (垃圾桶记录)	*/
export class TrashCanRecord implements IIdModel {
  /**	String	记录ID	M	*/
  Id!: string
  /**	String	记录类型	M	*/
  RecordType!: string
  /**	String	机器人ID	M	*/
  RobotId!: string
  /**	String	机器人名称	O	*/
  RobotName?: string
  /**	DateTime	操作时间	M	*/
  @Transform(transformDateTime)
  Time!: Date
  /**	MeshDestination[]	操作节点	O	*/
  Destinations?: MeshDestination[]
  /**	Double	重量，单位：KG	O	*/
  Weight?: number
  /**	String	投放口或存桶区类型	M	*/
  CanType!: CanType
  /**	Int32	命令ID	O	*/
  CommandId?: number
  /**	Int32	命令执行结果	O	*/
  CommandResult?: number
  /**	String	命令执行结果描述	O	*/
  CommandDesc?: string
  /**	Boolean	发送结果，True：成功	M	*/
  Send!: boolean
  /**	String	命令描述内容	O	*/
  Description?: string
}
