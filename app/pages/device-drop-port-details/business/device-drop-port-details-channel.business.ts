import { InputProxyChannel } from '../../../data-core/models/arm/input-proxy-channel.model'
import { HowellHttpClient } from '../../../data-core/requests/http-client'
import { ArmSystemRequestService } from '../../../data-core/requests/services/system/system.service'

export class DeviceDropPortDetailsChannelBusiness {
  private service: ArmSystemRequestService
  constructor(client: HowellHttpClient.HttpClient) {
    this.service = new ArmSystemRequestService(client.http)
  }

  channels: InputProxyChannel[] = []

  async load() {
    if (this.channels.length === 0) {
      this.channels = await this.service.input.proxy.channel.array()
    }
    return this.channels
  }

  async picture<T = string>(channelId: T) {
    return this.service.input.proxy.channel.picture(channelId)
  }

  get default() {
    return this.load().then((channels) => {
      if (channels.length > 0) {
        return channels[0]
      }
      return undefined
    })
  }
}
