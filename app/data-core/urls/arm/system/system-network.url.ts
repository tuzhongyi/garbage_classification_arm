import { AbstractUrl } from '../../abstract.url'
import { SystemNetworkDeploymentUrl } from './system-network-deployment.url'
import { SystemNetworkInterfacesUrl } from './system-network-interface.url'
import { SystemNetworkPlatformAccessUrl } from './system-network-platform-access.url'

export class SystemNetworkUrl extends AbstractUrl {
  constructor(base: string) {
    super(`${base}/Network`)
  }
  ssh() {
    return `${this.basic}/SSH`
  }
  interface() {
    return new SystemNetworkInterfacesUrl(this.basic)
  }
  platform() {
    return new SystemNetworkPlatformAccessUrl(this.basic)
  }
  deployment() {
    return new SystemNetworkDeploymentUrl(this.basic)
  }
}
