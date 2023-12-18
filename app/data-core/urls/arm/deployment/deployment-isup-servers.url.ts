import { AbstractUrl } from '../../abstract.url'

export class DeploymentISUPServersUrl extends AbstractUrl {
  constructor(base: string) {
    super(`${base}/ISUPServers`)
  }

  domains(id: string) {
    return `${this.item(id)}/Domains`
  }
}
