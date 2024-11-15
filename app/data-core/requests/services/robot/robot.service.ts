import { instanceToPlain } from 'class-transformer'
import { RobotCapability } from '../../../models/capabilities/robot/robot-capability.model'
import { PagedList } from '../../../models/page-list.model'
import { HowellResponse } from '../../../models/response'
import { MeshEdge } from '../../../models/robot/mesh-edge.model'
import { MeshLocation } from '../../../models/robot/mesh-location.model'
import { MeshNode } from '../../../models/robot/mesh-node.model'
import { RobotBattery } from '../../../models/robot/robot-battery.model'
import { RobotCalibration } from '../../../models/robot/robot-calibration.model'
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
import { SearchLogParams } from './robot.params'

export class ArmRobotRequestService {
  constructor(private http: HowellAuthHttp) {}

  array() {
    let url = ArmRobotUrl.basic()
    return this.http.get<HowellResponse<Robot[]>>(url).then((x) => {
      return HowellResponseProcess.array(x, Robot)
    })
  }
  create(data: Robot) {
    let url = ArmRobotUrl.basic()
    let plain = instanceToPlain(data)
    return this.http.post<any, HowellResponse<Robot>>(url, plain).then((x) => {
      return HowellResponseProcess.item(x, Robot)
    })
  }
  get(id: string) {
    let url = ArmRobotUrl.item(id)
    return this.http.get<HowellResponse<Robot>>(url).then((x) => {
      return HowellResponseProcess.item(x, Robot)
    })
  }
  update(data: Robot) {
    let url = ArmRobotUrl.item(data.Id)
    let plain = instanceToPlain(data)
    return this.http.put<any, HowellResponse<Robot>>(url, plain).then((x) => {
      return HowellResponseProcess.item(x, Robot)
    })
  }
  delete(id: string) {
    let url = ArmRobotUrl.item(id)
    return this.http.delete<HowellResponse<Robot>>(url).then((x) => {
      return HowellResponseProcess.item(x, Robot)
    })
  }

  device = {
    types: () => {
      let url = ArmRobotUrl.device.types()
      return this.http.get<HowellResponse<string[]>>(url)
    },
    errors: (id: string) => {
      let url = ArmRobotUrl.device.errors(id)
      return this.http
        .get<HowellResponse<RobotDeviceError[]>>(url)
        .then((x) => {
          return HowellResponseProcess.array(x, RobotDeviceError)
        })
    },
  }

  search(timeout?: number, type?: string) {
    let url = ArmRobotUrl.search(timeout, type)
    return this.http.get<HowellResponse<RobotSearchResult[]>>(url).then((x) => {
      return HowellResponseProcess.array(x, RobotSearchResult)
    })
  }

  battery(id: string) {
    let url = ArmRobotUrl.battery(id)
    return this.http.get<HowellResponse<RobotBattery>>(url).then((x) => {
      return HowellResponseProcess.item(x, RobotBattery)
    })
  }

  location(id: string) {
    let url = ArmRobotUrl.location(id)
    return this.http.get<HowellResponse<MeshLocation>>(url).then((x) => {
      return HowellResponseProcess.item(x, MeshLocation)
    })
  }

  private _command?: ArmRobotCommandsRequestService
  public get command(): ArmRobotCommandsRequestService {
    if (!this._command) {
      this._command = new ArmRobotCommandsRequestService(this.http)
    }
    return this._command
  }

  calibration = {
    start: (id: string) => {
      let url = ArmRobotUrl.calibration.start(id)
      return this.http.post<HowellResponse>(url).then((x) => {
        return x.FaultCode === 0
      })
    },
    stop: (id: string) => {
      let url = ArmRobotUrl.calibration.stop(id)
      return this.http.post<HowellResponse>(url).then((x) => {
        return x.FaultCode === 0
      })
    },
    status: (id: string) => {
      let url = ArmRobotUrl.calibration.status(id)
      return this.http.get<HowellResponse<RobotCalibration>>(url).then((x) => {
        return HowellResponseProcess.item(x, RobotCalibration)
      })
    },
  }

  capability(type: string = 'GCRA') {
    let url = ArmRobotUrl.capability(type)
    return this.http.get<HowellResponse<RobotCapability>>(url).then((x) => {
      return HowellResponseProcess.item(x, RobotCapability)
    })
  }

