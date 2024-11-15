import { MeshDestination } from '../../../data-core/models/robot/mesh-destination.model'
import { MeshNode } from '../../../data-core/models/robot/mesh-node.model'
import { RobotChangeToCommand } from '../../../data-core/models/robot/robot-command-change-to.model'
import { RobotMoveToCommand } from '../../../data-core/models/robot/robot-command-move-to.model'
import { RobotSprayCommand } from '../../../data-core/models/robot/robot-command-spray.model'
import { RobotTransportToCommand } from '../../../data-core/models/robot/robot-command-transport-to.model'
import { RobotWeighCommand } from '../../../data-core/models/robot/robot-command-weigh.model'
import { Robot } from '../../../data-core/models/robot/robot.model'
import { HowellHttpClient } from '../../../data-core/requests/http-client'
import { ArmRobotRequestService } from '../../../data-core/requests/services/robot/robot.service'
import {
  DeviceRobotModel,
  DeviceRobotStatus,
} from '../../device-robot/device-robot.model'
import { IDeviceRobotPlayHtmlTemplateCompactionEventArgs } from '../controller/details/template/compaction/device-robot-play-details-compaction.model'
import { IDeviceRobotPlayHtmlTemplateSprayEventArgs } from '../controller/details/template/spray/device-robot-play-details-spray.model'
import { DeviceRobotPlayTrashCanBusiness } from './device-robot-play-trashcan.business'

export class DeviceRobotPlayBusiness {
  constructor() {}
  private client = new HowellHttpClient.HttpClient()
  private service = new ArmRobotRequestService(this.client.http)
  private commandId = 0
  private _robot?: Robot

  trashcan = new DeviceRobotPlayTrashCanBusiness(this.client.http)

  async load(id: string) {
    let model = new DeviceRobotModel()
    model.nodes = await this.service.mesh.node.array(id)
    model.edges = await this.service.mesh.edge.array(id)
    model.location = await this.service.location(id)
    model.robot = this.robot(id)
    model.battery = this.battery(id)
    model.trashcans = await this.trashcan.load()
    return model
  }

  async status(id: string) {
    let model = new DeviceRobotStatus()
    model.location = await this.service.location(id)
    model.robot = this.robot(id)
    model.battery = this.battery(id)
    return model
  }

  async robot(id: string) {
    if (this._robot) {
      return this._robot
    }
    this._robot = await this.service.get(id)
    return this._robot
  }
  battery(id: string) {
    return this.service.battery(id)
  }

  moveto(id: string, node: MeshNode) {
    this.commandId++
    let command = new RobotMoveToCommand()
    command.Id = this.commandId
    command.Data = {
      Destination: this.convert(node),
    }
    return this.service.command.send(id, command).then((x) => {
      if (x.Id) {
        this.commandId = x.Id
      }
      return x
    })
  }

  weigh(id: string, node: MeshNode) {
    this.commandId++
    let command = new RobotWeighCommand()
    command.Id = this.commandId
    command.Data = {
      Destination: this.convert(node),
    }
    return this.service.command.send(id, command).then((x) => {
      if (x.Id) {
        this.commandId = x.Id
      }
      return x
    })
  }

  changeto(id: string, store: MeshNode, drop: MeshNode) {
    this.commandId++
    let command = new RobotChangeToCommand()
    command.Id = this.commandId
    command.Data = {
      StorePort: this.convert(store),
      DropPort: this.convert(drop),
    }
    return this.service.command.send(id, command).then((x) => {
      if (x.Id) {
        this.commandId = x.Id
      }
      return x
    })
  }

  spray(
    id: string,
    node: MeshNode,
    args: IDeviceRobotPlayHtmlTemplateSprayEventArgs
  ) {
    this.commandId++
    let command = new RobotSprayCommand()
    command.Id = this.commandId
    command.Data = {
      SterilizedPort: this.convert(node),
      Times: args.times,
    }
    return this.service.command.send(id, command).then((x) => {
      if (x.Id) {
        this.commandId = x.Id
      }
      return x
    })
  }
  transportto(
    id: string,
    drop: MeshNode,
    node: MeshNode,
    args: IDeviceRobotPlayHtmlTemplateCompactionEventArgs
  ) {
    this.commandId++
    let command = new RobotTransportToCommand()
    command.Id = this.commandId
    command.Data = {
      StartingPoint: this.convert(drop),
      Destination: this.convert(node),
      StartHasTrashCan: args.startcan,
      DestHasTrashCan: args.endcan,
      StartCovered: args.covered,
    }
    return this.service.command.send(id, command).then((x) => {
      if (x.Id) {
        this.commandId = x.Id
      }
      return x
    })
  }

  convert(node: MeshNode) {
    let destination = new MeshDestination()
    destination.Id = node.Id
    destination.Position = node.Position
    return destination
  }
}
