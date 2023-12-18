import { IModel } from '../model.interface'
import { CameraAIModelDTOLabel } from './camera-ai-model-dto-label.model'

/**	CameraAIModelDTO (AI摄像机模型DTO)	*/
export class CameraAIModelDTO implements IModel {
  /**	String	模型数据ID	M	*/
  ModelId!: string
  /**	Int32	模型数据类型：1:检测数据，2:分类数据	O	*/
  ModelType?: number
  /**	CameraAIModelDataLabel[]	模型数据标签	O	*/
  Labels?: CameraAIModelDTOLabel[]
}
