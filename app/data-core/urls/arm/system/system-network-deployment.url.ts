import { AbstractUrl } from '../../abstract.url'

export class SystemNetworkDeploymentUrl extends AbstractUrl {
  constructor(base: string) {
    super(`${base}/Deployment`)
  }
  get testing() {
    return `${this.basic}/Testing`
  }
}
