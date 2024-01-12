import { IModel } from '../model.interface'
import { MeshDestination } from './mesh-destination.model'

/**	MeshEdge (网状边)	*/
export class MeshEdge implements IModel {
  /**	String	边ID，由起点ID+终点ID组成，实际系统中没有边的ID。例如：1-2，节点1到2的边，和2-1为同一条边。
   * 所以不管ID是1-2还是2-1在无向图中都是同一条边。	O	*/
  Id?: string
  /**	MeshDestination	起点	M	*/
  Start!: MeshDestination
  /**	MeshDestination	终点	M	*/
  End!: MeshDestination
  /**	Int32	顺序（保留）	O	*/
  Order?: number
  /**	Int32	方向:0-360度（保留，无向图可以没有方向）	O	*/
  Direction?: number
  /**	Int32	关联节点间的距离，默认单位：cm，实际标定中数值可能填1。	M	*/
  Distance!: number
}
