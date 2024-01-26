import { IModel } from '../../../model.interface'
import { Polygon } from '../../polygon.model'
import { ModelLabel } from '../model-label.model'

/**	GarbageDropRule (垃圾滞留事件规则)	*/
export class GarbageDropRule implements IModel {
  /**	Int32	目标置信度，0-100	M	*/
  Confidence!: number
  /**	ModelLabel[]	报警对象模型标签列表	M	*/
  ObjectLabels!: ModelLabel[]
  /**	Polygon[]	区域列表	M	*/
  Regions!: Polygon[]
  /**	Int32	区域内目标面积与目标总面积占比[0-100]	M	*/
  TargetRatio!: number
  /**	Int32	最小目标数量	M	*/
  MinTargetNumber!: number
  /**	Int32	数量计数判断间隔(单位：分钟)，默认：1分钟	M	*/
  CountInterval!: number
  /**	Int32	滞留时长，默认：30分钟	M	*/
  TimeoutInterval!: number
  /**	Int32	区级滞留时长，默认：90分钟	M	*/
  SuperTimeoutInterval!: number
}
