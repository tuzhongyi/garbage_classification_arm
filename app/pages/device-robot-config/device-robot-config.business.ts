import { RobotCommandType } from '../../data-core/enums/robot/robot-command-type.enum'
import { MeshEdge } from '../../data-core/models/robot/mesh-edge.model'
import { MeshLocation } from '../../data-core/models/robot/mesh-location.model'
import { MeshNodePosition } from '../../data-core/models/robot/mesh-node-position.model'
import { MeshNode } from '../../data-core/models/robot/mesh-node.model'
import { RobotMeshStepCommand } from '../../data-core/models/robot/robot-command-mesh-step.model'
import { RobotCommandResult } from '../../data-core/models/robot/robot-command-result.model'
import { HowellHttpClient } from '../../data-core/requests/http-client'
import { ArmRobotRequestService } from '../../data-core/requests/services/robot/robot.service'
import { DeviceRobotModel } from '../device-robot/device-robot.model'

export class DeviceRobotConfigBusiness {
  constructor() {
    this._location.Position = new MeshNodePosition()
    this._location.Position.X = 0
    this._location.Position.Y = 0
  }
  private client = new HowellHttpClient.HttpClient()
  private service = new ArmRobotRequestService(this.client.http)
  private commandId = -1
  private _location = new MeshLocation()

  async load(id: string) {
    let model = new DeviceRobotModel()
    model.nodes = await this.service.mesh.node.array(id)
    model.edges = await this.edges(id)
    model.location = await this.location()
    model.robot = this.robot(id)
    model.battery = this.battery(id)
    return model
  }

  edges(id: string) {
    return new Promise<MeshEdge[]>((resolve) => {
      this.service.mesh.edge
        .array(id)
        .then((x) => {
          resolve(x)
        })
        .catch((x) => {
          resolve([])
        })
    })
  }

  robot(id: string) {
    return this.service.get(id)
  }

  battery(id: string) {
    return this.service.battery(id)
  }

  async location(id?: string) {
    return this._location
  }
  setLocation(x: number, y: number) {
    this._location.Position.X = x
    this._location.Position.Y = y
  }

  nodes(id: string) {
    return this.service.mesh.node.array(id).catch((x) => {
      return []
    })
  }

  start(id: string) {
    return this.service.calibration.start(id)
  }

  stop(id: string) {
    return this.service.calibration.stop(id)
  }

  private step(id: string, direction: number) {
    this.commandId++
    let command = new RobotMeshStepCommand()
    command.Id = this.commandId
    command.Data = {
      Direction: direction,
    }
    return this.service.command.send(id, command)
  }

  top(id: string) {
    return this.step(id, 0)
  }
  down(id: string) {
    return this.step(id, 180)
  }
  left(id: string) {
    return this.step(id, 270)
  }
  right(id: string) {
    return this.step(id, 90)
  }

  deleteNode(robotId: string, nodeIds: string[]) {
    let all = nodeIds.map((x) => this.service.mesh.node.delete(robotId, x))
    return Promise.all(all)
  }
  deleteEdge(robotId: string, edgeIds: string[]) {
    let all = edgeIds.map((x) => this.service.mesh.edge.delete(robotId, x))
    return Promise.all(all)
  }

  update(id: string, node: MeshNode) {
    return this.service.mesh.node.update(id, node).then((x) => {
      // this._location.Position.X = x.Position.X
      // this._location.Position.Y = x.Position.Y
      return x
    })
  }
  createNode(id: string, node: MeshNode) {
    return this.service.mesh.node.create(id, node).then((x) => {
      this._location.Position.X = x.Position.X
      this._location.Position.Y = x.Position.Y
      return x
    })
  }
  createEdge(id: string, edge: MeshEdge) {
    return this.service.mesh.edge.create(id, edge)
  }

  async result(id: string) {
    return new Promise<RobotCommandResult[]>((resolve, reject) => {
      this.service.command.results(id).then((results) => {
        let filter = results.filter(
          (x) =>
            x.Code == 0 &&
            x.CmdType === RobotCommandType.MeshStep &&
            x.Id === this.commandId
        )
        if (filter && filter.length > 0) {
          resolve(filter)
        }
        let error = results.find(
          (x) =>
            x.Code != 0 &&
            x.CmdType === RobotCommandType.MeshStep &&
            x.Id === this.commandId
        )
        if (error) {
          reject(error)
        }
      })
    })
  }
}
