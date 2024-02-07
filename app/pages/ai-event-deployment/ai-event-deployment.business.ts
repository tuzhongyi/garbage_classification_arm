import { EventType } from '../../data-core/enums/event-type.enum'
import { CameraAIEvent } from '../../data-core/models/arm/camera-ai-event.model'
import { HowellHttpClient } from '../../data-core/requests/http-client'
import { ArmDeploymentRequestService } from '../../data-core/requests/services/deployment/deployment.service'

export class AIEventDeploymentBusiness {
  client = new HowellHttpClient.HttpClient()
  service = new ArmDeploymentRequestService(this.client.http)

  get(type: EventType) {
    return this.service.event.get(type)
  }

  create(event: CameraAIEvent) {
    if (!event.EventTrigger.Audio) {
      event.EventTrigger.AudioId = undefined
    }
    return this.service.event.create(event)
  }
  update(event: CameraAIEvent) {
    if (!event.EventTrigger.Audio) {
      event.EventTrigger.AudioId = undefined
    }
    return this.service.event.update(event)
  }
}
