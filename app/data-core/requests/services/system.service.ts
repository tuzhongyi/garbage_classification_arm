import { instanceToPlain, plainToInstance } from 'class-transformer'
import { FactoryResetMode } from '../../enums/factory-reset-mode.enum'
import { Authentication } from '../../models/arm/authentication.model'
import { Deployment } from '../../models/arm/deployment.model'
import { DeviceInfo } from '../../models/arm/device-info.model'
import { InputProxyChannel } from '../../models/arm/input-proxy-channel.model'
import { NetworkInterface } from '../../models/arm/network-interface.model'
import { Platform } from '../../models/arm/platform.model'
import { SSH } from '../../models/arm/ssh.model'
import { UpgradeStatus } from '../../models/arm/upgrade-status.model'
import { VideoSourceDescriptor } from '../../models/arm/video-source-descriptor.model'
import { HowellResponse } from '../../models/response'
import { ArmSystemUrl } from '../../urls/arm/system/system.url'
import { HowellAuthHttp } from '../howell-auth-http'

export class SystemRequestService {
  constructor(private http: HowellAuthHttp) {}

  shutdown() {
    let url = ArmSystemUrl.shutdown
    return this.http.post<HowellResponse>(url)
  }
  reboot() {
    let url = ArmSystemUrl.reboot
    return this.http.post<HowellResponse>(url)
  }
  factory = {
    reset: (mode: FactoryResetMode) => {
      let url = ArmSystemUrl.factory.reset(mode)
      return this.http.post<HowellResponse>(url)
    },
  }
  firmware = {
    update: (data: BinaryData) => {
      let url = ArmSystemUrl.updateFirmware
      return this.http.post<BinaryData, HowellResponse>(url, data)
    },
  }
  status = {
    upgrade: () => {
      let url = ArmSystemUrl.status.upgrade
      return this.http.get<HowellResponse<UpgradeStatus>>(url)
    },
    running: () => {
      let url = ArmSystemUrl.status.running
      return this.http.get<HowellResponse<UpgradeStatus>>(url)
    },
  }

  private _device?: SystemDeviceRequestService
  public get device(): SystemDeviceRequestService {
    if (!this._device) {
      this._device = new SystemDeviceRequestService(this.http)
    }
    return this._device
  }
  private _time?: SystemTimeRequestService
  public get time(): SystemTimeRequestService {
    if (!this._time) {
      this._time = new SystemTimeRequestService(this.http)
    }
    return this._time
  }
  private _data?: SystemDataRequestService
  public get data(): SystemDataRequestService {
    if (!this._data) {
      this._data = new SystemDataRequestService(this.http)
    }
    return this._data
  }
  private _network?: SystemNetworkRequestService
  public get network(): SystemNetworkRequestService {
    if (!this._network) {
      this._network = new SystemNetworkRequestService(this.http)
    }
    return this._network
  }
  private _security?: SystemSecurityRequestService
  public get security(): SystemSecurityRequestService {
    if (!this._security) {
      this._security = new SystemSecurityRequestService(this.http)
    }
    return this._security
  }

  private _input?: { proxy: SystemInputProxyRequestService }
  public get input(): { proxy: SystemInputProxyRequestService } {
    if (!this._input) {
      this._input = { proxy: new SystemInputProxyRequestService(this.http) }
    }
    return this._input
  }
}

class SystemDeviceRequestService {
  constructor(private http: HowellAuthHttp) {}
  async get() {
    let url = ArmSystemUrl.device
    let response = await this.http.get<HowellResponse<DeviceInfo>>(url)
    return plainToInstance(DeviceInfo, response.Data)
  }
  async set(item: DeviceInfo) {
    let plain = instanceToPlain(item)
    let url = ArmSystemUrl.device
    let response = await this.http.put<any, HowellResponse<DeviceInfo>>(
      url,
      plain
    )
    return plainToInstance(DeviceInfo, response.Data)
  }
}
class SystemTimeRequestService {
  constructor(private http: HowellAuthHttp) {}
  async get() {
    let url = ArmSystemUrl.device
    let response = await this.http.get<HowellResponse<DeviceInfo>>(url)
    return plainToInstance(DeviceInfo, response.Data)
  }
  async set(item: DeviceInfo) {
    let plain = instanceToPlain(item)
    let url = ArmSystemUrl.device
    let response = await this.http.put<any, HowellResponse<DeviceInfo>>(
      url,
      plain
    )
    return plainToInstance(DeviceInfo, response.Data)
  }
}
class SystemDataRequestService {
  constructor(private http: HowellAuthHttp) {}

  configuration = {
    get: () => {
      let url = ArmSystemUrl.data.configuration
      return this.http.get<BinaryData>(url)
    },
    set: (data: BinaryData) => {
      let url = ArmSystemUrl.data.configuration
      return this.http.put<BinaryData, HowellResponse>(url, data)
    },
  }
  log() {
    let url = ArmSystemUrl.data.log
    return this.http.get<BinaryData>(url)
  }
}

