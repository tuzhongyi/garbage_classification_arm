import { Compactor } from '../../../data-core/models/compactor/compactor.model'
import { HowellHttpClient } from '../../../data-core/requests/http-client'
import { ArmCompactorRequestService } from '../../../data-core/requests/services/compactor/compactor.service'
import { DeviceCompactorInfoRobotBusiness } from './device-compactor-info-robot.business'

export class DeviceCompactorInfoBusiness {
  private client = new HowellHttpClient.HttpClient()
  private service = new ArmCompactorRequestService(this.client.http)
  robot = new DeviceCompactorInfoRobotBusiness(this.client)

  load(id: string) {
    return this.service.get(id)
  }

  update(data: Compactor) {
    return this.service.update(data)
  }
}
