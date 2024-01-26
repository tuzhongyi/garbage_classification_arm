import { IModel } from '../../model.interface'

/**	ModelLabel (模型标签)	*/
export class ModelLabel implements IModel {
  /**	String	标签ID	M	*/
  LabelId!: string
  /**	String	标签数值	M	*/
  LabelValue!: string
  /**	String	数值	O	*/
  DataValue?: string
  /**	String	标签名称	M	*/
  LabelName!: string
}
