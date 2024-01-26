import { EnumNameValue } from '../../capabilities/enum-name-value.model'
import { IModel } from '../../model.interface'

/**	AnalysisServerCapability (分析服务器能力)	*/
export class AnalysisServerCapability implements IModel {
  /**	EnumNameValue[]	来源协议类型	O	*/
  VideoSourceProtocolTypes?: EnumNameValue[]
  /**	EnumNameValue[]	来源模型	O	*/
  VideoSourceModes?: EnumNameValue[]
}
