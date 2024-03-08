import { HowellHttpClient } from '../../data-core/requests/http-client'
import { SearchLogParams } from '../../data-core/requests/services/robot/robot.params'
import { ArmRobotRequestService } from '../../data-core/requests/services/robot/robot.service'
import { DeviceRobotLogTableArgs } from './device-robot-log.model'

export class DeviceRobotLogBusiness {
  client = new HowellHttpClient.HttpClient()
  service = new ArmRobotRequestService(this.client.http)

  load(id: string, index: number, size: number, args: DeviceRobotLogTableArgs) {
    let params = new SearchLogParams()
    params.PageIndex = index
    params.PageSize = size
    params.BeginTime = args.duration.begin
    params.EndTime = args.duration.end
    params.Major = args.major
    params.Minor = args.minor

    return this.service.logs(id, params)
    // .catch((x) => {
    //   let paged = new PagedList()
    //   paged.Page = new Page()
    //   paged.Data = []
    //   let count = 250
    //   paged.Page.PageIndex = index
    //   paged.Page.PageSize = size
    //   paged.Page.PageCount = Math.ceil(250 / size)
    //   paged.Page.RecordCount =
    //     paged.Page.PageIndex === paged.Page.PageCount ? 250 % 12 : size
    //   paged.Page.TotalRecordCount = count

    //   for (let i = 0; i < paged.Page.RecordCount; i++) {
    //     let item = new LogItem()
    //     item.Time = new Date()
    //     item.Remote = '192.168.21.149'
    //     item.Major = MajorType.Alarm
    //     item.Minor = '-'
    //     item.Desc = ((index - 1) * size + i).toString()
    //     paged.Data.push(item)
    //   }

    //   return paged
    // })
  }
}
