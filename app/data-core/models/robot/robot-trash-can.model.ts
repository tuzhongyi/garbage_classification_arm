import { CoverState } from '../../enums/robot/cover-state.enum'
import { CanType } from '../../enums/robot/robot-can-type.model'
import { IModel } from '../model.interface'
import { MeshNodePosition } from './mesh-node-position.model'

/**	TrashCan (垃圾桶信息)	*/
export class RobotTrashCan implements IModel {
  /**	Int32	编号	O	R */
  No?: number
  /**	String	桶类型	M	*/
  CanType!: CanType
  /**	String	所在节点Id，如果桶在节点区域内，则提供节点ID	O	*/
  NodeId?: string
  /**	MeshNodePosition	桶坐标	O	*/
  Position?: MeshNodePosition
  /**	Int32	面向方向:0-360度，0=上，90=右，180=下，270=左。	O	*/
  Direction?: number
  /**	Int32	桶使用容量[0-100]	O	*/
  Volume?: number
  /**	String	桶盖状态	M	*/
  CoverState!: CoverState
  /**	String	颜色（保留）	O	*/
  Color?: string

  /**	Int32	综合置信度[0-100]	O	R */
  Confidence?: number
  /**	String	数据来源(摄像机)	O	R */
  SourceFrom?: string
  /**	DateTime	更新时间	M	R */
  UpdateTime!: Date
  /**	String	节点类型	O	RW */
  NodeType?: string
}
