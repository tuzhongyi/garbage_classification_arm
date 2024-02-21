import { EventEmitter } from '../../common/event-emitter'
import { HtmlTool } from '../../common/tools/html-tool/html.tool'
import { ISUPDomain } from '../../data-core/models/arm/isup-domain.model'
import { IIdNameModel } from '../../data-core/models/model.interface'
import { NetworkServerDeploymentEvent } from './network-server-deployment.event'

import './network-server-deployment.less'
import { NetworkServerDeploymentModel } from './network-server-deployment.model'

export class NetworkServerDeploymentHtmlController {
  constructor() {
    this.regist()
  }

  element = {
    deployment: {
      HostAddress: document.getElementById('HostAddress') as HTMLInputElement,
      PortNo: document.getElementById('PortNo') as HTMLInputElement,
      UserName: document.getElementById('UserName') as HTMLInputElement,
      Password: document.getElementById('Password') as HTMLInputElement,
    },
    GarbageServer: document.getElementById(
      'GarbageServer'
    ) as HTMLSelectElement,
    ISUPServer: document.getElementById('ISUPServer') as HTMLSelectElement,
    ISUPDomain: document.getElementById('ISUPDomain') as HTMLSelectElement,
    save: document.getElementById('save') as HTMLButtonElement,
    test: document.getElementById('test') as HTMLButtonElement,
  }
  event: EventEmitter<NetworkServerDeploymentEvent> = new EventEmitter()

  private regist() {
    this.element.save.addEventListener('click', () => {
      this.event.emit('save')
    })
    this.element.test.addEventListener('click', () => {
      this.event.emit('test')
    })
    this.element.ISUPServer.addEventListener('change', () => {
      this.event.emit('isupserverchange', this.element.ISUPServer.value)
    })
    HtmlTool.input.number.mousewheelchangevalue(this.element.deployment.PortNo)
  }

  append(select: HTMLSelectElement, model: IIdNameModel) {
    let option = document.createElement('option')
    option.value = model.Id
    option.innerHTML = model.Name
    select.appendChild(option)
  }
  load(data: NetworkServerDeploymentModel): void
  load(data: ISUPDomain[]): void
  load(data: NetworkServerDeploymentModel | ISUPDomain[]) {
    if (Array.isArray(data)) {
      this.loadISUPDomain(data)
    } else {
      this.loadModel(data)
    }
  }

  private loadISUPDomain(datas: ISUPDomain[]) {
    this.element.ISUPDomain.innerHTML = ''
    for (let i = 0; i < datas.length; i++) {
      this.append(this.element.ISUPDomain, datas[i] as IIdNameModel)
    }
  }
  private loadModel(data: NetworkServerDeploymentModel) {
    if (data.deployment) {
      this.element.deployment.HostAddress.value = data.deployment.HostAddress
      this.element.deployment.PortNo.value = data.deployment.PortNo.toString()
      this.element.deployment.UserName.value = data.deployment.UserName ?? ''
      this.element.deployment.Password.value = data.deployment.Password ?? ''
      this.element.GarbageServer.value = data.deployment.GarbageServerId ?? ''
      this.element.ISUPServer.value = data.deployment.ISUPServerId ?? ''
      this.element.ISUPDomain.value = data.deployment.ISUPDomainId ?? ''
    }
    for (let i = 0; i < data.server.garbage.length; i++) {
      this.append(this.element.GarbageServer, data.server.garbage[i])
    }
    for (let i = 0; i < data.server.isup.length; i++) {
      this.append(this.element.ISUPServer, data.server.isup[i])
    }
    this.event.emit('isupserverchange', this.element.ISUPServer.value)
  }
}
