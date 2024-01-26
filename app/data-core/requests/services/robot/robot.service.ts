import { instanceToPlain, plainToInstance } from 'class-transformer'
import { RobotCapability } from '../../../models/capabilities/robot/robot-capability.model'
import { PagedList } from '../../../models/page-list.model'
import { HowellResponse } from '../../../models/response'
import { MeshEdge } from '../../../models/robot/mesh-edge.model'
import { MeshLocation } from '../../../models/robot/mesh-location.model'
import { MeshNode } from '../../../models/robot/mesh-node.model'
import { RobotBattery } from '../../../models/robot/robot-battery.model'
import { RobotCommandResult } from '../../../models/robot/robot-command-result.model'
import { RobotCommand } from '../../../models/robot/robot-command.model'
import { RobotDeviceError } from '../../../models/robot/robot-device-error.model'
import {
  LogItem,
  PagedListLogItem,
} from '../../../models/robot/robot-log-item.model'
import { RobotSearchResult } from '../../../models/robot/robot-search-result.model'
import { Robot } from '../../../models/robot/robot.model'
import { ArmRobotUrl } from '../../../urls/arm/robot/robot.url'
import { HowellAuthHttp } from '../../auth/howell-auth-http'
import { HowellResponseProcess } from '../../service-process'
import { SearchLogParams } from './robot.prams'

export class ArmRobotRequestService {
  constructor(private http: HowellAuthHttp) {}

  async array() {
    let url = ArmRobotUrl.basic()
    let response = await this.http.get<HowellResponse<Robot[]>>(url)
    if (response.FaultCode != 0) {
      throw new Error(`${response.FaultCode} ${response.FaultReason}`)
    }
    return plainToInstance(Robot, response.Data)
  }
  async create(data: Robot) {
    let url = ArmRobotUrl.basic()
    let plain = instanceToPlain(data)
    let response = await this.http.post<any, HowellResponse<Robot>>(url, plain)
    if (response.FaultCode != 0) {
      throw new Error(`${response.FaultCode} ${response.FaultReason}`)
    }
    return plainToInstance(Robot, response.Data)
  }
  async get(id: string) {
    let url = ArmRobotUrl.item(id)
    let response = await this.http.get<HowellResponse<Robot>>(url)
    if (response.FaultCode != 0) {
      throw new Error(`${response.FaultCode} ${response.FaultReason}`)
    }
    return plainToInstance(Robot, response.Data)
  }
  async update(data: Robot) {
    let url = ArmRobotUrl.item(data.Id)
    let plain = instanceToPlain(data)
    let response = await this.http.put<any, HowellResponse<Robot>>(url, plain)
    if (response.FaultCode != 0) {
      throw new Error(`${response.FaultCode} ${response.FaultReason}`)
    }
    return plainToInstance(Robot, response.Data)
  }
  async delete(id: string) {
    let url = ArmRobotUrl.item(id)
    let response = await this.http.delete<HowellResponse<Robot>>(url)
    if (response.FaultCode != 0) {
      throw new Error(`${response.FaultCode} ${response.FaultReason}`)
    }
    return plainToInstance(Robot, response.Data)
  }

  device = {
    types: () => {
      let url = ArmRobotUrl.device.types()
      return this.http.get<HowellResponse<string[]>>(url)
    },
    errors: async (id: string) => {
      let url = ArmRobotUrl.device.errors(id)
      let response = await this.http.get<HowellResponse<RobotDeviceError[]>>(
        url
      )
      if (response.FaultCode != 0) {
        throw new Error(`${response.FaultCode} ${response.FaultReason}`)
      }
      return plainToInstance(RobotDeviceError, response.Data)
    },
  }

  async search(timeout?: number, type?: string) {
    let url = ArmRobotUrl.search(timeout, type)
    let response = await this.http.get<HowellResponse<RobotSearchResult[]>>(url)
    if (response.FaultCode != 0) {
      throw new Error(`${response.FaultCode} ${response.FaultReason}`)
    }
    return plainToInstance(RobotSearchResult, response.Data)
  }

