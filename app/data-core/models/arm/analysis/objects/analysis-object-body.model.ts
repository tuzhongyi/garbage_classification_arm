import { IModel } from '../../../model.interface'
import { AnalysisD2DObject } from './analysis-d2d-object.model'

/**	AnalysisObjectBody (分析事件对象结构体)	*/
export class AnalysisObjectBody implements IModel {
  /**	AnalysisD2DObject[]	2D对象数组	M	*/
  d2d_objects!: AnalysisD2DObject[]
}
