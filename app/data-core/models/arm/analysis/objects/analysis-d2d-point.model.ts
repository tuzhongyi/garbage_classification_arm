import { IModel } from '../../../model.interface'

/**	AnalysisD2DPoint (分析对象顶点)	*/
export class AnalysisD2DPoint implements IModel {
  /**	Double	X轴坐标，[0-1]	M	*/
  x!: number
  /**	Double	Y轴坐标，[0-1]	M	*/
  y!: number
}
