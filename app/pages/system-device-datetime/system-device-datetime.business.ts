import { instanceToPlain, plainToInstance } from 'class-transformer'
import { SystemTime } from '../../data-core/models/arm/system-time.model'
import { DeviceCapability } from '../../data-core/models/capabilities/arm/device-capability.model'
import { HowellHttpClient } from '../../data-core/requests/http-client'
import { ArmSystemRequestService } from '../../data-core/requests/services/system/system.service'

export class SystemDeviceDatetimeBusiness {
  private client = new HowellHttpClient.HttpClient()
  private service = new ArmSystemRequestService(this.client.http)
  private _capability?: DeviceCapability
  load() {
    return this.service.time.get()
  }
  update(model: SystemTime) {
    let plain = instanceToPlain(model)
    let data = plainToInstance(SystemTime, plain)
    return this.service.time.update(data)
  }

  async capability() {
    if (this._capability) {
      return this._capability
    }
    this._capability = await this.service.capability()
    return this._capability
  }
}
