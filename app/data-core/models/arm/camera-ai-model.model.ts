import { IIdModel } from '../model.interface'
import { CameraAIModelDTO } from './camera-ai-model-dto.model'

/**	CameraAIModel (监控点AI模型)	*/
export class CameraAIModel implements IIdModel {
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
  /**	CameraAIModelDTO	模型数据传输对象的格式	O	*/
  ModelDTO?: CameraAIModelDTO
  /**	String	JSON文件的BASE64，创建时必须填写	O	*/
  ModelJSON?: string
}
