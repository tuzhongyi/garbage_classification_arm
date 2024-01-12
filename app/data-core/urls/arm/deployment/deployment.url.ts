import { BaseUrl } from '../../base.url'
import { DeploymentServersUrl } from './deployment_servers.url'

export class ArmDeploymentUrl {
  static basic() {
    return `${BaseUrl.arm}/Deployment`
  }

  static capability() {
    return `${this.basic()}/Capability`
  }

  static get servers() {
    return new DeploymentServersUrl(this.basic())
  }

  static events(type?: string) {
    if (type) {
      return `${this.basic()}/Events/${type}`
    } else {
      return `${this.basic()}/Events`
    }
  }
  static ai = {
    task: (id?: string) => {
      if (id) {
        return `${this.basic()}/AITasks/${id}`
      } else {
        return `${this.basic()}/AITasks`
      }
    },
  }
}
