import { HowellHttpClient } from '../../data-core/requests/http-client'
import { ArmDeploymentRequestService } from '../../data-core/requests/services/deployment/deployment.service'

export class AIModelDeploymentBusiness {
  client = new HowellHttpClient.HttpClient()
  service = new ArmDeploymentRequestService(this.client.http)

  list() {
    return this.service.event.array()
  }
}
