import { HowellHttpClient } from '../../data-core/requests/http-client'
import { GetEventRecordsParams } from '../../data-core/requests/services/event/event.params'
import { ArmEventRequestService } from '../../data-core/requests/services/event/event.service'
import { EventRecordListTableArgs } from './event-record-list.model'

export class EventRecordListBusiness {
  client = new HowellHttpClient.HttpClient()
  service = new ArmEventRequestService(this.client.http)

  load(index: number, size: number, args: EventRecordListTableArgs) {
    let params = new GetEventRecordsParams()
    params.PageIndex = index
    params.PageSize = size
    params.BeginTime = args.duration.begin
    params.EndTime = args.duration.end
    params.EventType = args.type
    params.Uploaded = args.uploaded

    return this.service.list(params)
  }

  picture(id: string) {
    return this.service.picture(id)
  }
}
