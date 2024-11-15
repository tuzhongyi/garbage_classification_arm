import { instanceToPlain } from 'class-transformer'
import { FactoryResetMode } from '../../../enums/factory-reset-mode.enum'
import { RunningStatus } from '../../../models/arm/running-status.model'
import { UpgradeStatus } from '../../../models/arm/upgrade-status.model'
import { DeviceCapability } from '../../../models/capabilities/arm/device-capability.model'

import { HowellResponse } from '../../../models/response'
import { ArmSystemUrl } from '../../../urls/arm/system/system.url'
import { HowellAuthHttp } from '../../auth/howell-auth-http'
import { HowellResponseProcess } from '../../service-process'
import { SystemDataRequestService } from './data/system-data.service'
import { SystemDeviceRequestService } from './device/system-device.service'
import { SystemDropPortRequestService } from './drop-port/system-drop-port.service'
import { SystemInputProxyRequestService } from './input-proxy/system-input-proxy.service'
import { SystemIORequestService } from './io/system-io.service'
import { SystemNetworkRequestService } from './network/system-network.service'
import { SystemSecurityRequestService } from './security/system-security.service'
import { SystemCommand } from './system.params'
import { SystemTimeRequestService } from './time/system-time.service'

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

  async command(command: SystemCommand): Promise<string> {
    let url = ArmSystemUrl.command()
    let plain = instanceToPlain(command)
    return this.http.post<any, HowellResponse<string>>(url, plain).then((x) => {
      if (x.FaultCode === 0) {
        return x.Data
      }
      throw new Error(`${x.FaultCode}:${x.FaultReason}`)
    })
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

  private _io?: SystemIORequestService
  public get io(): SystemIORequestService {
    if (!this._io) {
      this._io = new SystemIORequestService(this.http)
    }
    return this._io
  }

  private _drop?: { port: SystemDropPortRequestService }
  public get drop(): { port: SystemDropPortRequestService } {
    if (!this._drop) {
      this._drop = { port: new SystemDropPortRequestService(this.http) }
    }
    return this._drop
  }
}
