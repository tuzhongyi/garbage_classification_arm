import { HowellHttpClient } from '../../data-core/requests/http-client'
import { ArmDeploymentRequestService } from '../../data-core/requests/services/deployment/deployment.service'

export class NetworkServerDeploymentGarbageServerBusiness {
  client = new HowellHttpClient.HttpClient()
  service = new ArmDeploymentRequestService(this.client.http)

  load() {
    return this.service.server.garbage.array()
  }
}
