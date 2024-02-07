import { EventType } from '../../data-core/enums/event-type.enum'
import { HowellHttpClient } from '../../data-core/requests/http-client'
import { ArmDeploymentRequestService } from '../../data-core/requests/services/deployment/deployment.service'

export class AIEventRuleBusiness {
  client = new HowellHttpClient.HttpClient()
  service = new ArmDeploymentRequestService(this.client.http)

  rules(type: EventType) {
    return this.service.event.rule.array(type)
  }

  events() {
    return this.service.event.array()
  }
}
