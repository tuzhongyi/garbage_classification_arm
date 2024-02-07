import { EventType } from '../../../data-core/enums/event-type.enum'
import { CameraAIEventRule } from '../../../data-core/models/arm/analysis/rules/camera-ai-event-rule.model'
import { GarbageServer } from '../../../data-core/models/arm/garbage-server.model'
import { HowellHttpClient } from '../../../data-core/requests/http-client'
import { ArmDeploymentRequestService } from '../../../data-core/requests/services/deployment/deployment.service'

export class AIEventRuleDetailsDeploymentBusiness {
  private client = new HowellHttpClient.HttpClient()
  private service = new ArmDeploymentRequestService(this.client.http)

  private _servers: GarbageServer[] = []

  async aimodels() {
    let server = await this.server()
    if (server) {
      return this.service.server.garbage.ai.models(server.Id)
    }
    return []
  }

  private async server() {
    if (this._servers.length === 0) {
      this._servers = await this.service.server.garbage.array()
    }
    if (this._servers.length > 0) {
      return this._servers[0]
    }
    return undefined
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
