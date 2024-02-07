import { HowellHttpClient } from '../../../data-core/requests/http-client'
import { ArmSystemRequestService } from '../../../data-core/requests/services/system/system.service'

export class AIEventRuleDetailsChannelBusiness {
  client = new HowellHttpClient.HttpClient()
  service = new ArmSystemRequestService(this.client.http)
  async load() {
    return this.service.input.proxy.channel.array()
  }

  picture(id: string) {
    return this.service.input.proxy.channel.picture(id)
  }
}
