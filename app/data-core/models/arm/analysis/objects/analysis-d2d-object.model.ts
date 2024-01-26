import { IModel } from '../../../model.interface'
import { AnalysisD2DPoint } from './analysis-d2d-point.model'
import { AnalysisObjectProperty } from './analysis-object-property.model'

/**	AnalysisD2DObject (分析事件2D对象)	*/
export class AnalysisD2DObject implements IModel {
  /**	Int64	ID对象	M	*/
  id!: number
  /**
   * Int32	目标类别:
   * 0：垃圾筒口
   * 1：垃圾筒盖
   * 2：垃圾堆
   * 3：人员
   * 4：垃圾桶整筒
   * M
   **/
  class_index!: number
  /**	Double	置信度[0-1]	M	*/
  confidence!: number
  /**	AnalysisD2DPoint[]	目标多边形坐标位置，目前只有矩形	M	*/
  polygon!: AnalysisD2DPoint[]
  /**	AnalysisObjectProperty[]	对象分类属性	O	*/
  properties?: AnalysisObjectProperty[]
  /**	Int64	父对象ID	O	*/
  parent_id?: number
}
