import { IModel } from '../../../model.interface'
import { Polygon } from '../../polygon.model'
import { ModelLabel } from '../model-label.model'

/**	DropWarningRule (垃圾投放预警规则)	*/
export class DropWarningRule implements IModel {
  /**	Int32	持续时间，0-1800，0的话表示立即触发事件，默认：0	M	*/
  Duration!: number
  /**	Int32	目标置信度，0-100	M	*/
  Confidence!: number
  /**	ModelLabel[]	报警对象模型标签列表	M	*/
  ObjectLabels!: ModelLabel[]
  /**	Polygon[]	区域列表	M	*/
  Regions!: Polygon[]
  /**	Int32	区域内目标面积与目标总面积占比[0-100]、默认：100	M	*/
  TargetRatio!: number
}
