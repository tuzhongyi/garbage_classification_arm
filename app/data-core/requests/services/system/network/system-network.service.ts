import { instanceToPlain, plainToInstance } from 'class-transformer'
import { Deployment } from '../../../../models/arm/deployment.model'
import { NetworkInterface } from '../../../../models/arm/network-interface.model'
import { Platform } from '../../../../models/arm/platform.model'
import { SSH } from '../../../../models/arm/ssh.model'
import { NetworkCapability } from '../../../../models/capabilities/arm/network-capability.model'
import { FrpInfo } from '../../../../models/frp-info/frp-info.model'
import { HowellResponse } from '../../../../models/response'
import { ArmSystemUrl } from '../../../../urls/arm/system/system.url'
import { HowellAuthHttp } from '../../../auth/howell-auth-http'
import { HowellResponseProcess } from '../../../service-process'

export class SystemNetworkRequestService {
  constructor(private http: HowellAuthHttp) {}

  capability() {
    let url = ArmSystemUrl.network.capability()
    return this.http.get<HowellResponse<NetworkCapability>>(url).then((x) => {
      return HowellResponseProcess.item(x, NetworkCapability)
    })
  }

  private _interface?: SystemNetworkInterfaceRequestService
  public get interface(): SystemNetworkInterfaceRequestService {
    if (!this._interface) {
      this._interface = new SystemNetworkInterfaceRequestService(this.http)
    }
    return this._interface
  }

  private _ssh?: SystemNetworkSSHRequestService
  public get ssh(): SystemNetworkSSHRequestService {
    if (!this._ssh) {
      this._ssh = new SystemNetworkSSHRequestService(this.http)
    }
    return this._ssh
  }

  private _platform?: {
    access: SystemNetworkPlatformAccessRequestService
  }
  public get platform() {
    if (!this._platform) {
      this._platform = {
        access: new SystemNetworkPlatformAccessRequestService(this.http),
      }
    }
    return this._platform
  }
  private _deployment?: SystemNetworkDeploymentRequestService
  public get deployment(): SystemNetworkDeploymentRequestService {
    if (!this._deployment) {
      this._deployment = new SystemNetworkDeploymentRequestService(this.http)
    }
    return this._deployment
  }

  private _frp?: SystemNetworkFrpInfosRequestService
  public get frp(): SystemNetworkFrpInfosRequestService {
    if (!this._frp) {
      this._frp = new SystemNetworkFrpInfosRequestService(this.http)
    }
    return this._frp
  }
}
class SystemNetworkInterfaceRequestService {
  constructor(private http: HowellAuthHttp) {}

  async array() {
    let url = ArmSystemUrl.network.interface.basic()
    let response = await this.http.get<HowellResponse<NetworkInterface[]>>(url)
    return plainToInstance(NetworkInterface, response.Data)
  }
  get(id: string) {
    let url = ArmSystemUrl.network.interface.item(id)
    return this.http.get<HowellResponse<NetworkInterface>>(url)
  }
  async update(item: NetworkInterface) {
    let plain = instanceToPlain(item)
    let url = ArmSystemUrl.network.interface.item(item.Id)
    let response = await this.http.put<any, HowellResponse<NetworkInterface>>(
      url,
      plain
    )
    return plainToInstance(NetworkInterface, response.Data)
  }
}
class SystemNetworkSSHRequestService {
  constructor(private http: HowellAuthHttp) {}

  async get() {
    let url = ArmSystemUrl.network.ssh()
    let response = await this.http.get<HowellResponse<SSH>>(url)
    return plainToInstance(SSH, response.Data)
  }
  async update(data: SSH) {
    let plain = instanceToPlain(data)
    let url = ArmSystemUrl.network.ssh()
    let response = await this.http.put<any, HowellResponse<SSH>>(url, plain)
    return plainToInstance(SSH, response.Data)
  }
}

class SystemNetworkPlatformAccessRequestService {
  constructor(private http: HowellAuthHttp) {}

  get() {
    let url = ArmSystemUrl.network.platform.basic()
    return this.http.get<HowellResponse<Platform>>(url).then((x) => {
      return HowellResponseProcess.item(x, Platform)
    })
  }
  async update(data: Platform) {
    let plain = instanceToPlain(data)
    let url = ArmSystemUrl.network.platform.basic()
    return this.http
      .put<any, HowellResponse<Platform>>(url, plain)
      .then((x) => {
        return HowellResponseProcess.item(x, Platform)
      })
  }
  testing() {
    let url = ArmSystemUrl.network.platform.testing()
    return this.http.post<HowellResponse>(url).then((x) => {
      return x.FaultCode === 0
    })
  }
}
class SystemNetworkFrpInfosRequestService {
  constructor(private http: HowellAuthHttp) {}

  async array() {
    let url = ArmSystemUrl.network.frp.basic()
    let response = await this.http.get<HowellResponse<FrpInfo[]>>(url)
    return plainToInstance(FrpInfo, response.Data)
  }
  async create(item: FrpInfo) {
    let plain = instanceToPlain(item)
    let url = ArmSystemUrl.network.frp.basic()
    let response = await this.http.post<any, HowellResponse<FrpInfo>>(
      url,
      plain
    )
    return plainToInstance(FrpInfo, response.Data)
  }

  get(id: string) {
    let url = ArmSystemUrl.network.frp.item(id)
    return this.http.get<HowellResponse<FrpInfo>>(url)
  }

  delete(id: string) {
    let url = ArmSystemUrl.network.frp.item(id)
    return this.http.delete<HowellResponse<FrpInfo>>(url)
  }
}
class SystemNetworkDeploymentRequestService {
  constructor(private http: HowellAuthHttp) {}

  async get() {
    let url = ArmSystemUrl.network.deployment.basic()
    let response = await this.http.get<HowellResponse<Deployment>>(url)
    return plainToInstance(Deployment, response.Data)
  }
  async update(data: Deployment) {
    let plain = instanceToPlain(data)
    let url = ArmSystemUrl.network.deployment.basic()
    let response = await this.http.put<any, HowellResponse<Deployment>>(
      url,
      plain
    )
    return plainToInstance(Deployment, response.Data)
  }
  async testing() {
    let url = ArmSystemUrl.network.deployment.testing()
    let response = await this.http.post<HowellResponse>(url)
    return response.FaultCode == 0
  }
}
