import { IParams } from '../../../models/params.interface'

export class SystemCommand implements IParams {
  /**	String	命令内容	M	R */
  Content!: string
}