  async battery(id: string) {
    let url = ArmRobotUrl.battery(id)
    let response = await this.http.get<HowellResponse<RobotBattery>>(url)
    if (response.FaultCode != 0) {
      throw new Error(`${response.FaultCode} ${response.FaultReason}`)
    }
    return plainToInstance(RobotBattery, response.Data)
  }

  async location(id: string) {
    let url = ArmRobotUrl.location(id)
    let response = await this.http.get<HowellResponse<MeshLocation>>(url)
    if (response.FaultCode != 0) {
      throw new Error(`${response.FaultCode} ${response.FaultReason}`)
    }
    return plainToInstance(MeshLocation, response.Data)
  }

  private _command?: ArmRobotCommandsRequestService
  public get command(): ArmRobotCommandsRequestService {
    if (!this._command) {
      this._command = new ArmRobotCommandsRequestService(this.http)
    }
    return this._command
  }

  calibration = {
    start: async (id: string) => {
      let url = ArmRobotUrl.calibration.start(id)
      let response = await this.http.post<HowellResponse>(url)
      return response.FaultCode === 0
    },
    stop: async (id: string) => {
      let url = ArmRobotUrl.calibration.stop(id)
      let response = await this.http.post<HowellResponse>(url)
      return response.FaultCode === 0
    },
  }

  capability(type: string = 'GCRA') {
    let url = ArmRobotUrl.capability(type)
    return this.http.get<HowellResponse<RobotCapability>>(url).then((x) => {
      return HowellResponseProcess.get(x, RobotCapability)
    })
  }

  async logs(id: string, params: SearchLogParams): Promise<PagedList<LogItem>> {
    let url = ArmRobotUrl.Logs(id)
    let plain = instanceToPlain(params)
    let response = await this.http.post<any, HowellResponse<PagedListLogItem>>(
      url,
      plain
    )
    if (response.FaultCode != 0) {
      throw new Error(`${response.FaultCode} ${response.FaultReason}`)
    }
    return plainToInstance(PagedListLogItem, response.Data)
  }

  private _node?: ArmRobotMeshNodesRequestService
  private get node(): ArmRobotMeshNodesRequestService {
    if (!this._node) {
      this._node = new ArmRobotMeshNodesRequestService(this.http)
    }
    return this._node
  }
  private _edge?: ArmRobotMeshEdgesRequestService
  private get edge(): ArmRobotMeshEdgesRequestService {
    if (!this._edge) {
      this._edge = new ArmRobotMeshEdgesRequestService(this.http)
    }
    return this._edge
  }

  mesh = {
    node: this.node,
    edge: this.edge,
  }
}
class ArmRobotCommandsRequestService {
  constructor(private http: HowellAuthHttp) {}
  async array(id: string) {
    let url = ArmRobotUrl.command(id).basic()
    let response = await this.http.get<HowellResponse<RobotCommand[]>>(url)
    if (response.FaultCode != 0) {
      throw new Error(`${response.FaultCode} ${response.FaultReason}`)
    }
    return plainToInstance(RobotCommand, response.Data)
  }
  async send(id: string, command: RobotCommand) {
    let url = ArmRobotUrl.command(id).basic()
    let plain = instanceToPlain(command)
    let response = await this.http.post<any, HowellResponse<RobotCommand[]>>(
      url,
      plain
    )
    if (response.FaultCode != 0) {
      throw new Error(`${response.FaultCode} ${response.FaultReason}`)
    }
    return plainToInstance(RobotCommand, response.Data)
  }
  async delete(id: string) {
    let url = ArmRobotUrl.command(id).basic()
    let response = await this.http.delete<HowellResponse<RobotCommand[]>>(url)
    if (response.FaultCode != 0) {
      throw new Error(`${response.FaultCode} ${response.FaultReason}`)
    }
    return plainToInstance(RobotCommand, response.Data)
  }

  async results(id: string) {
    let url = ArmRobotUrl.command(id).results()
    let response = await this.http.get<HowellResponse<RobotCommandResult[]>>(
      url
    )
    if (response.FaultCode != 0) {
      throw new Error(`${response.FaultCode} ${response.FaultReason}`)
    }
    return plainToInstance(RobotCommandResult, response.Data)
  }
}

