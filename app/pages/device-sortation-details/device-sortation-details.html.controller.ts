import { EventEmitter } from '../../common/event-emitter'
import { HtmlTool } from '../../common/tools/html-tool/html.tool'
import { SortationDevice } from '../../data-core/models/sortation/sortation-device.model'
import '../window/window.less'
import { DeviceSortationDetailsEvent } from './device-sortation-details.event'
import './device-sortation-details.less'
export class DeviceSortationDetailsHtmlController {
  event: EventEmitter<DeviceSortationDetailsEvent> = new EventEmitter()
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
    SerialNumber: document.getElementById('SerialNumber') as HTMLInputElement,
    DeviceType: document.getElementById('DeviceType') as HTMLInputElement,
    FirmwareVersion: document.getElementById(
      'FirmwareVersion'
    ) as HTMLInputElement,
    UserName: document.getElementById('UserName') as HTMLInputElement,
    Password: document.getElementById('Password') as HTMLInputElement,
    CustomizedInfo: document.getElementById(
      'CustomizedInfo'
    ) as HTMLInputElement,
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

  get(data: SortationDevice) {
    data.Name = HtmlTool.get(this.element.Name.value)
    data.HostAddress = HtmlTool.get(this.element.HostAddress.value)
    data.PortNo = HtmlTool.get(this.element.PortNo.value, 'number')
    data.ProtocolType = HtmlTool.get(this.element.ProtocolType.value)
    data.Model = HtmlTool.get(this.element.Model.value)
    data.SerialNumber = HtmlTool.get(this.element.SerialNumber.value)
    data.DeviceType = HtmlTool.get(this.element.DeviceType.value)
    data.UserName = HtmlTool.get(this.element.UserName.value)
    data.Password = HtmlTool.get(this.element.Password.value)
    data.CustomizedInfo = HtmlTool.get(this.element.CustomizedInfo.value)

    return data
  }
}
