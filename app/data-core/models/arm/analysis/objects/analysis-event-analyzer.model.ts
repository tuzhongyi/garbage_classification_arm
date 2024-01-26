import { IModel } from '../../../model.interface'

/**	AnalysisEventAnalyzer (分析事件分析器信息)	*/
export class AnalysisEventAnalyzer implements IModel {
  /**	Int64	分析服务器内部来源ID	M	*/
  id!: number
  /**	String	分析服务器外部来源ID	M	*/
  guid!: string
  /**	Int32	类型	M	*/
  type!: number
  /**	String	分析器名称	M	*/
  name!: string
}
