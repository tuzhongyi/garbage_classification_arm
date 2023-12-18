import { FactoryResetMode } from '../../../enums/factory-reset-mode.enum'
import { BaseUrl } from '../../base.url'
import { SystemInputProxyUrl } from './system-input-proxy.url'
import { SystemNetworkUrl } from './system-network.url'
import { SystemSecurityUrl } from './system-security.url'
import { SystemDataUrl } from './system_data.url'
import { SystemStatusUrl } from './system_status.url'

export class ArmSystemUrl {
  static get basic() {
    return `${BaseUrl.arm}/System`
  }

  static get device() {
    return `${this.basic}/DeviceInfo`
  }
  static get time() {
    return `${this.basic}/Time`
  }
  static get shutdown() {
    return `${this.basic}/Shutdown`
  }
  static get reboot() {
    return `${this.basic}/Reboot`
  }
  static factory = {
    reset: (mode: FactoryResetMode) => {
      return `${this.basic}/FactoryReset?Mode=${mode}`
    },
  }
  static get updateFirmware() {
    return `${this.basic}/UpdateFirmware`
  }

  static get data() {
    return new SystemDataUrl(this.basic)
  }
  static get status() {
    return new SystemStatusUrl(this.basic)
  }
  static get network() {
    return new SystemNetworkUrl(this.basic)
  }
  static get security() {
    return new SystemSecurityUrl(this.basic)
  }
  static get input() {
    return {
      proxy: new SystemInputProxyUrl(this.basic),
    }
  }
}
