import { HowellHttpClient } from '../../data-core/requests/http-client'
import { ArmRobotRequestService } from '../../data-core/requests/services/robot/robot.service'

export class DeviceRobotListBusiness {
  client = new HowellHttpClient.HttpClient()
  service = new ArmRobotRequestService(this.client.http)

  load() {
    return this.service.array()
  }
  delete(id: string) {
    return this.service.delete(id)
  }
  async battery(id: string) {
    try {
      return await this.service.battery(id)
    } catch (error) {
      return undefined
    }
  }
}
