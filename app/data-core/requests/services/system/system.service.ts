import { instanceToPlain, plainToInstance } from 'class-transformer'
import { FactoryResetMode } from '../../../enums/factory-reset-mode.enum'
import { Authentication } from '../../../models/arm/authentication.model'
import { ChannelCalibration } from '../../../models/arm/channel-calibration.model'
import { Deployment } from '../../../models/arm/deployment.model'
import { DeviceInfo } from '../../../models/arm/device-info.model'
import { InputProxyChannel } from '../../../models/arm/input-proxy-channel.model'
import { NetworkInterface } from '../../../models/arm/network-interface.model'
import { Platform } from '../../../models/arm/platform.model'
import { RunningStatus } from '../../../models/arm/running-status.model'
import { SSH } from '../../../models/arm/ssh.model'
import { SystemTime } from '../../../models/arm/system-time.model'
import { UpgradeStatus } from '../../../models/arm/upgrade-status.model'
import { VideoSourceDescriptor } from '../../../models/arm/video-source-descriptor.model'
import { SecurityCapability } from '../../../models/capabilities/arm/cecurity-capability.model'
import { DeviceCapability } from '../../../models/capabilities/arm/device-capability.model'
import { InputProxyCapability } from '../../../models/capabilities/arm/input-proxy-capability.model'
import { NetworkCapability } from '../../../models/capabilities/arm/network-capability.model'

import { HowellResponse } from '../../../models/response'
import { ArmSystemUrl } from '../../../urls/arm/system/system.url'
import { HowellAuthHttp } from '../../auth/howell-auth-http'
import { HowellResponseProcess } from '../../service-process'

export class ArmSystemRequestService {
  constructor(private http: HowellAuthHttp) {}

  async capability() {
    let url = ArmSystemUrl.capability()
    let response = await this.http.get<HowellResponse<DeviceCapability>>(url)
    return HowellResponseProcess.item(response, DeviceCapability)
  }
  async shutdown() {
    let url = ArmSystemUrl.shutdown()
    let response = await this.http.post<HowellResponse>(url)
    return response.FaultCode === 0
  }
  reboot() {
    let url = ArmSystemUrl.reboot()
    return this.http.post<HowellResponse>(url).then((x) => {
      return x.FaultCode === 0
    })
  }
  factory = {
    reset: async (mode: FactoryResetMode) => {
      let url = ArmSystemUrl.factory.reset(mode)
      let response = await this.http.post<HowellResponse>(url)
      return response.FaultCode === 0
    },
  }
  firmware = {
    update: async (data: BinaryData) => {
      let url = ArmSystemUrl.updateFirmware()
      let response = await this.http.post<BinaryData, HowellResponse>(url, data)
      return response.FaultCode === 0
    },
  }
  status = {
    upgrade: async () => {
      let url = ArmSystemUrl.status.upgrade()
      let response = await this.http.get<HowellResponse<UpgradeStatus>>(url)
      return HowellResponseProcess.item(response, UpgradeStatus)
    },
    running: async () => {
      let url = ArmSystemUrl.status.running()
      let response = await this.http.get<HowellResponse<RunningStatus>>(url)
      return HowellResponseProcess.item(response, RunningStatus)
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
    let url = ArmSystemUrl.device()
    let response = await this.http.get<HowellResponse<DeviceInfo>>(url)
    return HowellResponseProcess.item(response, DeviceInfo)
  }
  async update(item: DeviceInfo) {
    let plain = instanceToPlain(item)
    let url = ArmSystemUrl.device()
    let response = await this.http.put<any, HowellResponse<DeviceInfo>>(
      url,
      plain
    )
    return HowellResponseProcess.item(response, DeviceInfo)
  }
}
class SystemTimeRequestService {
  constructor(private http: HowellAuthHttp) {}
  async get() {
    let url = ArmSystemUrl.time()
    let response = await this.http.get<HowellResponse<SystemTime>>(url)
    return plainToInstance(SystemTime, response.Data)
  }
  async update(item: SystemTime) {
    let plain = instanceToPlain(item)
    let url = ArmSystemUrl.time()
    let response = await this.http.put<any, HowellResponse<SystemTime>>(
      url,
      plain
    )
    return HowellResponseProcess.item(response, SystemTime)
  }
}
class SystemDataRequestService {
  constructor(private http: HowellAuthHttp) {}

