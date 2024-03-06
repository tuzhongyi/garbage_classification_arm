import { ChannelCalibration } from '../../../data-core/models/arm/channel-calibration.model'
import { InputProxyChannel } from '../../../data-core/models/arm/input-proxy-channel.model'
import { HowellHttpClient } from '../../../data-core/requests/http-client'
import { ArmSystemRequestService } from '../../../data-core/requests/services/system/system.service'

export class DeviceChannelCalibrationChannelBusiness {
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

  calibration = {
    get: (id: number) => {
      return this.service.input.proxy.channel.calibration
        .get(id)
        .then((data) => {
          if (data) {
            return data
          }
          throw new Error('Calibration not found')
        })
    },
    set: (data: ChannelCalibration) => {
      return this.service.input.proxy.channel.calibration.set(data)
    },
  }

  picture(id: number) {
    return this.service.input.proxy.channel.picture(id)
  }
}
