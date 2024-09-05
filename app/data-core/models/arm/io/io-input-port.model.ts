import { IOState } from '../../../enums/io/io-state.enum'
import { IIdModel } from '../../model.interface'

/**	IOInputPort (IO输入端口)	*/
export class IOInputPort implements IIdModel<number> {
  /**	Int32	IO输入编号，从1开始	M	*/
  Id!: number
  /**	String	IO输入名称	O	*/
  Name?: string
  /**	String	IO状态	M	*/
  State!: IOState
  /**	String	报警时的IO状态	M	*/
  AlarmState!: string
}
