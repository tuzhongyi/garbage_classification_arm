import { wait } from '../../../common/tools/wait'
import { AnalysisServerCapability } from '../../models/arm/analysis/analysis-server-capability.model'
import { SecurityCapability } from '../../models/capabilities/arm/cecurity-capability.model'
import { DepolymentCapability } from '../../models/capabilities/arm/depolyment-capability.model'
import { DeviceCapability } from '../../models/capabilities/arm/device-capability.model'
import { InputProxyCapability } from '../../models/capabilities/arm/input-proxy-capability.model'
import { NetworkCapability } from '../../models/capabilities/arm/network-capability.model'
import { EventCapability } from '../../models/capabilities/events/event-capability.model'
import { RobotCapability } from '../../models/capabilities/robot/robot-capability.model'
import { TrashCanCapability } from '../../models/capabilities/robot/trash-can-capability.model'
import { SortationCapability } from '../../models/capabilities/sortation/sortation-capability.model'
import { HowellAuthHttp } from '../auth/howell-auth-http'
import { HowellHttpClient } from '../http-client'
import { ArmDeploymentRequestService } from '../services/deployment/deployment.service'
import { ArmEventRequestService } from '../services/event/event.service'
import { ArmRobotRequestService } from '../services/robot/robot.service'
import { ArmServerRequestService } from '../services/servers/server.service'
import { ArmSortationRequestService } from '../services/sortation/sortation.service'
import { ArmSystemRequestService } from '../services/system/system.service'
import { ArmTrashCansRequestService } from '../services/trash-cans/trash-cans.service'

export class CapabilityManager {
  private client = new HowellHttpClient.HttpClient()
  private service = {
    system: new ArmSystemRequestService(this.client.http),
    depolyment: new ArmDeploymentRequestService(this.client.http),
    robot: new ArmRobotRequestService(this.client.http),
    trashcan: new ArmTrashCansRequestService(this.client.http),
    event: new ArmEventRequestService(this.client.http),
    sortation: new ArmSortationRequestService(this.client.http),
  }

  private loading = {
    device: false,
    security: false,
    network: false,
    depolyment: false,
    inputproxy: false,
    robot: false,
    trashcan: false,
    event: false,
    sortation: false,
  }

  private _device?: DeviceCapability
  public get device(): Promise<DeviceCapability> {
    if (this.loading.device) {
      return new Promise<DeviceCapability>((resolve) => {
        wait(
          () => {
            return this.loading.device === false && !!this._device
          },
          () => {
            if (this._device) {
              resolve(this._device)
            }
          }
        )
      })
    }
    if (this._device) {
      return Promise.resolve(this._device)
    }
    this.loading.device = true
    return new Promise<DeviceCapability>((resolve) => {
      this.service.system.capability().then((x) => {
        this._device = x
        this.loading.device = false
        resolve(this._device)
      })
    })
  }

  private _security?: SecurityCapability
  public get security(): Promise<SecurityCapability> {
    if (this.loading.security) {
      return new Promise<SecurityCapability>((resolve) => {
        wait(
          () => {
            return this.loading.security === false && !!this._security
          },
          () => {
            if (this._security) {
              resolve(this._security)
            }
          }
        )
      })
    }
    if (this._security) {
      return Promise.resolve(this._security)
    }
    this.loading.security = true
    return new Promise<SecurityCapability>((resolve) => {
      this.service.system.security.capability().then((x) => {
        this._security = x
        this.loading.security = false
        resolve(this._security)
      })
    })
  }

  private _network?: NetworkCapability
  public get network(): Promise<NetworkCapability> {
    if (this.loading.network) {
      return new Promise<NetworkCapability>((resolve) => {
        wait(
          () => {
            return this.loading.network === false && !!this._network
          },
          () => {
            if (this._network) {
              resolve(this._network)
            }
          }
        )
      })
    }
    if (this._network) {
      return Promise.resolve(this._network)
    }
    this.loading.network = true
    return new Promise<NetworkCapability>((resolve) => {
      this.service.system.network.capability().then((x) => {
        this._network = x
        this.loading.network = false
        resolve(this._network)
      })
    })
  }

  private _depolyment?: DepolymentCapability
  public get depolyment(): Promise<DepolymentCapability> {
    if (this.loading.depolyment) {
      return new Promise<DepolymentCapability>((resolve) => {
        wait(
          () => {
            return this.loading.depolyment === false && !!this._depolyment
          },
          () => {
            if (this._depolyment) {
              resolve(this._depolyment)
            }
          }
        )
      })
    }
    if (this._depolyment) {
      return Promise.resolve(this._depolyment)
    }
    this.loading.depolyment = true
    return new Promise<DepolymentCapability>((resolve) => {
      this.service.depolyment.capability().then((x) => {
        this._depolyment = x
        this.loading.depolyment = false
        resolve(this._depolyment)
      })
    })
  }

