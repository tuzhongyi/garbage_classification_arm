import { EventEmitter } from '../../common/event-emitter'
import { HtmlTool } from '../../common/tools/html-tool/html.tool'
import { Deployment } from '../../data-core/models/arm/deployment.model'
import { ISUPDomain } from '../../data-core/models/arm/isup-domain.model'
import { IIdNameModel } from '../../data-core/models/model.interface'
import { NetworkServerDeploymentEvent } from './network-server-deployment.event'

import './network-server-deployment.less'
import { NetworkServerDeploymentSource } from './network-server-deployment.model'

export class NetworkServerDeploymentHtmlController {
  event: EventEmitter<NetworkServerDeploymentEvent> = new EventEmitter()

  constructor() {
    this.regist()
  }

  private element = {
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

  private append(select: HTMLSelectElement, model: IIdNameModel) {
    let option = document.createElement('option')
    option.value = model.Id
    option.innerHTML = model.Name
    select.appendChild(option)
  }

  initISUPDomain(datas: ISUPDomain[]) {
    this.element.ISUPDomain.innerHTML = ''
    for (let i = 0; i < datas.length; i++) {
      this.append(this.element.ISUPDomain, datas[i] as IIdNameModel)
    }
  }

  init(data: NetworkServerDeploymentSource) {
    let garbage = new Promise<void>((resolve) => {
      data.garbage.then((x) => {
        for (let i = 0; i < x.length; i++) {
          this.append(this.element.GarbageServer, x[i])
        }
        resolve()
      })
    })

    let isup = new Promise<void>((resolve) => {
      data.isup.then((x) => {
        for (let i = 0; i < x.length; i++) {
          this.append(this.element.ISUPServer, x[i])
        }
        resolve()
      })
    })
    Promise.all([garbage, isup]).then((x) => {
      this.event.emit('inited')
    })
  }

  load(data: Deployment) {
    this.element.deployment.HostAddress.value = HtmlTool.set(data.HostAddress)
    this.element.deployment.PortNo.value = HtmlTool.set(data.PortNo)
    this.element.deployment.UserName.value = HtmlTool.set(data.UserName)
    this.element.deployment.Password.value = HtmlTool.set(data.Password)
    this.element.GarbageServer.value = HtmlTool.set(data.GarbageServerId)
    this.element.ISUPServer.value = HtmlTool.set(data.ISUPServerId)
    this.event.emit('isupserverchange', this.element.ISUPServer.value)
  }

  loadISUPDomain(value?: string) {
    this.element.ISUPDomain.value = HtmlTool.set(value)
  }

  get(data: Deployment) {
    data.HostAddress = this.element.deployment.HostAddress.value
    data.PortNo = parseInt(this.element.deployment.PortNo.value)
    data.UserName = this.element.deployment.UserName.value
    data.Password = this.element.deployment.Password.value

    data.GarbageServerId = this.element.GarbageServer.value
    data.ISUPServerId = this.element.ISUPServer.value
    data.ISUPDomainId = this.element.ISUPDomain.value
    return data
  }
}
