import { AnalysisServerCapability } from '../../models/arm/analysis/analysis-server-capability.model'
import { SecurityCapability } from '../../models/capabilities/arm/cecurity-capability.model'
import { DepolymentCapability } from '../../models/capabilities/arm/depolyment-capability.model'
import { DeviceCapability } from '../../models/capabilities/arm/device-capability.model'
import { InputProxyCapability } from '../../models/capabilities/arm/input-proxy-capability.model'
import { NetworkCapability } from '../../models/capabilities/arm/network-capability.model'
import { RobotCapability } from '../../models/capabilities/robot/robot-capability.model'
import { TrashCanCapability } from '../../models/capabilities/robot/trash-can-capability.model'
import { HowellAuthHttp } from '../auth/howell-auth-http'
import { HowellHttpClient } from '../http-client'
import { ArmDeploymentRequestService } from '../services/deployment/deployment.service'
import { ArmRobotRequestService } from '../services/robot/robot.service'
import { ArmServerRequestService } from '../services/servers/server.service'
import { ArmSystemRequestService } from '../services/system/system.service'
import { ArmTrashCansRequestService } from '../services/trash-cans/trash-cans.service'

export class CapabilityManager {
  private client = new HowellHttpClient.HttpClient()
  private service = {
    system: new ArmSystemRequestService(this.client.http),
    depolyment: new ArmDeploymentRequestService(this.client.http),
    robot: new ArmRobotRequestService(this.client.http),
    trashcan: new ArmTrashCansRequestService(this.client.http),
  }

  private _device?: DeviceCapability
  public get device(): Promise<DeviceCapability> {
    return new Promise<DeviceCapability>((resolve) => {
      if (!this._device) {
        this.service.system.capability().then((x) => {
          this._device = x
          resolve(this._device)
        })
      } else {
        return resolve(this._device)
      }
    })
  }

  private _security?: SecurityCapability
  public get security(): Promise<SecurityCapability> {
    return new Promise<SecurityCapability>((resolve) => {
      if (!this._security) {
        this.service.system.security.capability().then((x) => {
          this._security = x
          resolve(this._security)
        })
      } else {
        return resolve(this._security)
      }
    })
  }

  private _network?: NetworkCapability
  public get network(): Promise<NetworkCapability> {
    return new Promise<NetworkCapability>((resolve) => {
      if (!this._network) {
        this.service.system.network.capability().then((x) => {
          this._network = x
          resolve(this._network)
        })
      } else {
        return resolve(this._network)
      }
    })
  }

  private _depolyment?: DepolymentCapability
  public get depolyment(): Promise<DepolymentCapability> {
    return new Promise<DepolymentCapability>((resolve) => {
      if (!this._depolyment) {
        this.service.depolyment.capability().then((x) => {
          this._depolyment = x
          resolve(this._depolyment)
        })
      } else {
        return resolve(this._depolyment)
      }
    })
  }

  private _inputproxy?: InputProxyCapability
  public get inputproxy(): Promise<InputProxyCapability> {
    return new Promise<InputProxyCapability>((resolve) => {
      if (!this._inputproxy) {
        this.service.system.input.proxy.capability().then((x) => {
          this._inputproxy = x
          resolve(this._inputproxy)
        })
      } else {
        return resolve(this._inputproxy)
      }
    })
  }

  private _robot?: RobotCapability
  public get robot(): Promise<RobotCapability> {
    return new Promise<RobotCapability>((resolve) => {
      if (!this._robot) {
        this.service.robot.capability().then((x) => {
          this._robot = x
          resolve(this._robot)
        })
      } else {
        return resolve(this._robot)
      }
    })
  }

  private _trashcan?: TrashCanCapability
  public get trashcan(): Promise<TrashCanCapability> {
    return new Promise<TrashCanCapability>((resolve) => {
      if (!this._trashcan) {
        this.service.trashcan.capability().then((x) => {
          this._trashcan = x
          resolve(this._trashcan)
        })
      } else {
        return resolve(this._trashcan)
      }
    })
  }

  private _server?: ServerCapabilityManager
  public get server(): ServerCapabilityManager {
    if (!this._server) {
      this._server = new ServerCapabilityManager(this.client.http)
    }
    return this._server
  }
}

class ServerCapabilityManager {
  constructor(http: HowellAuthHttp) {
    this.service = new ArmServerRequestService(http)
  }
  service: ArmServerRequestService

  private _analysis?: AnalysisServerCapability
  public get analysis(): Promise<AnalysisServerCapability> {
    return new Promise<AnalysisServerCapability>((resolve) => {
      if (!this._analysis) {
        this.service.analysis.capability().then((x) => {
          this._analysis = x
          resolve(this._analysis)
        })
      } else {
        return resolve(this._analysis)
      }
    })
  }
}