  logs(id: string, params: SearchLogParams): Promise<PagedList<LogItem>> {
    let url = ArmRobotUrl.Logs(id)
    let plain = instanceToPlain(params)
    return this.http
      .post<any, HowellResponse<PagedListLogItem>>(url, plain)
      .then((x) => {
        return HowellResponseProcess.item(x, PagedListLogItem)
      })
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
  array(id: string) {
    let url = ArmRobotUrl.command(id).basic()
    return this.http.get<HowellResponse<RobotCommand[]>>(url).then((x) => {
      return HowellResponseProcess.array(x, RobotCommand)
    })
  }
  send(id: string, command: RobotCommand) {
    let url = ArmRobotUrl.command(id).basic()
    let plain = instanceToPlain(command)
    return this.http
      .post<any, HowellResponse<RobotCommand>>(url, plain)
      .then((x) => {
        return HowellResponseProcess.item(x, RobotCommand)
      })
  }
  delete(id: string) {
    let url = ArmRobotUrl.command(id).basic()
    return this.http.delete<HowellResponse<RobotCommand[]>>(url).then((x) => {
      return HowellResponseProcess.array(x, RobotCommand)
    })
  }

  results(id: string) {
    let url = ArmRobotUrl.command(id).results()
    return this.http
      .get<HowellResponse<RobotCommandResult[]>>(url)
      .then((x) => {
        return HowellResponseProcess.array(x, RobotCommandResult)
      })
  }
}

class ArmRobotMeshNodesRequestService {
  constructor(private http: HowellAuthHttp) {}
  array(robotId: string) {
    let url = ArmRobotUrl.mesh.node(robotId).basic()
    return this.http.get<HowellResponse<MeshNode[]>>(url).then((x) => {
      return HowellResponseProcess.array(x, MeshNode)
    })
  }
  create(robotId: string, data: MeshNode) {
    let url = ArmRobotUrl.mesh.node(robotId).basic()
    let plain = instanceToPlain(data)
    return this.http
      .post<any, HowellResponse<MeshNode>>(url, plain)
      .then((x) => {
        return HowellResponseProcess.item(x, MeshNode)
      })
  }

  sync(robotId: string, data: MeshNode[]) {
    let url = ArmRobotUrl.mesh.node(robotId).sync()
    let plain = instanceToPlain(data)
    return this.http
      .post<any, HowellResponse<MeshNode[]>>(url, plain)
      .then((x) => {
        return HowellResponseProcess.array(x, MeshNode)
      })
  }
  get(robotId: string, itemId: string) {
    let url = ArmRobotUrl.mesh.node(robotId).item(itemId)
    return this.http.get<HowellResponse<MeshNode>>(url).then((x) => {
      return HowellResponseProcess.item(x, MeshNode)
    })
  }
  update(robotId: string, data: MeshNode) {
    let url = ArmRobotUrl.mesh.node(robotId).item(data.Id)
    let plain = instanceToPlain(data)
    return this.http
      .put<any, HowellResponse<MeshNode>>(url, plain)
      .then((x) => {
        return HowellResponseProcess.item(x, MeshNode)
      })
  }
  delete(robotId: string, itemId: string) {
    let url = ArmRobotUrl.mesh.node(robotId).item(itemId)
    return this.http.delete<HowellResponse<MeshNode>>(url).then((x) => {
      return HowellResponseProcess.item(x, MeshNode)
    })
  }
}

class ArmRobotMeshEdgesRequestService {
  constructor(private http: HowellAuthHttp) {}
  array(robotId: string) {
    let url = ArmRobotUrl.mesh.edge(robotId).basic()
    return this.http.get<HowellResponse<MeshEdge[]>>(url).then((x) => {
      return HowellResponseProcess.array(x, MeshEdge)
    })
  }
  create(robotId: string, data: MeshEdge) {
    let url = ArmRobotUrl.mesh.edge(robotId).basic()
    let plain = instanceToPlain(data)
    return this.http
      .post<any, HowellResponse<MeshEdge>>(url, plain)
      .then((x) => {
        return HowellResponseProcess.item(x, MeshEdge)
      })
  }
  get(robotId: string, itemId: string) {
    let url = ArmRobotUrl.mesh.edge(robotId).item(itemId)
    return this.http.get<HowellResponse<MeshEdge>>(url).then((x) => {
      return HowellResponseProcess.item(x, MeshEdge)
    })
  }
  update(robotId: string, data: MeshEdge) {
    let url = ArmRobotUrl.mesh.edge(robotId).item(data.Id)
    let plain = instanceToPlain(data)
    return this.http
      .put<any, HowellResponse<MeshEdge>>(url, plain)
      .then((x) => {
        return HowellResponseProcess.item(x, MeshEdge)
      })
  }
  delete(robotId: string, itemId: string) {
    let url = ArmRobotUrl.mesh.edge(robotId).item(itemId)
    return this.http.delete<HowellResponse<MeshEdge>>(url).then((x) => {
      return HowellResponseProcess.item(x, MeshEdge)
    })
  }
}
