import { instanceToPlain } from 'class-transformer'
import { TrashCanRecord } from '../../../models/arm/analysis/trash-can-record'
import { TrashCanWarningParams } from '../../../models/arm/analysis/trash-can-warning-params.model'
import { TrashCanCapability } from '../../../models/capabilities/robot/trash-can-capability.model'
import { PagedList } from '../../../models/page-list.model'
import { HowellResponse } from '../../../models/response'
import { RobotTrashCan } from '../../../models/robot/robot-trash-can.model'
import { ArmTrashCansUrl } from '../../../urls/arm/trash-cans/trash-cans.url'
import { HowellAuthHttp } from '../../auth/howell-auth-http'
import { HowellResponseProcess } from '../../service-process'
import { GetRecordsParams } from './trash-cans.params'

export class ArmTrashCansRequestService {
  constructor(private http: HowellAuthHttp) {}

  array() {
    let url = ArmTrashCansUrl.basic()
    return this.http.get<HowellResponse<RobotTrashCan[]>>(url).then((x) => {
      return HowellResponseProcess.array(x, RobotTrashCan)
    })
  }
  capability() {
    let url = ArmTrashCansUrl.capability()
    return this.http.get<HowellResponse<TrashCanCapability>>(url).then((x) => {
      return HowellResponseProcess.item(x, TrashCanCapability)
    })
  }

  records(params: GetRecordsParams) {
    let url = ArmTrashCansUrl.records()
    let plain = instanceToPlain(params)
    return this.http
      .post<any, HowellResponse<PagedList<TrashCanRecord>>>(url, plain)
      .then((x) => {
        return HowellResponseProcess.paged(x, TrashCanRecord)
      })
  }

  private _warning?: { params: ArmTrashCanWarningParamsRequestService }
  public get warning(): { params: ArmTrashCanWarningParamsRequestService } {
    if (!this._warning) {
      this._warning = {
        params: new ArmTrashCanWarningParamsRequestService(this.http),
      }
    }
    return this._warning
  }
}

class ArmTrashCanWarningParamsRequestService {
  constructor(private http: HowellAuthHttp) {}

  get() {
    let url = ArmTrashCansUrl.warning.params()
    return this.http
      .get<HowellResponse<TrashCanWarningParams>>(url)
      .then((x) => {
        return HowellResponseProcess.item(x, TrashCanWarningParams)
      })
  }
  update(data: TrashCanWarningParams) {
    let url = ArmTrashCansUrl.warning.params()
    let plain = instanceToPlain(data)
    return this.http
      .put<any, HowellResponse<TrashCanWarningParams>>(url, plain)
      .then((x) => {
        return HowellResponseProcess.item(x, TrashCanWarningParams)
      })
  }
}
