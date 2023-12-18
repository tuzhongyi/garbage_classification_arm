import { instanceToPlain, plainToInstance } from 'class-transformer'
import { EventType } from '../../enums/event-type.enum'
import { CameraAIEvent } from '../../models/arm/camera-ai-event.model'
import { CameraAIModel } from '../../models/arm/camera-ai-model.model'
import { CameraAITask } from '../../models/arm/camera-ai-task.model'
import { GarbageServer } from '../../models/arm/garbage-server.model'
import { ISUPDomain } from '../../models/arm/isup-domain.model'
import { ISUPServer } from '../../models/arm/isup-server.model'
import { HowellResponse } from '../../models/response'
import { ArmDeploymentUrl } from '../../urls/arm/deployment/deployment.url'
import { HowellAuthHttp } from '../howell-auth-http'

export class DeploymentRequestService {
  constructor(private http: HowellAuthHttp) {}
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

  array() {
    let url = ArmDeploymentUrl.servers.garbage.basic
    return this.http.get<HowellResponse<GarbageServer[]>>(url)
  }

  ai = {
    models: (id: string) => {
      let url = ArmDeploymentUrl.servers.garbage.ai.models(id)
      return this.http.get<HowellResponse<CameraAIModel[]>>(url)
    },
  }
}
export class DeploymentISUPServersRequestService {
  constructor(private http: HowellAuthHttp) {}
  array() {
    let url = ArmDeploymentUrl.servers.isup.basic
    return this.http.get<HowellResponse<ISUPServer[]>>(url)
  }

  async domains(id: string) {
    let url = ArmDeploymentUrl.servers.isup.domains(id)
    let response = await this.http.post<any, HowellResponse<ISUPDomain[]>>(url)
    return plainToInstance(ISUPDomain, response.Data)
  }
}
export class DeploymentEventsRequestService {
  constructor(private http: HowellAuthHttp) {}
  array() {
    let url = ArmDeploymentUrl.events()
    return this.http.get<HowellResponse<CameraAIEvent[]>>(url)
  }
  async create(data: CameraAIEvent) {
    let plain = instanceToPlain(data)
    let url = ArmDeploymentUrl.events()
    let response = await this.http.post<any, HowellResponse<CameraAIEvent>>(
      url,
      plain
    )
    return plainToInstance(CameraAIEvent, response.Data)
  }

  get(type: EventType) {
    let url = ArmDeploymentUrl.events(type.toString())
    return this.http.get<HowellResponse<CameraAIEvent>>(url)
  }
  async set(data: CameraAIEvent) {
    let plain = instanceToPlain(data)
    let url = ArmDeploymentUrl.events(data.Type.toString())
    let response = await this.http.put<any, HowellResponse<CameraAIEvent>>(
      url,
      plain
    )
    return plainToInstance(CameraAIEvent, response.Data)
  }
  delete(type: EventType) {
    let url = ArmDeploymentUrl.events(type.toString())
    return this.http.delete<HowellResponse<CameraAIEvent>>(url)
  }
}
export class DeploymentAITasksRequestService {
  constructor(private http: HowellAuthHttp) {}
  array() {
    let url = ArmDeploymentUrl.ai.task()
    return this.http.get<HowellResponse<CameraAITask[]>>(url)
  }
  async create(data: CameraAITask) {
    let plain = instanceToPlain(data)
    let url = ArmDeploymentUrl.ai.task()
    let response = await this.http.post<any, HowellResponse<CameraAITask>>(
      url,
      plain
    )
    return plainToInstance(CameraAITask, response.Data)
  }

  get(id: string) {
    let url = ArmDeploymentUrl.ai.task(id)
    return this.http.get<HowellResponse<CameraAITask>>(url)
  }
  async set(data: CameraAITask) {
    let plain = instanceToPlain(data)
    let url = ArmDeploymentUrl.ai.task(data.Id)
    let response = await this.http.put<any, HowellResponse<CameraAITask>>(
      url,
      plain
    )
    return plainToInstance(CameraAITask, response.Data)
  }
  delete(id: string) {
    let url = ArmDeploymentUrl.ai.task(id)
    return this.http.delete<HowellResponse<CameraAITask>>(url)
  }
}
