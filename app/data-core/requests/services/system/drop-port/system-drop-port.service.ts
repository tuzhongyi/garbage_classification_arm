import { instanceToPlain } from 'class-transformer'
import { DropPortConfig } from '../../../../models/arm/io/drop-port-config.model'
import { HowellResponse } from '../../../../models/response'
import { ArmSystemUrl } from '../../../../urls/arm/system/system.url'
import { HowellAuthHttp } from '../../../auth/howell-auth-http'
import { HowellResponseProcess } from '../../../service-process'

export class SystemDropPortRequestService {
  constructor(private http: HowellAuthHttp) {}

  array() {
    let url = ArmSystemUrl.drop.port.basic()
    return this.http.get<HowellResponse<DropPortConfig[]>>(url).then((x) => {
      return HowellResponseProcess.array(x, DropPortConfig)
    })
  }
  create(data: DropPortConfig) {
    let url = ArmSystemUrl.drop.port.basic()
    let plain = instanceToPlain(data)
    return this.http
      .post<any, HowellResponse<DropPortConfig>>(url, plain)
      .then((x) => {
        return HowellResponseProcess.item(x, DropPortConfig)
      })
  }

  get<T = string>(id: T) {
    let url = ArmSystemUrl.drop.port.item(id)
    return this.http.get<HowellResponse<DropPortConfig>>(url).then((x) => {
      return HowellResponseProcess.item(x, DropPortConfig)
    })
  }
  delete<T = string>(id: T) {
    let url = ArmSystemUrl.drop.port.item(id)
    return this.http.delete<HowellResponse<DropPortConfig>>(url).then((x) => {
      return HowellResponseProcess.item(x, DropPortConfig)
    })
  }
  update(data: DropPortConfig) {
    let url = ArmSystemUrl.drop.port.item(data.Id)
    let plain = instanceToPlain(data)
    return this.http
      .put<any, HowellResponse<DropPortConfig>>(url, plain)
      .then((x) => {
        return HowellResponseProcess.item(x, DropPortConfig)
      })
  }
}
