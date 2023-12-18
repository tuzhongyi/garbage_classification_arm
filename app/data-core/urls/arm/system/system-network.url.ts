import { AbstractUrl } from '../../abstract.url'
import { SystemNetworkDeploymentUrl } from './system-network-deployment.url'
import { SystemNetworkInterfacesUrl } from './system-network-interface.url'
import { SystemNetworkPlatformAccessUrl } from './system-network-platform-access.url'

export class SystemNetworkUrl extends AbstractUrl {
  constructor(base: string) {
    super(`${base}/Network`)
  }
  get ssh() {
    return `${this.basic}/SSH`
  }
  get interface() {
    return new SystemNetworkInterfacesUrl(this.basic)
  }
  get platform() {
    return new SystemNetworkPlatformAccessUrl(this.basic)
  }
  get deployment() {
    return new SystemNetworkDeploymentUrl(this.basic)
  }
}
