import { Guid } from '../../../common/tools/guid/guid'
import { Compactor } from '../../../data-core/models/compactor/compactor.model'
import { HowellHttpClient } from '../../../data-core/requests/http-client'
import { ArmCompactorRequestService } from '../../../data-core/requests/services/compactor/compactor.service'
import { DeviceCompactorDetailsRobotBusiness } from './device-compactor-details-robot.business'

export class DeviceCompactorDetailsBusiness {
  private client = new HowellHttpClient.HttpClient()
  private service = new ArmCompactorRequestService(this.client.http)
  public robot = new DeviceCompactorDetailsRobotBusiness(this.client)
  async create(data: Compactor) {
    data.Id = Guid.NewGuid().ToString('N')
    return this.service.create(data)
  }
}
