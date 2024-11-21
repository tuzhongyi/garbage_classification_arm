import { MeshNodeType } from '../../../data-core/enums/robot/mesh-node-type.model'
import { HowellHttpClient } from '../../../data-core/requests/http-client'
import { ArmRobotRequestService } from '../../../data-core/requests/services/robot/robot.service'

export class DeviceCompactorInfoRobotBusiness {
  constructor(client: HowellHttpClient.HttpClient) {
    this.service = new ArmRobotRequestService(client.http)
  }
  private service: ArmRobotRequestService

  load() {
    return this.service.array()
  }
  async nodes(id: string) {
    return this.service.mesh.node.array(id).then((nodes) => {
      return nodes.filter((x) => x.NodeType === MeshNodeType.Compactor)
    })
  }
}
