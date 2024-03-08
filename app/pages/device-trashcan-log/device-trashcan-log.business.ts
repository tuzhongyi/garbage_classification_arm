import { HowellHttpClient } from '../../data-core/requests/http-client'
import { GetRecordsParams } from '../../data-core/requests/services/trash-cans/trash-cans.params'
import { ArmTrashCansRequestService } from '../../data-core/requests/services/trash-cans/trash-cans.service'
import { DeviceTrashCanLogTableArgs } from './device-trashcan-log.model'

export class DeviceTrashCanLogBusiness {
  client = new HowellHttpClient.HttpClient()
  service = new ArmTrashCansRequestService(this.client.http)

  load(index: number, size: number, args: DeviceTrashCanLogTableArgs) {
    let params = new GetRecordsParams()
    params.PageIndex = index
    params.PageSize = size
    params.Date = args.date

    return this.service.records(params)
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
