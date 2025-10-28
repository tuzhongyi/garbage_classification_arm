import { DeviceInfo } from '../../data-core/models/arm/device-info.model'
import { HowellHttpClient } from '../../data-core/requests/http-client'
import { Initialization } from '../../data-core/requests/services/system/system.params'
import { ArmSystemRequestService } from '../../data-core/requests/services/system/system.service'

export class MainInformationDeviceBusiness {
  private client = new HowellHttpClient.HttpClient()
  private service = new ArmSystemRequestService(this.client.http)

  private cache = {
    key: '',
    device: undefined as DeviceInfo | undefined,
  }

  async load() {
    this.cache.device = await this.service.device.get()
    let index = this.cache.device.SerialNumber.lastIndexOf('-') + 1
    this.cache.key = this.cache.device.SerialNumber.substring(0, index)
    let value = this.cache.device.SerialNumber.substring(index)
    return value
  }

  async update(value: string) {
    let params = new Initialization()
    params.SerialNumber = `${this.cache.key}${value}`
    params.Model = this.cache.device?.Model
    params.DeviceType = this.cache.device?.DeviceType
    return this.service.initialize(params)
  }
}
