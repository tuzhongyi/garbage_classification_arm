import { InputProxyChannel } from '../../../data-core/models/arm/input-proxy-channel.model'
import { HowellAuthHttp } from '../../../data-core/requests/auth/howell-auth-http'
import { ArmSystemRequestService } from '../../../data-core/requests/services/system/system.service'

export class DeviceDropPortListChannelBusiness {
  constructor(http: HowellAuthHttp) {
    this.service = new ArmSystemRequestService(http)
  }
  private service: ArmSystemRequestService

  private channels: InputProxyChannel[] = []

  async load() {
    if (this.channels.length == 0) {
      this.channels = await this.service.input.proxy.channel.array()
    }
    return this.channels
  }

  async get<T = string>(id: T) {
    let channels = await this.load()
    return channels.find((x) => x.Guid === id || x.Id.toString() == id)
  }

  picture(id: number) {
    return this.service.input.proxy.channel.picture(id)
  }
}