class SystemNetworkRequestService {
  constructor(private http: HowellAuthHttp) {}

  array() {
    let url = ArmSystemUrl.network.interface.basic
    return this.http.get<HowellResponse<NetworkInterface[]>>(url)
  }
  get(id: string) {
    let url = ArmSystemUrl.network.interface.item(id)
    return this.http.get<HowellResponse<NetworkInterface>>(url)
  }
  async set(item: NetworkInterface) {
    let plain = instanceToPlain(item)
    let url = ArmSystemUrl.network.interface.item(item.Id)
    let response = await this.http.put<any, HowellResponse<NetworkInterface>>(
      url,
      plain
    )
    return plainToInstance(NetworkInterface, response.Data)
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
}
class SystemNetworkSSHRequestService {
  constructor(private http: HowellAuthHttp) {}

  get() {
    let url = ArmSystemUrl.network.ssh
    return this.http.get<HowellResponse<SSH>>(url)
  }
  async set(data: SSH) {
    let plain = instanceToPlain(data)
    let url = ArmSystemUrl.network.ssh
    let response = await this.http.put<any, HowellResponse<SSH>>(url, plain)
    return plainToInstance(SSH, response.Data)
  }
}

class SystemNetworkPlatformAccessRequestService {
  constructor(private http: HowellAuthHttp) {}

  get() {
    let url = ArmSystemUrl.network.platform.basic
    return this.http.get<HowellResponse<Platform>>(url)
  }
  async set(data: Platform) {
    let plain = instanceToPlain(data)
    let url = ArmSystemUrl.network.platform.basic
    let response = await this.http.put<any, HowellResponse<Platform>>(
      url,
      plain
    )
    return plainToInstance(Platform, response.Data)
  }
  testing() {
    let url = ArmSystemUrl.network.platform.testing
    return this.http.post<HowellResponse>(url)
  }
}
class SystemNetworkDeploymentRequestService {
  constructor(private http: HowellAuthHttp) {}

  get() {
    let url = ArmSystemUrl.network.platform.basic
    return this.http.get<HowellResponse<Deployment>>(url)
  }
  async set(data: Deployment) {
    let plain = instanceToPlain(data)
    let url = ArmSystemUrl.network.deployment.basic
    let response = await this.http.put<any, HowellResponse<Deployment>>(
      url,
      plain
    )
    return plainToInstance(Deployment, response.Data)
  }
  testing() {
    let url = ArmSystemUrl.network.deployment.testing
    return this.http.post<HowellResponse>(url)
  }
}

class SystemSecurityRequestService {
  constructor(private http: HowellAuthHttp) {}

  authentication = {
    get: () => {
      let url = ArmSystemUrl.security.authentication
      return this.http.get<HowellResponse<Authentication>>(url)
    },
    set: async (data: Authentication) => {
      let plain = instanceToPlain(data)
      let url = ArmSystemUrl.security.authentication
      let response = await this.http.put<any, HowellResponse<Authentication>>(
        url,
        plain
      )
      return plainToInstance(Authentication, response.Data)
    },
  }
}

class SystemInputProxyRequestService {
  constructor(private http: HowellAuthHttp) {}

  search() {
    let url = ArmSystemUrl.input.proxy.search
    return this.http.get<HowellResponse<VideoSourceDescriptor[]>>(url)
  }
  private _channel?: SystemInputProxyChannelRequestService
  public get channel(): SystemInputProxyChannelRequestService {
    if (!this._channel) {
      this._channel = new SystemInputProxyChannelRequestService(this.http)
    }
    return this._channel
  }
}
class SystemInputProxyChannelRequestService {
  constructor(private http: HowellAuthHttp) {}

  array() {
    let url = ArmSystemUrl.input.proxy.channel.basic
    return this.http.get<HowellResponse<InputProxyChannel[]>>(url)
  }
  async create(data: InputProxyChannel) {
    let plain = instanceToPlain(data)
    let url = ArmSystemUrl.input.proxy.channel.basic
    let response = await this.http.post<any, HowellResponse<InputProxyChannel>>(
      url,
      plain
    )
    return plainToInstance(InputProxyChannel, response.Data)
  }
  get(id: string) {
    let url = ArmSystemUrl.input.proxy.channel.item(id)
    return this.http.get<HowellResponse<InputProxyChannel>>(url)
  }
  async set(data: InputProxyChannel) {
    let plain = instanceToPlain(data)
    let url = ArmSystemUrl.input.proxy.channel.item(data.Id)
    let response = await this.http.put<any, HowellResponse<InputProxyChannel>>(
      url,
      plain
    )
    return plainToInstance(InputProxyChannel, response.Data)
  }
  delete(id: string) {
    let url = ArmSystemUrl.input.proxy.channel.item(id)
    return this.http.delete<HowellResponse<InputProxyChannel>>(url)
  }

  picture(stream: number = 1, type?: string) {
    let url = ArmSystemUrl.input.proxy.channel.picture(stream, type)
    return this.http.get<string>(url)
  }
}
