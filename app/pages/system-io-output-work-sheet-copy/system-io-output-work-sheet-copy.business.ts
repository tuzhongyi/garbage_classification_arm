import { IOOutputWorkSheet } from '../../data-core/models/arm/io/io-output-work-sheet.model'
import { HowellHttpClient } from '../../data-core/requests/http-client'
import { ArmSystemRequestService } from '../../data-core/requests/services/system/system.service'

export class SystemIOOutputWorkSheetCopyBusiness {
  private client = new HowellHttpClient.HttpClient()
  private service = new ArmSystemRequestService(this.client.http)

  load() {
    return this.service.io.output.array()
  }

  async copy(datas: IOOutputWorkSheet[]) {
    let result = true
    for (let i = 0; i < datas.length; i++) {
      try {
        await this.service.io.output.work.sheet.set(datas[i])
      } catch (error) {
        result = false
      }
    }
    return result
  }
}
