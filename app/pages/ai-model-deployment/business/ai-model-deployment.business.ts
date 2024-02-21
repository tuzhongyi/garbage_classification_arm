import { CameraAIModel } from '../../../data-core/models/arm/camera-ai-model.model'
import { HowellHttpClient } from '../../../data-core/requests/http-client'
import { ArmDeploymentRequestService } from '../../../data-core/requests/services/deployment/deployment.service'
import { AIModelDeploymentServerBusiness } from './ai-model-deployment-server.business'

export class AIModelDeploymentBusiness {
  client = new HowellHttpClient.HttpClient()
  service = new ArmDeploymentRequestService(this.client.http)
  server = new AIModelDeploymentServerBusiness(this.service)
  private _aimodels: CameraAIModel[] = []

  async list() {
    if (this._aimodels.length === 0) {
      let server = await this.server.get()
      if (server) {
        this._aimodels = await this.service.server.garbage.ai.models(server.Id)
      }
    }
    return this._aimodels
  }

  // async get(type:EventType){
  //   let array = await this.list()
  //   return array.find(x => x.ModelType === type)
  // }
}
