import { AbstractUrl } from '../../abstract.url'

export class SystemSecurityUrl extends AbstractUrl {
  constructor(base: string) {
    super(`${base}/Security`)
  }

  authentication() {
    return `${this.basic()}/Authentication`
  }
  capability() {
    return `${this.basic()}/Capability`
  }
}
