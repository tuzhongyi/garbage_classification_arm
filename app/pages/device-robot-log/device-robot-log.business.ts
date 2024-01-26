import { HowellHttpClient } from '../../data-core/requests/http-client'
import { SearchLogParams } from '../../data-core/requests/services/robot/robot.prams'
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
    params.Major = args.nodeType
    params.Minor = args.canType

    return this.service.logs(id, params).then((x) => {
      // if (x.Data.length === 0) {
      //   let count = 250
      //   x.Page.PageIndex = index
      //   x.Page.PageSize = size
      //   x.Page.PageCount = Math.ceil(250 / size)
      //   x.Page.RecordCount =
      //     x.Page.PageIndex === x.Page.PageCount ? 250 % 12 : size
      //   x.Page.TotalRecordCount = count

      //   for (let i = 0; i < x.Page.RecordCount; i++) {
      //     let item = new LogItem()
      //     item.Time = new Date()
      //     item.Remote = '192.168.21.149'
      //     item.Major = MeshNodeType.DropPort
      //     item.Minor = CanType.Wet
      //     item.Desc = ((index - 1) * size + i).toString()
      //     x.Data.push(item)
      //   }
      // }
      return x
    })
  }
}
