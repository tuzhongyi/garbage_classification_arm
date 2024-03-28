import { HowellHttpClient } from '../../../data-core/requests/http-client'
import { ArmSystemRequestService } from '../../../data-core/requests/services/system/system.service'
import { DeviceChannelListServerBusiness } from './device-channel-list-server.business'

export class DeviceChannelListBusiness {
  private client = new HowellHttpClient.HttpClient()
  private service = new ArmSystemRequestService(this.client.http)
  server = new DeviceChannelListServerBusiness(this.client.http)

  async load() {
    return this.service.input.proxy.channel.array()
  }

  async delete(ids: string[]) {
    for (let i = 0; i < ids.length; i++) {
      this.service.input.proxy.channel.delete(ids[i])
    }
    return true
  }

  picture(id: string) {
    return this.service.input.proxy.channel.picture(parseInt(id))
  }
}
