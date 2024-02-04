import { instanceToPlain } from 'class-transformer'
import { EventType } from '../../../enums/event-type.enum'
import { CameraAIEventRule } from '../../../models/arm/analysis/rules/camera-ai-event-rule.model'
import { CameraAIEvent } from '../../../models/arm/camera-ai-event.model'
import { CameraAIModel } from '../../../models/arm/camera-ai-model.model'
import { CameraAITask } from '../../../models/arm/camera-ai-task.model'
import { GarbageServer } from '../../../models/arm/garbage-server.model'
import { ISUPDomain } from '../../../models/arm/isup-domain.model'
import { ISUPServer } from '../../../models/arm/isup-server.model'
import { DepolymentCapability } from '../../../models/capabilities/arm/depolyment-capability.model'
import { HowellResponse } from '../../../models/response'
import { ArmDeploymentUrl } from '../../../urls/arm/deployment/deployment.url'
import { HowellAuthHttp } from '../../auth/howell-auth-http'
import { HowellResponseProcess } from '../../service-process'

export class ArmDeploymentRequestService {
  constructor(private http: HowellAuthHttp) {}

  capability() {
    let url = ArmDeploymentUrl.capability()
    return this.http
      .get<HowellResponse<DepolymentCapability>>(url)
      .then((x) => {
        return HowellResponseProcess.item(x, DepolymentCapability)
      })
  }

  private _server?: DeploymentServersRequestService
  public get server(): DeploymentServersRequestService {
    if (!this._server) {
      this._server = new DeploymentServersRequestService(this.http)
    }
    return this._server
  }
  private _event?: DeploymentEventsRequestService
  public get event(): DeploymentEventsRequestService {
    if (!this._event) {
      this._event = new DeploymentEventsRequestService(this.http)
    }
    return this._event
  }
  private _ai?: { task: DeploymentAITasksRequestService }
  public get ai(): { task: DeploymentAITasksRequestService } {
    if (!this._ai) {
      this._ai = { task: new DeploymentAITasksRequestService(this.http) }
    }
    return this._ai
  }
}

export class DeploymentServersRequestService {
  constructor(private http: HowellAuthHttp) {}

  private _garbage?: DeploymentGarbageServersRequestService
  public get garbage(): DeploymentGarbageServersRequestService {
    if (!this._garbage) {
      this._garbage = new DeploymentGarbageServersRequestService(this.http)
    }
    return this._garbage
  }
  private _isup?: DeploymentISUPServersRequestService
  public get isup(): DeploymentISUPServersRequestService {
    if (!this._isup) {
      this._isup = new DeploymentISUPServersRequestService(this.http)
    }
    return this._isup
  }
}

export class DeploymentGarbageServersRequestService {
  constructor(private http: HowellAuthHttp) {}

  async array() {
    let url = ArmDeploymentUrl.servers.garbage.basic()
    return this.http.get<HowellResponse<GarbageServer[]>>(url).then((x) => {
      return HowellResponseProcess.array(x, GarbageServer)
    })
  }

  ai = {
    models: (id: string) => {
      let url = ArmDeploymentUrl.servers.garbage.ai.models(id)
      return this.http.get<HowellResponse<CameraAIModel[]>>(url).then((x) => {
        return HowellResponseProcess.array(x, CameraAIModel)
      })
    },
  }
}
export class DeploymentISUPServersRequestService {
  constructor(private http: HowellAuthHttp) {}
  async array() {
    let url = ArmDeploymentUrl.servers.isup.basic()
    return this.http.get<HowellResponse<ISUPServer[]>>(url).then((x) => {
      return HowellResponseProcess.array(x, ISUPServer)
    })
  }

  async domains(id: string) {
    let url = ArmDeploymentUrl.servers.isup.domains(id)
    return this.http.post<any, HowellResponse<ISUPDomain[]>>(url).then((x) => {
      return HowellResponseProcess.array(x, ISUPDomain)
    })
  }
}
export class DeploymentEventsRequestService {
  constructor(private http: HowellAuthHttp) {}
  array() {
    let url = ArmDeploymentUrl.event().basic()
    return this.http.get<HowellResponse<CameraAIEvent[]>>(url).then((x) => {
      return HowellResponseProcess.array(x, CameraAIEvent)
    })
  }
  async create(data: CameraAIEvent) {
    let plain = instanceToPlain(data)
    let url = ArmDeploymentUrl.event().basic()
    return this.http
      .post<any, HowellResponse<CameraAIEvent>>(url, plain)
      .then((x) => {
        return HowellResponseProcess.item(x, CameraAIEvent)
      })
  }

