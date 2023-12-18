import { DeploymentGarbageServersUrl } from './deployment-garbage-servers.url'
import { DeploymentISUPServersUrl } from './deployment-isup-servers.url'

export class DeploymentServersUrl {
  constructor(private base: string) {}
  get garbage() {
    return new DeploymentGarbageServersUrl(this.base)
  }
  get isup() {
    return new DeploymentISUPServersUrl(this.base)
  }
}
