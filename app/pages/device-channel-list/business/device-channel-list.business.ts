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

  delete(ids: string[]) {
    let all = ids.map((id) => {
      return this.service.input.proxy.channel.delete(id)
    })
    return Promise.all(all)
  }

  picture(id: string) {
    return this.service.input.proxy.channel.picture(id)
  }
}
