import { AbstractUrl } from '../../abstract.url'
import { SystemNetworkDeploymentUrl } from './system-network-deployment.url'
import { SystemNetworkFrpInfosUrl } from './system-network-frp-info.url'
import { SystemNetworkInterfacesUrl } from './system-network-interface.url'
import { SystemNetworkPlatformAccessUrl } from './system-network-platform-access.url'

export class SystemNetworkUrl extends AbstractUrl {
  constructor(base: string) {
    super(`${base}/Network`)
  }
  ssh() {
    return `${this.basic()}/SSH`
  }
  capability() {
    return `${this.basic()}/Capability`
  }
  get interface() {
    return new SystemNetworkInterfacesUrl(this.basic())
  }
  get platform() {
    return new SystemNetworkPlatformAccessUrl(this.basic())
  }
  get deployment() {
    return new SystemNetworkDeploymentUrl(this.basic())
  }

  get frp() {
    return new SystemNetworkFrpInfosUrl(this.basic())
  }
}
