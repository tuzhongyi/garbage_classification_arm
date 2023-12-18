import { IIdModel } from '../model.interface'

/**	CameraAIModelDescriptor (监控点AI模型描述)	*/
export class CameraAIModelDescriptor implements IIdModel {
  /**	String	ID	M	*/
  Id!: string
  /**	String	模型ID	O	*/
  ModelId?: string
  /**	Int32	模型标签图标，[0-n]	M	*/
  Label!: number
  /**	String	数据集ID	O	*/
  DataSetId?: string
  /**	String	版本	O	*/
  Version?: string
  /**	String	应用类型，一般是设备型号	O	*/
  TransformType?: string
  /**	String	模型类型，默认：AIOP，AIHW	O	*/
  ModelType?: string
  /**	String	模型名称	O	*/
  ModelName?: string
}
