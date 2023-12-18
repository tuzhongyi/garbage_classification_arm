import { AbstractUrl } from '../../abstract.url'

export class SystemNetworkPlatformAccessUrl extends AbstractUrl {
  constructor(base: string) {
    super(`${base}/PlatformAccess`)
  }

  get testing() {
    return `${this.basic}/Testing`
  }
}
