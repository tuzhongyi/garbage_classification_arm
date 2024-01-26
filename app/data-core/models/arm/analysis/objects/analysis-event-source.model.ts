import { IModel } from '../../../model.interface'

/**	AnalysisEventSource (分析事件来源)	*/
export class AnalysisEventSource implements IModel {
  /**	Int64	分析服务器内部来源ID	M	*/
  id!: number
  /**	String	分析服务器外部来源ID	M	*/
  guid!: string
  /**	String	来源名称	M	*/
  name!: string
  /**
   * Int32	设备类型：
   * 1：摄像机
   * 2：拾音头
   * M
   **/
  device_type!: number
  /**	String[]	来源的URL	O	*/
  urls?: string[]
  /**	String	分组ID	O	*/
  group_id?: string
  /**	Boolean	允许状态	O	*/
  enabled?: boolean
  /**	Int32	标志集合	O	*/
  flags?: number
}
