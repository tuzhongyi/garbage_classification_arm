import { FactoryResetMode } from '../../../enums/factory-reset-mode.enum'
import { BaseUrl } from '../../base.url'
import { SystemDropPortUrl } from './system-drop-port.url'
import { SystemInputProxyUrl } from './system-input-proxy.url'
import { SystemIOUrl } from './system-io.url'
import { SystemNetworkUrl } from './system-network.url'
import { SystemSecurityUrl } from './system-security.url'
import { SystemDataUrl } from './system_data.url'
import { SystemStatusUrl } from './system_status.url'

export class ArmSystemUrl {
  static basic() {
    return `${BaseUrl.arm}/System`
  }

  static capability() {
    return `${this.basic()}/Capability`
  }

  static device() {
    return `${this.basic()}/DeviceInfo`
  }
  static time() {
    return `${this.basic()}/Time`
  }
  static shutdown() {
    return `${this.basic()}/Shutdown`
  }
  static reboot() {
    return `${this.basic()}/Reboot`
  }
  static factory = {
    reset: (mode: FactoryResetMode) => {
      return `${this.basic()}/FactoryReset?Mode=${mode}`
    },
  }
  static updateFirmware() {
    return `${this.basic()}/UpdateFirmware`
  }

  static get data() {
    return new SystemDataUrl(this.basic())
  }
  static get status() {
    return new SystemStatusUrl(this.basic())
  }
  static get network() {
    return new SystemNetworkUrl(this.basic())
  }
  static get security() {
    return new SystemSecurityUrl(this.basic())
  }
  static get input() {
    return {
      proxy: new SystemInputProxyUrl(this.basic()),
    }
  }

  static get io() {
    return new SystemIOUrl(this.basic())
  }

  static get drop() {
    return {
      port: new SystemDropPortUrl(this.basic()),
    }
  }
}