class ArmRobotMeshNodesRequestService {
  constructor(private http: HowellAuthHttp) {}
  async array(robotId: string) {
    let url = ArmRobotUrl.mesh.node(robotId).basic()
    let response = await this.http.get<HowellResponse<MeshNode[]>>(url)
    if (response.FaultCode != 0) {
      throw new Error(`${response.FaultCode} ${response.FaultReason}`)
    }
    return plainToInstance(MeshNode, response.Data)
  }
  async create(robotId: string, data: MeshNode) {
    let url = ArmRobotUrl.mesh.node(robotId).basic()
    let plain = instanceToPlain(data)
    let response = await this.http.post<any, HowellResponse<MeshNode>>(
      url,
      plain
    )
    if (response.FaultCode != 0) {
      throw new Error(`${response.FaultCode} ${response.FaultReason}`)
    }
    return plainToInstance(MeshNode, response.Data)
  }
  async get(robotId: string, itemId: string) {
    let url = ArmRobotUrl.mesh.node(robotId).item(itemId)
    let response = await this.http.get<HowellResponse<MeshNode>>(url)
    if (response.FaultCode != 0) {
      throw new Error(`${response.FaultCode} ${response.FaultReason}`)
    }
    return plainToInstance(MeshNode, response.Data)
  }
  async update(robotId: string, data: MeshNode) {
    let url = ArmRobotUrl.mesh.node(robotId).item(data.Id)
    let plain = instanceToPlain(data)
    let response = await this.http.put<any, HowellResponse<MeshNode>>(
      url,
      plain
    )
    if (response.FaultCode != 0) {
      throw new Error(`${response.FaultCode} ${response.FaultReason}`)
    }
    return plainToInstance(MeshNode, response.Data)
  }
  async delete(robotId: string, itemId: string) {
    let url = ArmRobotUrl.mesh.node(robotId).item(itemId)
    let response = await this.http.delete<HowellResponse<MeshNode>>(url)
    if (response.FaultCode != 0) {
      throw new Error(`${response.FaultCode} ${response.FaultReason}`)
    }
    return plainToInstance(MeshNode, response.Data)
  }
}

class ArmRobotMeshEdgesRequestService {
  constructor(private http: HowellAuthHttp) {}
  async array(robotId: string) {
    let url = ArmRobotUrl.mesh.edge(robotId).basic()
    let response = await this.http.get<HowellResponse<MeshEdge[]>>(url)
    if (response.FaultCode != 0) {
      throw new Error(`${response.FaultCode} ${response.FaultReason}`)
    }
    return plainToInstance(MeshEdge, response.Data)
  }
  async create(robotId: string, data: MeshEdge) {
    let url = ArmRobotUrl.mesh.edge(robotId).basic()
    let plain = instanceToPlain(data)
    let response = await this.http.post<any, HowellResponse<MeshEdge>>(
      url,
      plain
    )
    if (response.FaultCode != 0) {
      throw new Error(`${response.FaultCode} ${response.FaultReason}`)
    }
    return plainToInstance(MeshEdge, response.Data)
  }
  async get(robotId: string, itemId: string) {
    let url = ArmRobotUrl.mesh.edge(robotId).item(itemId)
    let response = await this.http.get<HowellResponse<MeshEdge>>(url)
    if (response.FaultCode != 0) {
      throw new Error(`${response.FaultCode} ${response.FaultReason}`)
    }
    return plainToInstance(MeshEdge, response.Data)
  }
  async update(robotId: string, data: MeshEdge) {
    let url = ArmRobotUrl.mesh.edge(robotId).item(data.Id)
    let plain = instanceToPlain(data)
    let response = await this.http.put<any, HowellResponse<MeshEdge>>(
      url,
      plain
    )
    if (response.FaultCode != 0) {
      throw new Error(`${response.FaultCode} ${response.FaultReason}`)
    }
    return plainToInstance(MeshEdge, response.Data)
  }
  async delete(robotId: string, itemId: string) {
    let url = ArmRobotUrl.mesh.edge(robotId).item(itemId)
    let response = await this.http.delete<HowellResponse<MeshEdge>>(url)
    if (response.FaultCode != 0) {
      throw new Error(`${response.FaultCode} ${response.FaultReason}`)
    }
    return plainToInstance(MeshEdge, response.Data)
  }
}
