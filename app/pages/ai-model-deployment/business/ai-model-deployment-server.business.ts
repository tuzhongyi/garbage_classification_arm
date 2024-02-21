import { GarbageServer } from '../../../data-core/models/arm/garbage-server.model'
import { ArmDeploymentRequestService } from '../../../data-core/requests/services/deployment/deployment.service'

export class AIModelDeploymentServerBusiness {
  constructor(private service: ArmDeploymentRequestService) {}
  private _servers: GarbageServer[] = []
  async get() {
    if (this._servers.length === 0) {
      this._servers = await this.service.server.garbage.array()
    }
    if (this._servers.length > 0) {
      return this._servers[0]
    }
    return undefined
  }
}
