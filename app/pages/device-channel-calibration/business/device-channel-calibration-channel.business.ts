import { ChannelCalibration } from '../../../data-core/models/arm/channel-calibration.model'
import { HowellHttpClient } from '../../../data-core/requests/http-client'
import { ArmSystemRequestService } from '../../../data-core/requests/services/system/system.service'

export class DeviceChannelCalibrationChannelBusiness {
  client = new HowellHttpClient.HttpClient()
  service = new ArmSystemRequestService(this.client.http)

  load() {
    return this.service.input.proxy.channel.array()
  }

  calibration = {
    get: (id: string) => {
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

  picture(id: string) {
    return this.service.input.proxy.channel.picture(id)
  }
}
