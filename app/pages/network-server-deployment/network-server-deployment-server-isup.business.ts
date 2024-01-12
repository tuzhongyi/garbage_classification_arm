import { HowellHttpClient } from '../../data-core/requests/http-client'
import { ArmDeploymentRequestService } from '../../data-core/requests/services/deployment/deployment.service'

export class NetworkServerDeploymentISUPServerBusiness {
  client = new HowellHttpClient.HttpClient()
  service = new ArmDeploymentRequestService(this.client.http)

  load() {
    return this.service.server.isup.array()
  }

  domain(id: string) {
    return this.service.server.isup.domains(id)
  }
}
