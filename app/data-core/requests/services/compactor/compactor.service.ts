import { instanceToPlain } from 'class-transformer'
import { IPAddress } from '../../../models/arm/ip-address.model'
import { CompactorCapability } from '../../../models/capabilities/compactor/compactor-capability.model'
import { CompactorParams } from '../../../models/compactor/compactor-params.model'
import { Compactor } from '../../../models/compactor/compactor.model'
import { CompressionTask } from '../../../models/compactor/compression-task.model'
import { HowellResponse } from '../../../models/response'
import { ArmCompactorUrl } from '../../../urls/arm/compactor/compactor.url'
import { HowellAuthHttp } from '../../auth/howell-auth-http'
import { HowellResponseProcess } from '../../service-process'
import { CompactorCommand } from './compactor.params'

export class ArmCompactorRequestService {
  constructor(private http: HowellAuthHttp) {}

  capability() {
    let url = ArmCompactorUrl.capability()
    return this.http.get<HowellResponse<CompactorCapability>>(url).then((x) => {
      return HowellResponseProcess.item(x, CompactorCapability)
    })
  }

  async array() {
    let url = ArmCompactorUrl.basic()
    return this.http.get<HowellResponse<Compactor[]>>(url).then((x) => {
      return HowellResponseProcess.array(x, Compactor)
    })
  }
  async create(data: Compactor) {
    let url = ArmCompactorUrl.basic()
    let plain = instanceToPlain(data)
    return this.http
      .post<any, HowellResponse<Compactor>>(url, plain)
      .then((x) => {
        return HowellResponseProcess.item(x, Compactor)
      })
  }
  async get(id: string) {
    let url = ArmCompactorUrl.item(id)
    return this.http.get<HowellResponse<Compactor>>(url).then((x) => {
      return HowellResponseProcess.item(x, Compactor)
    })
  }
  async update(data: Compactor) {
    let url = ArmCompactorUrl.item(data.Id)
    let plain = instanceToPlain(data)
    return this.http
      .put<any, HowellResponse<Compactor>>(url, plain)
      .then((x) => {
        return HowellResponseProcess.item(x, Compactor)
      })
  }
  async delete(id: string) {
    let url = ArmCompactorUrl.item(id)
    return this.http.delete<HowellResponse<Compactor>>(url).then((x) => {
      return HowellResponseProcess.item(x, Compactor)
    })
  }

  async command(id: string, data: CompactorCommand) {
    let url = ArmCompactorUrl.command(id)
    let plain = instanceToPlain(data)
    return this.http.post<any, HowellResponse<void>>(url, plain)
  }

  private _params?: ArmCompactorParamsRequestService
  public get params(): ArmCompactorParamsRequestService {
    if (!this._params) {
      this._params = new ArmCompactorParamsRequestService(this.http)
    }
    return this._params
  }
  private _ipaddress?: ArmCompactorIPAddressRequestService
  public get ipaddress(): ArmCompactorIPAddressRequestService {
    if (!this._ipaddress) {
      this._ipaddress = new ArmCompactorIPAddressRequestService(this.http)
    }
    return this._ipaddress
  }
  private _compression?: ArmCompactorCompressionRequestService
  public get compression(): ArmCompactorCompressionRequestService {
    if (!this._compression) {
      this._compression = new ArmCompactorCompressionRequestService(this.http)
    }
    return this._compression
  }
}

class ArmCompactorParamsRequestService {
  constructor(private http: HowellAuthHttp) {}

  async get(id: string) {
    let url = ArmCompactorUrl.params(id)
    return this.http.get<HowellResponse<CompactorParams>>(url).then((x) => {
      return HowellResponseProcess.item(x, CompactorParams)
    })
  }
  async update(id: string, data: CompactorParams) {
    let url = ArmCompactorUrl.params(id)
    let plain = instanceToPlain(data)
    return this.http
      .put<any, HowellResponse<CompactorParams>>(url, plain)
      .then((x) => {
        return HowellResponseProcess.item(x, CompactorParams)
      })
  }
}

class ArmCompactorIPAddressRequestService {
  constructor(private http: HowellAuthHttp) {}

  async get(id: string) {
    let url = ArmCompactorUrl.ipaddress(id)
    return this.http.get<HowellResponse<IPAddress>>(url).then((x) => {
      return HowellResponseProcess.item(x, IPAddress)
    })
  }
  async update(id: string, data: IPAddress) {
    let url = ArmCompactorUrl.ipaddress(id)
    let plain = instanceToPlain(data)
    return this.http
      .put<any, HowellResponse<IPAddress>>(url, plain)
      .then((x) => {
        return HowellResponseProcess.item(x, IPAddress)
      })
  }
}

class ArmCompactorCompressionRequestService {
  constructor(private http: HowellAuthHttp) {}

  async run(id: string) {
    return new Promise<CompressionTask>((resolve, reject) => {
      let url = ArmCompactorUrl.compression(id)
      this.http
        .post<any, HowellResponse<CompressionTask>>(url)
        .then((x) => {
          resolve(HowellResponseProcess.item(x, CompressionTask))
        })
        .catch((e) => {
          if (e.response.status === 406) {
            let response = e.response.data as HowellResponse
            if (
              response.InnerException &&
              response.InnerException.Message &&
              response.InnerException.Message.includes('existed')
            ) {
              this.delete(id).then((x) => {
                this.http
                  .post<any, HowellResponse<CompressionTask>>(url)
                  .then((x) => {
                    resolve(HowellResponseProcess.item(x, CompressionTask))
                  })
                  .catch((e) => {
                    reject(e)
                  })
              })
            }
          } else {
            reject(e)
          }
        })
    })
  }
  async get(id: string) {
    let url = ArmCompactorUrl.compression(id)
    return this.http.get<HowellResponse<CompressionTask>>(url).then((x) => {
      return HowellResponseProcess.item(x, CompressionTask)
    })
  }
  async delete(id: string) {
    let url = ArmCompactorUrl.compression(id)
    return this.http.delete<HowellResponse<CompressionTask>>(url).then((x) => {
      return HowellResponseProcess.item(x, CompressionTask)
    })
  }
}
