import { EventEmitter } from '../../common/event-emitter'
import { HtmlTool } from '../../common/tools/html-tool/html.tool'
import { Robot } from '../../data-core/models/robot/robot.model'
import '../window/window.less'
import { DeviceRobotDetailsEvent } from './device-robot-details.event'
import './device-robot-details.less'

export class DeviceRobotDetailsHtmlController {
  event: EventEmitter<DeviceRobotDetailsEvent> = new EventEmitter()
  constructor() {
    this.init()
    this.regist()
  }

  private element = {
    Name: document.getElementById('Name') as HTMLInputElement,
    Model: document.getElementById('Model') as HTMLInputElement,
    SerialNumber: document.getElementById('SerialNumber') as HTMLInputElement,
    DeviceType: document.getElementById('DeviceType') as HTMLInputElement,
    CustomizedInfo: document.getElementById(
      'CustomizedInfo'
    ) as HTMLInputElement,
    HostAddress: document.getElementById('HostAddress') as HTMLSelectElement,
    PortNo: document.getElementById('PortNo') as HTMLInputElement,
    ProtocolType: document.getElementById('ProtocolType') as HTMLSelectElement,
    ok: document.getElementById('ok') as HTMLButtonElement,
    cancel: document.getElementById('cancel') as HTMLButtonElement,
  }

  private init() {
    HtmlTool.input.number.mousewheelchangevalue(this.element.PortNo)
  }

  private regist() {
    this.element.ok.addEventListener('click', () => {
      this.event.emit('ok')
    })
    this.element.cancel.addEventListener('click', () => {
      this.event.emit('cancel')
    })
  }

  get(data: Robot) {
    data.CustomizedInfo = HtmlTool.get(this.element.CustomizedInfo.value)
    data.DeviceType = this.element.DeviceType.value
    data.ProtocolType = this.element.ProtocolType.value
    data.HostAddress = this.element.HostAddress.value
    data.SerialNumber = this.element.SerialNumber.value
    data.PortNo = parseInt(this.element.PortNo.value)
    data.Name = HtmlTool.get(this.element.Name.value)
    return data
  }
}
