import { AITaskType } from '../../enums/ai-task-type.enum'
import { IIdNameModel } from '../model.interface'
import { CameraAITaskRule } from './camera-ai-task-rule.model'

/**	CameraAITask (监控点AI任务)	*/
export class CameraAITask implements IIdNameModel {
  /**	String	ID	M	*/
  Id!: string
  /**	String	任务名称	M	*/
  Name!: string
  /**	Boolean	是否启用任务	M	*/
  Enabled!: boolean
  /**
   * String	任务方式：
   * Metadata：元数据分析
   * LiveVideo：实时视频分析
   * Picture：定时抓图分析
   * M
   **/
  TaskType!: AITaskType
  /**	Int32	抓图间隔：（单位：秒）TaskType为定时抓图分析时必填。	O/D	*/
  PictureInterval?: number
  /**	Int32	事件类型	M	*/
  EventType!: number
  /**	CameraAITaskRule[]	AI事件规则数组	M	*/
  Rules!: CameraAITaskRule[]
}
