import { MeshNodeType } from '../../../data-core/enums/robot/mesh-node-type.model'
import { MeshNode } from '../../../data-core/models/robot/mesh-node.model'
import { Robot } from '../../../data-core/models/robot/robot.model'
import { HowellHttpClient } from '../../../data-core/requests/http-client'
import { ArmRobotRequestService } from '../../../data-core/requests/services/robot/robot.service'

export class DeviceChannelCalibrationRobotBusiness {
  private client = new HowellHttpClient.HttpClient()
  private service = new ArmRobotRequestService(this.client.http)

  private _nodes: MeshNode[] = []
  private _robots: Robot[] = []

  async load() {
    if (this._robots.length === 0) {
      this._robots = await this.service.array()
    }
    return this._robots ?? []
  }

  async get(id: string) {
    let array = await this.load()
    return array.find((x) => x.Id === id)
  }

  async nodes(id: string, isdrop: boolean = false) {
    if (this._nodes.length <= 0) {
      this._nodes = await this.service.mesh.node.array(id)
    }
    return this._nodes.filter((x) => {
      if (isdrop) {
        return x.NodeType === MeshNodeType.DropPort
      } else {
        return (
          x.NodeType == MeshNodeType.ChargingPort ||
          x.NodeType == MeshNodeType.StorePort
        )
      }
    })
  }
}
