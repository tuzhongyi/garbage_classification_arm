import { InputProxyChannel } from '../../../data-core/models/arm/input-proxy-channel.model'
import { HowellHttpClient } from '../../../data-core/requests/http-client'
import { ArmSystemRequestService } from '../../../data-core/requests/services/system/system.service'

export class AIAnalysisServerSourceChannelBusiness {
  client = new HowellHttpClient.HttpClient()
  service = new ArmSystemRequestService(this.client.http)

  private channels: InputProxyChannel[] = []

  async array() {
    if (this.channels.length == 0) {
      this.channels = await this.service.input.proxy.channel.array()
    }
    return this.channels
  }

  get(sourceId: string) {
    return this.array().then((channels) => {
      return channels.find((x) => x.Guid === sourceId)
    })
  }

  picture(sourceId: string) {
    return this.get(sourceId).then((channel) => {
      if (channel) {
        return this.service.input.proxy.channel.picture(channel.Id)
      }
    })
  }
}
