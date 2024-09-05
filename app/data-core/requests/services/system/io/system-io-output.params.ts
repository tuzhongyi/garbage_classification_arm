import { IOState } from '../../../../enums/io/io-state.enum'
import { IParams } from '../../../../models/params.interface'

export class SetIOStateParams implements IParams {
  /**	String	IO状态	M */
  State!: IOState
}
