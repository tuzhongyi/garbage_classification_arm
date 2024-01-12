import { AbstractUrl } from '../../abstract.url'

export class SystemNetworkDeploymentUrl extends AbstractUrl {
  constructor(base: string) {
    super(`${base}/Deployment`)
  }
  testing() {
    return `${this.basic()}/Testing`
  }
}
