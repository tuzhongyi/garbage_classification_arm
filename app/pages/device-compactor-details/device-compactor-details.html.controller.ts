import { EventEmitter } from '../../common/event-emitter'
import { HtmlTool } from '../../common/tools/html-tool/html.tool'
import { Compactor } from '../../data-core/models/compactor/compactor.model'
import { MeshNode } from '../../data-core/models/robot/mesh-node.model'
import { Manager } from '../../data-core/requests/managers/manager'
import '../window/window.less'
import { DeviceCompactorDetailsEvent } from './device-compactor-details.event'
import './device-compactor-details.less'
export class DeviceCompactorDetailsHtmlController {
  event: EventEmitter<DeviceCompactorDetailsEvent> = new EventEmitter()
  constructor() {
    this.init()
    this.regist()
  }

  private element = {
    Name: document.getElementById('Name') as HTMLInputElement,
    HostAddress: document.getElementById('HostAddress') as HTMLSelectElement,
    PortNo: document.getElementById('PortNo') as HTMLInputElement,
    ProtocolType: document.getElementById('ProtocolType') as HTMLSelectElement,
    Model: document.getElementById('Model') as HTMLInputElement,
    DeviceType: document.getElementById('DeviceType') as HTMLSelectElement,
    CustomizedInfo: document.getElementById(
      'CustomizedInfo'
    ) as HTMLInputElement,
    MeshNodeId: document.getElementById('MeshNodeId') as HTMLInputElement,
    ok: document.getElementById('ok') as HTMLButtonElement,
    cancel: document.getElementById('cancel') as HTMLButtonElement,
  }

  private inited = false

  private init() {
    HtmlTool.input.number.mousewheelchangevalue(this.element.PortNo)
    Manager.capability.compactor.then((x) => {
      if (x.DeviceTypes) {
        this.element.DeviceType.innerHTML = ''
        x.DeviceTypes.forEach((y) => {
          HtmlTool.select.append(y, this.element.DeviceType)
        })
      }
      if (x.ProtocolTypes) {
        this.element.ProtocolType.innerHTML = ''
        x.ProtocolTypes.forEach((y) => {
          HtmlTool.select.append(y, this.element.ProtocolType)
        })
      }
      this.inited = true
    })
  }

  private regist() {
    this.element.ok.addEventListener('click', () => {
      this.event.emit('ok')
    })
    this.element.cancel.addEventListener('click', () => {
      this.event.emit('cancel')
    })
  }

  load(node: MeshNode) {
    this.element.MeshNodeId.value = node.Id
  }

  get() {
    let data = new Compactor()
    data.Name = HtmlTool.get(this.element.Name.value)
    data.HostAddress = HtmlTool.get(this.element.HostAddress.value)
    data.PortNo = HtmlTool.get(this.element.PortNo.value, 'number')
    data.ProtocolType = HtmlTool.get(this.element.ProtocolType.value)
    data.Model = HtmlTool.get(this.element.Model.value)
    data.DeviceType = HtmlTool.get(this.element.DeviceType.value)
    data.CustomizedInfo = HtmlTool.get(this.element.CustomizedInfo.value)
    data.MeshNodeId = HtmlTool.get(this.element.MeshNodeId.value, 'number')
    return data
  }
}
