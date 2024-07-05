import { EventEmitter } from '../../common/event-emitter'
import { HtmlTool } from '../../common/tools/html-tool/html.tool'
import { FrpInfo } from '../../data-core/models/frp-info/frp-info.model'
import '../window/window.less'
import { NetworkFrpDetailsEvent } from './network-frp-details.event'

import './network-frp-details.less'
export class NetworkFrpDetailsHtmlController {
  event: EventEmitter<NetworkFrpDetailsEvent> = new EventEmitter()
  constructor() {
    this.init()
    this.regist()
  }

  private element = {
    Name: document.getElementById('Name') as HTMLInputElement,
    Localhost: document.getElementById('Localhost') as HTMLInputElement,
    LocalPort: document.getElementById('LocalPort') as HTMLInputElement,
    RemotePort: document.getElementById('RemotePort') as HTMLInputElement,
    Protocol: document.getElementById('Protocol') as HTMLSelectElement,
    ok: document.getElementById('ok') as HTMLButtonElement,
    cancel: document.getElementById('cancel') as HTMLButtonElement,
  }

  private init() {
    HtmlTool.input.number.mousewheelchangevalue(this.element.LocalPort)
    HtmlTool.input.number.mousewheelchangevalue(this.element.RemotePort)
  }

  private regist() {
    this.element.ok.addEventListener('click', () => {
      this.event.emit('ok')
    })
    this.element.cancel.addEventListener('click', () => {
      this.event.emit('cancel')
    })
  }

  get(data: FrpInfo) {
    data.Name = HtmlTool.get(this.element.Name.value)
    data.Localhost = HtmlTool.get(this.element.Localhost.value)
    data.LocalPort = HtmlTool.get(this.element.LocalPort.value, 'number')
    data.RemotePort = HtmlTool.get(this.element.RemotePort.value, 'number')
    data.Protocol = HtmlTool.get(this.element.Protocol.value, 'number')

    return data
  }
}
