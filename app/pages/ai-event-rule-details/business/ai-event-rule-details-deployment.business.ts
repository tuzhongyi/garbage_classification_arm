import { EventType } from '../../../data-core/enums/event-type.enum'
import { CameraAIEventRule } from '../../../data-core/models/arm/analysis/rules/camera-ai-event-rule.model'
import { GarbageServer } from '../../../data-core/models/arm/garbage-server.model'
import { HowellHttpClient } from '../../../data-core/requests/http-client'
import { GetSupportedModelsParams } from '../../../data-core/requests/services/deployment/deployment.params'
import { ArmDeploymentRequestService } from '../../../data-core/requests/services/deployment/deployment.service'

export class AIEventRuleDetailsDeploymentBusiness {
  private client = new HowellHttpClient.HttpClient()
  private service = new ArmDeploymentRequestService(this.client.http)

  private _servers: GarbageServer[] = []

  async aimodels(type: EventType, channelId: number) {
    let params = new GetSupportedModelsParams()
    params.ChannelId = channelId
    params.EventType = type
    return this.service.event.aimodels(params)
  }

  get(type: EventType, id: string) {
    return this.service.event.rule.get(type, id)
  }

  create(data: CameraAIEventRule) {
    return this.service.event.rule.create(data)
  }
  update(data: CameraAIEventRule) {
    return this.service.event.rule.update(data)
  }
}
