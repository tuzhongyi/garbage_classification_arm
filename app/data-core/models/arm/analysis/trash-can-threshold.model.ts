import { CanType } from '../../../enums/robot/robot-can-type.model'
import { IModel } from '../../model.interface'

/**	TrashCanThreshold (垃圾桶预警阈值)	*/
export class TrashCanThreshold implements IModel {
  /**	String	垃圾桶类型	M	*/
  CanType!: CanType
  /**	Int32	最小空桶数量，[0-n]	M	*/
  Threshold!: number
  /**	Int32	更换阈值[50-100]，达到该数值后换桶，默认：80	M	RW */
  ChangeThreshold!: number
}
