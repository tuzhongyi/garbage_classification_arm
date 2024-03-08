import { Type } from 'class-transformer'
import 'reflect-metadata'
import { IModel } from '../../model.interface'
import { TrashCanThreshold } from './trash-can-threshold.model'
/**	TrashCanWarningParams (垃圾桶预警参数)	*/
export class TrashCanWarningParams implements IModel {
  /**	TrashCanThreshold[]	桶阈值，一般情况下只有干垃圾桶和湿垃圾桶	M	*/
  @Type(() => TrashCanThreshold)
  CanThresholds!: TrashCanThreshold[]
  /**	Boolean	启用报警信号量满溢	M	RW */
  OverflowFromIOEnabled!: boolean
  /**	Boolean	启用更换垃圾桶	M	RW */
  ChangeTrashCanEnabled!: boolean
  /**	Int32	最长有效时间，单位：秒，默认：120秒（垃圾桶对象的有效时长）[30,300]	M	RW */
  TrashCanTimeout!: number
  /**	Int32	无可更换垃圾桶时长，  单位：秒，默认：120秒。[30,300]	M	RW */
  NoReplacementTimeout!: number
}
