import { RobotCommandType } from '../../data-core/enums/robot/robot-command-type.enum'
import { MeshEdge } from '../../data-core/models/robot/mesh-edge.model'
import { MeshNode } from '../../data-core/models/robot/mesh-node.model'
import { RobotMeshStepCommand } from '../../data-core/models/robot/robot-command-mesh-step.model'
import { RobotCommandResult } from '../../data-core/models/robot/robot-command-result.model'
import { HowellHttpClient } from '../../data-core/requests/http-client'
import { ArmRobotRequestService } from '../../data-core/requests/services/robot/robot.service'
import { DeviceRobotConfigModel } from './device-robot-config.model'

export class DeviceRobotConfigBusiness {
  client = new HowellHttpClient.HttpClient()
  service = new ArmRobotRequestService(this.client.http)
  commandId = 0

  _result?: RobotCommandResult

  async load(id: string) {
    let model = new DeviceRobotConfigModel()
    model.nodes = await this.service.mesh.node.array(id)
    model.edges = await this.service.mesh.edge.array(id)
    model.location = await this.service.location(id)
    return model
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
    return this.service.command.send(id, command).then((x) => {
      this._result = new RobotCommandResult()
      this._result.Id = this.commandId
      this._result.CmdType = RobotCommandType.MeshStep
      this._result.Code = 0
      this._result.Time = new Date()
      this._result.Data = {
        Direction: direction,
        Distance: Math.random() * 100,
        Rfid: '1234567890',
      }

      return x
    })
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
    return this.service.mesh.node.update(id, node)
  }
  createNode(id: string, node: MeshNode) {
    return this.service.mesh.node.create(id, node)
  }
  createEdge(id: string, edge: MeshEdge) {
    return this.service.mesh.edge.create(id, edge)
  }

  async result(id: string) {
    return new Promise<RobotCommandResult[]>((resolve) => {
      this.service.command.results(id).then((results) => {
        let filter = results.filter(
          (x) =>
            x.Code == 0 &&
            x.CmdType === RobotCommandType.MeshStep &&
            x.Id === this.commandId
        )
        resolve(filter)
      })
    })
  }
}
