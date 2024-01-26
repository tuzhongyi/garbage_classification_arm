import { IModel } from '../../../model.interface'

/**	AnalysisObjectProperty (分析对象分类属性)	*/
export class AnalysisObjectProperty implements IModel {
  /**	Int32	属性key: 0-垃圾筒类别: 1-垃圾量	M	*/
  key!: number
  /**	Int32	属性值：不同的KEY对相应的数值会不同。如：垃圾筒类别取值: 0-干 1-湿 2-可回收 3-有害	M	*/
  value!: number
  /**	Double	置信度[0-1]	M	*/
  confidence!: number
}
