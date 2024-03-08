import { Deployment } from '../../data-core/models/arm/deployment.model'
import { HowellHttpClient } from '../../data-core/requests/http-client'
import { ArmSystemRequestService } from '../../data-core/requests/services/system/system.service'
import { NetworkServerDeploymentGarbageServerBusiness } from './network-server-deployment-server-garbage.business'
import { NetworkServerDeploymentISUPServerBusiness } from './network-server-deployment-server-isup.business'
import { NetworkServerDeploymentSource } from './network-server-deployment.model'

export class NetworkServerDeploymentBusiness {
  client = new HowellHttpClient.HttpClient()
  service = new ArmSystemRequestService(this.client.http)

  server = {
    garbage: new NetworkServerDeploymentGarbageServerBusiness(),
    isup: new NetworkServerDeploymentISUPServerBusiness(),
  }

  load(): NetworkServerDeploymentSource {
    return {
      garbage: this.server.garbage.load(),
      isup: this.server.isup.load(),
    }
  }

  get() {
    return this.service.network.deployment.get()
  }

  update(data: Deployment) {
    return this.service.network.deployment.update(data)
  }
  test() {
    return this.service.network.deployment.testing()
  }
}
