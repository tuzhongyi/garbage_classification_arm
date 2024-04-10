import { instanceToPlain } from 'class-transformer'
import { EventRecord } from '../../../models/arm/events/event-record.model'
import { EventCapability } from '../../../models/capabilities/events/event-capability.model'
import { PagedList } from '../../../models/page-list.model'
import { HowellResponse } from '../../../models/response'
import { ArmEventUrl } from '../../../urls/arm/event/event.url'
import { HowellAuthHttp } from '../../auth/howell-auth-http'
import { HowellResponseProcess } from '../../service-process'
import { GetEventRecordsParams } from './event.params'

export class ArmEventRequestService {
  constructor(private http: HowellAuthHttp) {}

  capability() {
    let url = ArmEventUrl.capability()
    return this.http.get<HowellResponse<EventCapability>>(url).then((x) => {
      return HowellResponseProcess.item(x, EventCapability)
    })
  }

  list(params: GetEventRecordsParams) {
    let url = ArmEventUrl.record.basic()
    let plain = instanceToPlain(params)
    return this.http
      .post<any, HowellResponse<PagedList<EventRecord>>>(url, plain)
      .then((x) => {
        return HowellResponseProcess.paged(x, EventRecord)
      })
  }

  get(id: string) {
    let url = ArmEventUrl.record.item(id)
    return this.http.get<HowellResponse<EventRecord>>(url).then((x) => {
      return HowellResponseProcess.item(x, EventRecord)
    })
  }

  picture(id: string) {
    return ArmEventUrl.picture(id)
  }
}
