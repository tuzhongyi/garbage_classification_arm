import { EventType } from '../../data-core/enums/event-type.enum'
import { CameraAIEvent } from '../../data-core/models/arm/camera-ai-event.model'
import { HowellHttpClient } from '../../data-core/requests/http-client'
import { ArmDeploymentRequestService } from '../../data-core/requests/services/deployment/deployment.service'
import { ArmSystemRequestService } from '../../data-core/requests/services/system/system.service'

export class AIEventDeploymentBusiness {
  private client = new HowellHttpClient.HttpClient()
  private service = {
    deployment: new ArmDeploymentRequestService(this.client.http),
    system: new ArmSystemRequestService(this.client.http),
  }

  get(type: EventType) {
    return this.service.deployment.event.get(type)
  }

  create(event: CameraAIEvent) {
    if (!event.EventTrigger.Audio) {
      event.EventTrigger.AudioId = undefined
    }
    return this.service.deployment.event.create(event)
  }
  update(event: CameraAIEvent) {
    if (!event.EventTrigger.Audio) {
      event.EventTrigger.AudioId = undefined
    }
    return this.service.deployment.event.update(event)
  }

  device() {
    return this.service.system.device.get()
  }
}
