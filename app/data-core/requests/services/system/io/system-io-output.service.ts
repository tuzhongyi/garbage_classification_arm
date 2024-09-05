import { instanceToPlain } from 'class-transformer'
import { IOOutputPort } from '../../../../models/arm/io/io-output-port.model'
import { IOOutputWorkSheet } from '../../../../models/arm/io/io-output-work-sheet.model'
import { HowellResponse } from '../../../../models/response'
import { ArmSystemUrl } from '../../../../urls/arm/system/system.url'
import { HowellAuthHttp } from '../../../auth/howell-auth-http'
import { HowellResponseProcess } from '../../../service-process'
import { SetIOStateParams } from './system-io-output.params'

export class SystemIOOutputRequestService {
  constructor(private http: HowellAuthHttp) {}

  array() {
    let url = ArmSystemUrl.io.output.basic()
    return this.http.get<HowellResponse<IOOutputPort[]>>(url).then((x) => {
      return HowellResponseProcess.array(x, IOOutputPort)
    })
  }
  get(id: number) {
    let url = ArmSystemUrl.io.output.item(id)
    return this.http.get<HowellResponse<IOOutputPort>>(url).then((x) => {
      return HowellResponseProcess.item(x, IOOutputPort)
    })
  }
  update(data: IOOutputPort) {
    let url = ArmSystemUrl.io.output.item(data.Id)
    let plain = instanceToPlain(data)
    return this.http
      .put<any, HowellResponse<IOOutputPort>>(url, plain)
      .then((x) => {
        return HowellResponseProcess.item(x, IOOutputPort)
      })
  }

  state(id: number, params: SetIOStateParams) {
    let url = ArmSystemUrl.io.output.state(id)
    let plain = instanceToPlain(params)
    return this.http
      .put<any, HowellResponse<IOOutputPort>>(url, plain)
      .then((x) => {
        return HowellResponseProcess.item(x, IOOutputPort)
      })
  }

  private _work?: { sheet: SystemIOOutputWorkSheetRequestService }
  public get work() {
    if (!this._work) {
      this._work = {
        sheet: new SystemIOOutputWorkSheetRequestService(this.http),
      }
    }
    return this._work
  }
}

class SystemIOOutputWorkSheetRequestService {
  constructor(private http: HowellAuthHttp) {}

  get(id: number) {
    let url = ArmSystemUrl.io.output.worksheet(id)
    return this.http.get<HowellResponse<IOOutputWorkSheet>>(url).then((x) => {
      return HowellResponseProcess.item(x, IOOutputWorkSheet)
    })
  }

  set(data: IOOutputWorkSheet) {
    let url = ArmSystemUrl.io.output.worksheet(data.Id)
    let plain = instanceToPlain(data)
    return this.http
      .put<any, HowellResponse<IOOutputWorkSheet>>(url, plain)
      .then((x) => {
        return HowellResponseProcess.item(x, IOOutputWorkSheet)
      })
  }
}
