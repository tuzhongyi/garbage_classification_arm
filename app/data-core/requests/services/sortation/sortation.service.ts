import { instanceToPlain } from 'class-transformer'
import { SortationCapability } from '../../../models/capabilities/sortation/sortation-capability.model'
import { HowellResponse } from '../../../models/response'
import { SortationCalibration } from '../../../models/sortation/sortation-calibration.model'
import { SortationCommand } from '../../../models/sortation/sortation-command.model'
import { SortationDevice } from '../../../models/sortation/sortation-device.model'
import { SortationGrid } from '../../../models/sortation/sortation-grid.model'
import { ArmSortationUrl } from '../../../urls/arm/sortation/sortation.url'
import { HowellAuthHttp } from '../../auth/howell-auth-http'
import { HowellResponseProcess } from '../../service-process'
import { GetSortationGridsParams } from './sortation.params'

export class ArmSortationRequestService {
  constructor(private http: HowellAuthHttp) {}

  private _device?: ArmSortationDeviceRequestService
  public get device(): ArmSortationDeviceRequestService {
    if (!this._device) {
      this._device = new ArmSortationDeviceRequestService(this.http)
    }
    return this._device
  }

  capability() {
    let url = ArmSortationUrl.capability()
    return this.http.get<HowellResponse<SortationCapability>>(url).then((x) => {
      return HowellResponseProcess.item(x, SortationCapability)
    })
  }
}

class ArmSortationDeviceRequestService {
  constructor(private http: HowellAuthHttp) {}
  array() {
    let url = ArmSortationUrl.device.basic()
    return this.http.get<HowellResponse<SortationDevice[]>>(url).then((x) => {
      return HowellResponseProcess.array(x, SortationDevice)
    })
  }
  create(data: SortationDevice) {
    let url = ArmSortationUrl.device.basic()
    let plain = instanceToPlain(data)
    return this.http
      .post<any, HowellResponse<SortationDevice>>(url, plain)
      .then((x) => {
        return HowellResponseProcess.item(x, SortationDevice)
      })
  }
  get(id: string) {
    let url = ArmSortationUrl.device.item(id)
    return this.http.get<HowellResponse<SortationDevice>>(url).then((x) => {
      return HowellResponseProcess.item(x, SortationDevice)
    })
  }
  update(data: SortationDevice) {
    let url = ArmSortationUrl.device.item(data.Id)
    let plain = instanceToPlain(data)
    return this.http
      .put<any, HowellResponse<SortationDevice>>(url, plain)
      .then((x) => {
        return HowellResponseProcess.item(x, SortationDevice)
      })
  }
  delete(id: string) {
    let url = ArmSortationUrl.device.item(id)
    return this.http.delete<HowellResponse<SortationDevice>>(url).then((x) => {
      return HowellResponseProcess.item(x, SortationDevice)
    })
  }

  search() {
    let url = ArmSortationUrl.device.search()
    return this.http.get<HowellResponse<SortationDevice[]>>(url).then((x) => {
      return HowellResponseProcess.array(x, SortationDevice)
    })
  }

  testing(id: string) {
    let url = ArmSortationUrl.device.testing(id)
    return this.http.post<HowellResponse<SortationDevice>>(url).then((x) => {
      return HowellResponseProcess.item(x, SortationDevice)
    })
  }
  command(id: string, command: SortationCommand) {
    let url = ArmSortationUrl.device.command(id)
    let plain = instanceToPlain(command)
    return this.http.post<any, string>(url, plain).then((x) => {
      return x
    })
  }

  private _calibration?: ArmSortationDeviceCalibrationRequestService
  public get calibration(): ArmSortationDeviceCalibrationRequestService {
    if (!this._calibration) {
      this._calibration = new ArmSortationDeviceCalibrationRequestService(
        this.http
      )
    }
    return this._calibration
  }
}

class ArmSortationDeviceCalibrationRequestService {
  constructor(private http: HowellAuthHttp) {}

  get(id: string) {
    let url = ArmSortationUrl.device.calibration(id).basic()
    return this.http
      .get<HowellResponse<SortationCalibration>>(url)
      .then((x) => {
        return HowellResponseProcess.item(x, SortationCalibration)
      })
  }
  update(data: SortationCalibration) {
    let url = ArmSortationUrl.device.calibration(data.DeviceId).basic()
    let plain = instanceToPlain(data)
    return this.http
      .put<any, HowellResponse<SortationCalibration>>(url, plain)
      .then((x) => {
        return HowellResponseProcess.item(x, SortationCalibration)
      })
  }
  delete(id: string) {
    let url = ArmSortationUrl.device.calibration(id).basic()
    return this.http
      .delete<HowellResponse<SortationCalibration>>(url)
      .then((x) => {
        return HowellResponseProcess.item(x, SortationCalibration)
      })
  }

  grid(params: GetSortationGridsParams) {
    let url = ArmSortationUrl.device.calibration().grid()
    let plain = instanceToPlain(params)
    return this.http
      .post<any, HowellResponse<SortationGrid[]>>(url, plain)
      .then((x) => {
        return HowellResponseProcess.array(x, SortationGrid)
      })
  }
}
