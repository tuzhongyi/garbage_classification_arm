import { Type } from 'class-transformer'
import 'reflect-metadata'
import { MeshNodeType } from '../../../enums/robot/mesh-node-type.model'
import { CanType } from '../../../enums/robot/robot-can-type.model'
import { INameModel } from '../../model.interface'
import { MeshNodePosition } from '../../robot/mesh-node-position.model'
import { Point } from '../point.model'

/**	ChannelCalibrationPoint (标定点)	*/
export class ChannelCalibrationPoint implements INameModel {
  /**	Int32	编号，从1开始	M	*/
  No!: number
  /**	String	标定点名称	M	*/
  Name!: string
  /**	Point	标定点坐标，图像上的归一化坐标。	M	*/
  @Type(() => Point)
  Coordinate!: Point
  /**	Boolean	是否为墙角	O	*/
  IsCorner?: boolean
  /**	String	对应MeshNode的节点ID	O	*/
  NodeId?: string
  /**	String	节点类型	O	*/
  NodeType?: MeshNodeType
  /**	String	投放口或存桶区类型	O	*/
  CanType?: CanType
  /**	MeshNodePosition	节点位置	M	*/
  @Type(() => MeshNodePosition)
  NodePosition!: MeshNodePosition
}
