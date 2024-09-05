import { instanceToPlain } from 'class-transformer'
import { IOInputPort } from '../../../../models/arm/io/io-input-port.model'
import { HowellResponse } from '../../../../models/response'
import { ArmSystemUrl } from '../../../../urls/arm/system/system.url'
import { HowellAuthHttp } from '../../../auth/howell-auth-http'
import { HowellResponseProcess } from '../../../service-process'

export class SystemIOInputRequestService {
  constructor(private http: HowellAuthHttp) {}

  array() {
    let url = ArmSystemUrl.io.input.basic()
    return this.http.get<HowellResponse<IOInputPort[]>>(url).then((x) => {
      return HowellResponseProcess.array(x, IOInputPort)
    })
  }
  get(id: number) {
    let url = ArmSystemUrl.io.input.item(id)
    return this.http.get<HowellResponse<IOInputPort>>(url).then((x) => {
      return HowellResponseProcess.item(x, IOInputPort)
    })
  }
  update(data: IOInputPort) {
    let url = ArmSystemUrl.io.input.item(data.Id)
    let plain = instanceToPlain(data)
    return this.http
      .put<any, HowellResponse<IOInputPort>>(url, plain)
      .then((x) => {
        return HowellResponseProcess.item(x, IOInputPort)
      })
  }
}
