import { LocaleCompare } from '../../common/tools/compare-tool/compare.tool'
import { EventRecord } from '../../data-core/models/arm/events/event-record.model'
import { HowellHttpClient } from '../../data-core/requests/http-client'
import { ArmEventRequestService } from '../../data-core/requests/services/event/event.service'

export class EventRecordResourcesBusiness {
  client = new HowellHttpClient.HttpClient()
  service = new ArmEventRequestService(this.client.http)

  data?: EventRecord

  async load(id: string, index: number) {
    let record = await this.record(id)
    if (index >= 0 && record.Resources && record.Resources.length > 0) {
      return record.Resources[index]
    }
    return undefined
  }

  count() {
    if (this.data && this.data.Resources) {
      return this.data.Resources.length
    }
    return 0
  }

  private async record(id: string) {
    if (!this.data) {
      this.data = await this.service.get(id)
      if (this.data.Resources) {
        this.data.Resources = this.data.Resources.sort((a, b) => {
          return LocaleCompare.compare(a.ResourceName, b.ResourceName)
        })
      }
    }
    return this.data
  }

  async picture(id?: string) {
    if (id) {
      return this.service.picture(id)
    }
    return ''
  }
}