  private _inputproxy?: InputProxyCapability
  public get inputproxy(): Promise<InputProxyCapability> {
    if (this.loading.inputproxy) {
      return new Promise<InputProxyCapability>((resolve) => {
        wait(
          () => {
            return this.loading.inputproxy === false && !!this._inputproxy
          },
          () => {
            if (this._inputproxy) {
              resolve(this._inputproxy)
            }
          }
        )
      })
    }
    if (this._inputproxy) {
      return Promise.resolve(this._inputproxy)
    }
    this.loading.inputproxy = true
    return new Promise<InputProxyCapability>((resolve) => {
      this.service.system.input.proxy.capability().then((x) => {
        this._inputproxy = x
        this.loading.inputproxy = false
        resolve(this._inputproxy)
      })
    })
  }

  private _robot?: RobotCapability
  public get robot(): Promise<RobotCapability> {
    if (this.loading.robot) {
      return new Promise<RobotCapability>((resolve) => {
        wait(
          () => {
            return this.loading.robot === false && !!this._robot
          },
          () => {
            if (this._robot) {
              resolve(this._robot)
            }
          }
        )
      })
    }
    if (this._robot) {
      return Promise.resolve(this._robot)
    }
    this.loading.robot = true
    return new Promise<RobotCapability>((resolve) => {
      this.service.robot.capability().then((x) => {
        this._robot = x
        this.loading.robot = false
        resolve(this._robot)
      })
    })
  }

  private _trashcan?: TrashCanCapability
  public get trashcan(): Promise<TrashCanCapability> {
    if (this.loading.trashcan) {
      return new Promise<TrashCanCapability>((resolve) => {
        wait(
          () => {
            return this.loading.trashcan === false && !!this._trashcan
          },
          () => {
            if (this._trashcan) {
              resolve(this._trashcan)
            }
          }
        )
      })
    }
    if (this._trashcan) {
      return Promise.resolve(this._trashcan)
    }
    this.loading.trashcan = true
    return new Promise<TrashCanCapability>((resolve) => {
      this.service.trashcan.capability().then((x) => {
        this._trashcan = x
        this.loading.trashcan = false
        resolve(this._trashcan)
      })
    })
  }

  private _server?: ServerCapabilityManager
  public get server(): ServerCapabilityManager {
    if (!this._server) {
      this._server = new ServerCapabilityManager(this.client.http)
    }
    return this._server
  }

  private _event?: EventCapability
  public get event(): Promise<EventCapability> {
    if (this.loading.event) {
      return new Promise<EventCapability>((resolve) => {
        wait(
          () => {
            return this.loading.event === false && !!this._event
          },
          () => {
            if (this._event) {
              resolve(this._event)
            }
          }
        )
      })
    }
    if (this._event) {
      return Promise.resolve(this._event)
    }
    this.loading.event = true
    return new Promise<EventCapability>((resolve) => {
      this.service.event.capability().then((x) => {
        this._event = x
        this.loading.event = false
        resolve(this._event)
      })
    })
  }

  private _sortation?: SortationCapability
  public get sortation(): Promise<SortationCapability> {
    if (this.loading.sortation) {
      return new Promise<SortationCapability>((resolve) => {
        wait(
          () => {
            return this.loading.sortation === false && !!this._sortation
          },
          () => {
            if (this._sortation) {
              resolve(this._sortation)
            }
          }
        )
      })
    }
    if (this._sortation) {
      return Promise.resolve(this._sortation)
    }
    this.loading.sortation = true
    return new Promise<SortationCapability>((resolve) => {
      this.service.sortation.capability().then((x) => {
        this._sortation = x
        this.loading.sortation = false
        resolve(this._sortation)
      })
    })
  }
}

class ServerCapabilityManager {
  constructor(http: HowellAuthHttp) {
    this.service = new ArmServerRequestService(http)
  }
  service: ArmServerRequestService
  private loading = {
    analysis: false,
  }
  private _analysis?: AnalysisServerCapability
  public get analysis(): Promise<AnalysisServerCapability> {
    if (this.loading.analysis) {
      return new Promise<AnalysisServerCapability>((resolve) => {
        wait(
          () => {
            return this.loading.analysis === false && !!this._analysis
          },
          () => {
            if (this._analysis) {
              resolve(this._analysis)
            }
          }
        )
      })
    }
    if (this._analysis) {
      return Promise.resolve(this._analysis)
    }
    this.loading.analysis = true
    return new Promise<AnalysisServerCapability>((resolve) => {
      this.service.analysis.capability().then((x) => {
        this._analysis = x
        this.loading.analysis = false
        resolve(this._analysis)
      })
    })
  }
}
