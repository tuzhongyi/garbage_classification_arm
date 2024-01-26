import { Transform } from 'class-transformer'
import { IModel } from '../../../model.interface'
import { transformDateTime } from '../../../transformer'
import { AnalysisEventAnalyzer } from './analysis-event-analyzer.model'
import { AnalysisEventSource } from './analysis-event-source.model'

/**	AnalysisEventRecord (分析事件)	*/
export class AnalysisEventRecord implements IModel {
  /**	Int64	事件内部ID	M	*/
  id!: number
  /**	String	事件外部ID	M	*/
  guid!: string
  /**	DateTime	事件时间	M	*/
  @Transform(transformDateTime)
  time!: Date
  /**	String	事件分析数据地址	O	*/
  data?: string
  /**	Object	事件分析内容结构体	M	*/
  body!: Object
  /**	AnalysisEventAnalyzer	分析器	M	*/
  analyzer!: AnalysisEventAnalyzer
  /**	AnalysisEventSource	分析数据来源	M	*/
  source!: AnalysisEventSource
}
