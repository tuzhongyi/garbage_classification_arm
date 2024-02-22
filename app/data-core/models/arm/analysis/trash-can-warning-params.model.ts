import { Type } from 'class-transformer'
import 'reflect-metadata'
import { IModel } from '../../model.interface'
import { TrashCanThreshold } from './trash-can-threshold.model'
/**	TrashCanWarningParams (垃圾桶预警参数)	*/
export class TrashCanWarningParams implements IModel {
  /**	TrashCanTreshold[]	桶阈值，一般情况下只有干垃圾桶和湿垃圾桶	M	*/
  @Type(() => TrashCanThreshold)
  CanThresholds!: TrashCanThreshold[]
}
