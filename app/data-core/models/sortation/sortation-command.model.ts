import { SortationCommandType } from '../../enums/sortation/sortation-command-type.enum'
import { IModel } from '../model.interface'

/**	SortationCommand (分拣命令)	*/
export class SortationCommand implements IModel {
  /**	String	命令类型	M	*/
  CommandType!: SortationCommandType
  /**
   * String
   * 命令参数，如果有多个命令参数，用#号分割。
   * 见：命令类型说明
   * O
   **/
  Parameters?: string
}
