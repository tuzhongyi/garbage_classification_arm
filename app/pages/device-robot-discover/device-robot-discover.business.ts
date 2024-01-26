import { Guid } from '../../common/tools/guid/guid'
import { RobotSearchResult } from '../../data-core/models/robot/robot-search-result.model'
import { Robot } from '../../data-core/models/robot/robot.model'
import { HowellHttpClient } from '../../data-core/requests/http-client'
import { ArmRobotRequestService } from '../../data-core/requests/services/robot/robot.service'

export class DeviceRobotDiscoverBusiness {
  client = new HowellHttpClient.HttpClient()
  service = new ArmRobotRequestService(this.client.http)

  async load() {
    let datas = await this.getData()
    let hosts = datas.map((x) => x.HostAddress)

    let results = await this.search()
    for (let i = 0; i < results.length; i++) {
      if (hosts.includes(results[i].HostAddress)) {
        results.splice(i, 1)
        i--
      }
    }
    return results
  }

  search() {
    return this.service.search(5 * 1000)
  }

  getData() {
    return this.service.array()
  }

  create(results: RobotSearchResult[]) {
    let datas = results.map((x) => this.convert(x))
    let all = datas.map((x) => this.service.create(x))
    return Promise.all(all)
  }

  convert(source: RobotSearchResult) {
    let data = new Robot()
    data.Id = Guid.NewGuid().ToString('N')
    data.HostAddress = source.HostAddress
    data.PortNo = source.PortNo
    data.Name = source.HostAddress
    data.DeviceType = source.DeviceType
    data.ProtocolType = source.ProtocolType
    data.SerialNumber = source.SerialNumber
    return data
  }
}