  configuration = {
    download: () => {
      let url = ArmSystemUrl.data.configuration()
      return this.http.get<BinaryData>(url)
    },
    upload: (data: BinaryData) => {
      let url = ArmSystemUrl.data.configuration()
      return this.http.put<BinaryData, HowellResponse>(url, data)
    },
  }
  log = {
    download: () => {
      let url = ArmSystemUrl.data.log()
      return this.http.get<BinaryData>(url)
    },
  }
}

class SystemNetworkRequestService {
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
    return this.http.get<HowellResponse<Platform>>(url)
  }
  async update(data: Platform) {
    let plain = instanceToPlain(data)
    let url = ArmSystemUrl.network.platform.basic()
    let response = await this.http.put<any, HowellResponse<Platform>>(
      url,
      plain
    )
    return plainToInstance(Platform, response.Data)
  }
  testing() {
    let url = ArmSystemUrl.network.platform.testing()
    return this.http.post<HowellResponse>(url)
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

class SystemSecurityRequestService {
  constructor(private http: HowellAuthHttp) {}
  async capability() {
    let url = ArmSystemUrl.security.capability()
    return this.http
      .get<HowellResponse<SecurityCapability>>(url)
      .then((response) => {
        return HowellResponseProcess.item(response, SecurityCapability)
      })
  }
  authentication = {
    get: () => {
      let url = ArmSystemUrl.security.authentication()
      return this.http.get<HowellResponse<Authentication>>(url)
    },
    update: async (data: Authentication) => {
      let plain = instanceToPlain(data)
      let url = ArmSystemUrl.security.authentication()
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
  capability() {
    let url = ArmSystemUrl.input.proxy.capability()
    return this.http
      .get<HowellResponse<InputProxyCapability>>(url)
      .then((x) => {
        return HowellResponseProcess.item(x, InputProxyCapability)
      })
  }
  async search() {
    let url = ArmSystemUrl.input.proxy.search()
    let response = await this.http.get<HowellResponse<VideoSourceDescriptor[]>>(
      url
    )
    return plainToInstance(VideoSourceDescriptor, response.Data)
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

  async array() {
    let url = ArmSystemUrl.input.proxy.channel.basic()
    let response = await this.http.get<HowellResponse<InputProxyChannel[]>>(url)
    return plainToInstance(InputProxyChannel, response.Data)
  }
  async create(data: InputProxyChannel) {
    let plain = instanceToPlain(data)
    let url = ArmSystemUrl.input.proxy.channel.basic()
    let response = await this.http.post<any, HowellResponse<InputProxyChannel>>(
      url,
      plain
    )
    if (response.FaultCode === 0) {
      return plainToInstance(InputProxyChannel, response.Data)
    }
    throw new Error(response.FaultReason)
  }
  async get(id: string) {
    let url = ArmSystemUrl.input.proxy.channel.item(id)
    let response = await this.http.get<HowellResponse<InputProxyChannel>>(url)
    return plainToInstance(InputProxyChannel, response.Data)
  }
  async update(data: InputProxyChannel) {
    let plain = instanceToPlain(data)
    let url = ArmSystemUrl.input.proxy.channel.item(data.Id)
    let response = await this.http.put<any, HowellResponse<InputProxyChannel>>(
      url,
      plain
    )
    if (response.FaultCode === 0) {
      return plainToInstance(InputProxyChannel, response.Data)
    }
    throw new Error(response.FaultReason)
  }
  async delete(id: string) {
    let url = ArmSystemUrl.input.proxy.channel.item(id)
    let response = await this.http.delete<HowellResponse<InputProxyChannel>>(
      url
    )
    if (response.FaultCode === 0) {
      return plainToInstance(InputProxyChannel, response.Data)
    }
    throw new Error(response.FaultReason)
  }

  picture(id: string, stream: number = 1, type: string = 'JPEG') {
    return ArmSystemUrl.input.proxy.channel.picture(id, stream, type)
    // return this.http.get<string>(url)
  }

  private _calibration?: SystemInputProxyChannelCalibrationRequestService
  public get calibration(): SystemInputProxyChannelCalibrationRequestService {
    if (!this._calibration) {
      this._calibration = new SystemInputProxyChannelCalibrationRequestService(
        this.http
      )
    }
    return this._calibration
  }
}

class SystemInputProxyChannelCalibrationRequestService {
  constructor(private http: HowellAuthHttp) {}

  set(data: ChannelCalibration) {
    let plain = instanceToPlain(data)
    let url = ArmSystemUrl.input.proxy.channel.calibration(
      data.ChannelId.toString()
    )
    return this.http
      .post<any, HowellResponse<ChannelCalibration>>(url, plain)
      .then((x) => {
        return HowellResponseProcess.item(x, ChannelCalibration)
      })
  }
  get(id: string) {
    let url = ArmSystemUrl.input.proxy.channel.calibration(id)
    return this.http.get<HowellResponse<ChannelCalibration>>(url).then((x) => {
      return HowellResponseProcess.item(x, ChannelCalibration)
    })
  }
}
