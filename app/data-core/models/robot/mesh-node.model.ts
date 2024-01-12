import { MeshNodeType } from '../../enums/robot/mesh-node-type.model'
import { IIdNameModel } from '../model.interface'
import { MeshNodePosition } from './mesh-node-position.model'
import { MeshNodeRelation } from './mesh-node-relation.model'

/**	MeshNode (网状节点)	*/
export class MeshNode implements IIdNameModel {
  /**	String	节点ID，范围：[1-99]	M	*/
  Id!: string
  /**	String	名称	M	*/
  Name!: string
  /**	String	RFID编号，目前只有类型为MagneticPin的节点会存在RFID编号。(先按全部点位都会有磁钉的策略做)（16进制字符串）	O	*/
  Rfid?: string
  /**	Int32	节点序号（保留），默认：0	O	*/
  Order?: number
  /**	MeshNodePosition	节点位置	M	*/
  Position!: MeshNodePosition
  /**	String	节点类型	M	*/
  NodeType!: MeshNodeType
  /**	String	投放口或存桶区类型	O	*/
  CanType?: string
  /**	MeshNodeRelation[]	关联节点信息	O	*/
  Relations?: MeshNodeRelation[]
}
