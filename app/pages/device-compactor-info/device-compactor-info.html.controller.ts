import { EventEmitter } from '../../common/event-emitter'
import { HtmlTool } from '../../common/tools/html-tool/html.tool'
import { Compactor } from '../../data-core/models/compactor/compactor.model'
import { Manager } from '../../data-core/requests/managers/manager'
import { DeviceCompactorInfoNodeController } from './controller/device-compactor-info-robot.controller'
import { DeviceCompactorInfoEvent } from './device-compactor-info.event'
import './less/device-compactor-info.less'

export class DeviceCompactorInfoHtmlController {
  event: EventEmitter<DeviceCompactorInfoEvent> = new EventEmitter()
  node = new DeviceCompactorInfoNodeController()
  constructor() {
    this.init()
    this.regist()
  }

  private parser = new DOMParser()

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
    button: {
      node: document.getElementById('node_show') as HTMLButtonElement,
      save: document.getElementById('save') as HTMLButtonElement,
      // node: document.getElementById('node_get') as HTMLButtonElement,
    },
  }

  private init() {
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
    })
  }

  private regist() {
    this.element.button.save.addEventListener('click', (e) => {
      e.stopImmediatePropagation()
      this.event.emit('save')
    })
    this.element.button.node.addEventListener('click', (e) => {
      e.stopImmediatePropagation()
      this.node.show = !this.node.show
    })
    this.node.event.on('ok', (value) => {
      this.element.MeshNodeId.value = value
    })
    document.addEventListener('click', (e) => {
      this.node.show = false
    })
  }

  load(data: Compactor) {
    this.element.Name.value = HtmlTool.set(data.Name)
    this.element.HostAddress.value = HtmlTool.set(data.HostAddress)
    this.element.PortNo.value = HtmlTool.set(data.PortNo)
    this.element.ProtocolType.value = HtmlTool.set(data.ProtocolType)
    this.element.Model.value = HtmlTool.set(data.Model)
    this.element.DeviceType.value = HtmlTool.set(data.DeviceType)
    this.element.CustomizedInfo.value = HtmlTool.set(data.CustomizedInfo)
    this.element.MeshNodeId.value = HtmlTool.set(data.MeshNodeId)
  }

  get(data: Compactor) {
    data.CustomizedInfo = HtmlTool.get(this.element.CustomizedInfo.value)
    data.ProtocolType = HtmlTool.get(this.element.ProtocolType.value)
    data.HostAddress = HtmlTool.get(this.element.HostAddress.value)
    data.PortNo = HtmlTool.get(this.element.PortNo.value, 'number')
    data.Name = HtmlTool.get(this.element.Name.value)
    data.MeshNodeId = HtmlTool.get(this.element.MeshNodeId.value, 'number')
    return data
  }

  equals(a: Compactor, b: Compactor) {
    return (
      a.Name == b.Name &&
      a.HostAddress == b.HostAddress &&
      a.PortNo == b.PortNo &&
      a.ProtocolType == b.ProtocolType &&
      a.Model == b.Model &&
      a.DeviceType == b.DeviceType &&
      a.CustomizedInfo == b.CustomizedInfo &&
      a.MeshNodeId == b.MeshNodeId
    )
  }
}
