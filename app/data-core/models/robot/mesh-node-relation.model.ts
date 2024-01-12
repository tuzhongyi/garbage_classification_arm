import { IIdModel } from '../model.interface'

/**	MeshNodeRelation (网状图形节点关系)	*/
export class MeshNodeRelation implements IIdModel {
  /**	String	关联节点ID	M	*/
  Id!: string
  /**	Int32	关联节点方向:0-360度，0=上，90=右，180=下，270=左。	M	*/
  Direction!: number
  /**	Int32	关联节点间的距离，默认单位：cm，实际标定中数值可能填1。	M	*/
  Distance!: number
}
