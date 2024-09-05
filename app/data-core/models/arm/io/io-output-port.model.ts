import { IOState } from '../../../enums/io/io-state.enum'
import { IIdModel } from '../../model.interface'

/**	IOOutputPort (IO输出端口)	*/
export class IOOutputPort implements IIdModel<number> {
  /**	Int32	IO输出编号，从1开始	M	*/
  Id!: number
  /**	String	IO输出名称	O	*/
  Name?: string
  /**	String	IO状态	M	*/
  State!: IOState
  /**	Int32	延迟时长，单位：秒，0或者null表示手动控制。	O	*/
  Delay?: number
}
