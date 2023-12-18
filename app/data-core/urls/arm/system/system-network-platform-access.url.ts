import { AbstractUrl } from '../../abstract.url'

export class SystemNetworkPlatformAccessUrl extends AbstractUrl {
  constructor(base: string) {
    super(`${base}/PlatformAccess`)
  }

  testing() {
    return `${this.basic}/Testing`
  }
}
