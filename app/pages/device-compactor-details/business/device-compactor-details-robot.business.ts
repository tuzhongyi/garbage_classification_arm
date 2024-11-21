import { MeshNodeType } from '../../../data-core/enums/robot/mesh-node-type.model'
import { HowellHttpClient } from '../../../data-core/requests/http-client'
import { ArmRobotRequestService } from '../../../data-core/requests/services/robot/robot.service'

export class DeviceCompactorDetailsRobotBusiness {
  constructor(client: HowellHttpClient.HttpClient) {
    this.service = new ArmRobotRequestService(client.http)
  }
  service: ArmRobotRequestService

  async get() {
    return this.service.array().then((x) => {
      if (x.length > 0) {
        return x[0]
      }
      return undefined
    })
  }

  async nodes() {
    let robot = await this.get()
    if (!robot) return undefined
    return this.service.mesh.node.array(robot.Id)
  }

  async node() {
    let nodes = await this.nodes()
    if (!nodes || nodes.length === 0) return undefined
    return nodes.find((x) => x.NodeType === MeshNodeType.Compactor)
  }
}
