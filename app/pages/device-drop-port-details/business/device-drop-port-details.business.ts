import { DropPortConfig } from '../../../data-core/models/arm/io/drop-port-config.model'
import { HowellHttpClient } from '../../../data-core/requests/http-client'
import { ArmSystemRequestService } from '../../../data-core/requests/services/system/system.service'
import { DeviceDropPortDetailsChannelBusiness } from './device-drop-port-details-channel.business'
import { DeviceDropPortDetailsOutputBusiness } from './device-drop-port-details-output.business'

export class DeviceDropPortDetailsBusiness {
  private client = new HowellHttpClient.HttpClient()
  private service = new ArmSystemRequestService(this.client.http)

  public channel = new DeviceDropPortDetailsChannelBusiness(this.client)
  public output = new DeviceDropPortDetailsOutputBusiness(this.client)

  get(id: number) {
    return this.service.drop.port.get(id)
  }

  create(data: DropPortConfig) {
    return this.service.drop.port.create(data)
  }

  update(data: DropPortConfig) {
    return this.service.drop.port.update(data)
  }

  picture<T = string>(id: T) {
    return this.channel.picture(id)
  }
}
