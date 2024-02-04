import { BaseUrl } from '../../base.url'
import { DeploymentEventsUrl } from './deployment-event.url'
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

  static event() {
    return new DeploymentEventsUrl(this.basic())
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
