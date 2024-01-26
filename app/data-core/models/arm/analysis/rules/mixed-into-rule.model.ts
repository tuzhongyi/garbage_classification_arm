import { IModel } from '../../../model.interface'
import { Polygon } from '../../polygon.model'
import { ModelLabel } from '../model-label.model'

/**	MixedIntoRule (混合投放规则)	*/
export class MixedIntoRule implements IModel {
  /**	Int32	持续时间，0-1800，0的话表示立即触发事件，默认：5秒	M	*/
  Duration!: number
  /**	Int32	目标置信度，0-100	M	*/
  Confidence!: number
  /**	ModelLabel[]	报警对象模型标签列表	M	*/
  ObjectLabels!: ModelLabel[]
  /**	ModelLabel[]	报警对应的垃圾桶标签列表	M	*/
  TrashCanLabels!: ModelLabel[]
  /**	Int32	目标在垃圾桶内的占比[0-100] 默认：80	M	*/
  TrashCanRatio!: number
  /**	Polygon[]	区域列表，默认：全屏	M	*/
  Regions!: Polygon[]
  /**	Int32	区域内目标面积与目标总面积占比[0-100] 默认：100	M	*/
  TargetRatio!: number
}