  get(type: EventType) {
    let url = ArmDeploymentUrl.event().item(type)
    return this.http.get<HowellResponse<CameraAIEvent>>(url).then((x) => {
      return HowellResponseProcess.item(x, CameraAIEvent)
    })
  }
  async update(data: CameraAIEvent) {
    let plain = instanceToPlain(data)
    let url = ArmDeploymentUrl.event().item(data.Type)
    return this.http
      .put<any, HowellResponse<CameraAIEvent>>(url, plain)
      .then((x) => {
        return HowellResponseProcess.item(x, CameraAIEvent)
      })
  }
  delete(type: EventType) {
    let url = ArmDeploymentUrl.event().item(type)
    return this.http.delete<HowellResponse<CameraAIEvent>>(url).then((x) => {
      return HowellResponseProcess.item(x, CameraAIEvent)
    })
  }

  private _rule?: DeploymentEventRuleRequestService
  public get rule(): DeploymentEventRuleRequestService {
    if (!this._rule) {
      this._rule = new DeploymentEventRuleRequestService(this.http)
    }
    return this._rule
  }
}

class DeploymentEventRuleRequestService {
  constructor(private http: HowellAuthHttp) {}
  array(type: EventType) {
    let url = ArmDeploymentUrl.event().rule(type).basic()
    return this.http.get<HowellResponse<CameraAIEventRule[]>>(url).then((x) => {
      return HowellResponseProcess.array(x, CameraAIEventRule)
    })
  }
  async create(data: CameraAIEventRule) {
    let plain = instanceToPlain(data)
    let url = ArmDeploymentUrl.event().rule(data.EventType).basic()
    return this.http
      .post<any, HowellResponse<CameraAIEventRule>>(url, plain)
      .then((x) => {
        return HowellResponseProcess.item(x, CameraAIEventRule)
      })
  }

  get(type: EventType, id: string) {
    let url = ArmDeploymentUrl.event().rule(type).item(id)
    return this.http.get<HowellResponse<CameraAIEventRule>>(url).then((x) => {
      return HowellResponseProcess.item(x, CameraAIEventRule)
    })
  }
  async update(data: CameraAIEventRule) {
    let plain = instanceToPlain(data)
    let url = ArmDeploymentUrl.event().rule(data.EventType).item(data.RuleId)
    return this.http
      .put<any, HowellResponse<CameraAIEventRule>>(url, plain)
      .then((x) => {
        return HowellResponseProcess.item(x, CameraAIEventRule)
      })
  }
  delete(type: EventType, id: string) {
    let url = ArmDeploymentUrl.event().rule(type).item(id)
    return this.http
      .delete<HowellResponse<CameraAIEventRule>>(url)
      .then((x) => {
        return HowellResponseProcess.item(x, CameraAIEventRule)
      })
  }
}

class DeploymentAITasksRequestService {
  constructor(private http: HowellAuthHttp) {}
  array() {
    let url = ArmDeploymentUrl.ai.task()
    return this.http.get<HowellResponse<CameraAITask[]>>(url).then((x) => {
      return HowellResponseProcess.array(x, CameraAITask)
    })
  }
  async create(data: CameraAITask) {
    let plain = instanceToPlain(data)
    let url = ArmDeploymentUrl.ai.task()
    return this.http
      .post<any, HowellResponse<CameraAITask>>(url, plain)
      .then((x) => {
        return HowellResponseProcess.item(x, CameraAITask)
      })
  }

  get(id: string) {
    let url = ArmDeploymentUrl.ai.task(id)
    return this.http.get<HowellResponse<CameraAITask>>(url)
  }
  async update(data: CameraAITask) {
    let plain = instanceToPlain(data)
    let url = ArmDeploymentUrl.ai.task(data.Id)
    return this.http
      .put<any, HowellResponse<CameraAITask>>(url, plain)
      .then((x) => {
        return HowellResponseProcess.item(x, CameraAITask)
      })
  }
  delete(id: string) {
    let url = ArmDeploymentUrl.ai.task(id)
    return this.http.delete<HowellResponse<CameraAITask>>(url).then((x) => {
      return HowellResponseProcess.item(x, CameraAITask)
    })
  }
}
