import { AbstractUrl } from '../../abstract.url'

export class DeploymentGarbageServersUrl extends AbstractUrl {
  constructor(base: string) {
    super(`${base}/GarbageServers`)
  }

  models(id: string) {
    return `${this.item(id)}/AIModels`
  }
  events(id: string) {
    return `${this.item(id)}/EventInfos`
  }
}
