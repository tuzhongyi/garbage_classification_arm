import { CompactorCommandType } from '../../../enums/compactor/compactor-command-type.enum'
import { IModel } from '../../../models/model.interface'

/**	CompactorCommand (垃圾压缩设备命令)	*/
export class CompactorCommand implements IModel {
  /**	String	命令类型	M	*/
  CommandType!: CompactorCommandType
  /**	Int32	命令参数，默认：0，目前没有使用，填0就行	M	*/
  Parameter = 0
}
