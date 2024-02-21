import { Language } from '../../../common/language'
import { CameraAIModel } from '../../../data-core/models/arm/camera-ai-model.model'
import { AIModelDeploymentDetailsTreeController } from './ai-model-deployment-details-tree.controller'

export class AIModelDeploymentDetailsController {
  constructor() {}
  private element = {
    ModelName: document.getElementById('ModelName') as HTMLInputElement,
    ModelType: document.getElementById('ModelType') as HTMLInputElement,
    TransformType: document.getElementById('TransformType') as HTMLInputElement,
    Version: document.getElementById('Version') as HTMLInputElement,
    DTO: {
      ModelType: document.getElementById(
        'CameraAIModelDTOModelType'
      ) as HTMLInputElement,
    },
  }

  tree = new AIModelDeploymentDetailsTreeController()

  load(data: CameraAIModel) {
    this.element.ModelName.value = data.ModelName ?? ''
    this.element.ModelType.value = data.ModelType ?? ''
    this.element.TransformType.value = data.TransformType ?? ''
    this.element.Version.value = data.Version ?? ''
    if (data.ModelDTO) {
      this.element.DTO.ModelType.value = Language.CameraAIModelDTOModelType(
        data.ModelDTO.ModelType
      )
      this.tree.load(data.ModelDTO.Labels)
    }
  }
}
