import { Robot } from '../../data-core/models/robot/robot.model'
import { HowellHttpClient } from '../../data-core/requests/http-client'
import { ArmRobotRequestService } from '../../data-core/requests/services/robot/robot.service'

export class DeviceRobotDetailsBusiness {
  client = new HowellHttpClient.HttpClient()
  service = new ArmRobotRequestService(this.client.http)
  create(data: Robot) {
    return this.service.create(data)
  }
}
