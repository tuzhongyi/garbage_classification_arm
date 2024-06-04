import { InputProxyChannel } from '../../../data-core/models/arm/input-proxy-channel.model'
import { HowellHttpClient } from '../../../data-core/requests/http-client'
import { ArmSystemRequestService } from '../../../data-core/requests/services/system/system.service'

export class DeviceSortationPlayChannelBusiness {
  client = new HowellHttpClient.HttpClient()
  service = new ArmSystemRequestService(this.client.http)

  private channels: InputProxyChannel[] = []

  async load() {
    if (this.channels.length === 0) {
      this.channels = await this.service.input.proxy.channel.array()
    }
    return this.channels
  }

  async get(id: number) {
    let channels = await this.load()
    return channels.find((x) => x.Id === id)
  }

  picture(id: number) {
    return this.service.input.proxy.channel.picture(id)
  }
}
