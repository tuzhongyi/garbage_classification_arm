import { AbstractUrl } from '../../abstract.url'

export class SystemSecurityUrl extends AbstractUrl {
  constructor(base: string) {
    super(`${base}/Security`)
  }

  get authentication() {
    return `${this.basic}/Authentication`
  }
}
