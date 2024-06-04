import { EventEmitter } from '../../common/event-emitter'
import { Language } from '../../common/language'
import { HtmlTool } from '../../common/tools/html-tool/html.tool'
import { SortationDevice } from '../../data-core/models/sortation/sortation-device.model'
import { DeviceSortationInfoEvent } from './device-sortation-info.event'
import './device-sortation-info.less'

export class DeviceSortationInfoHtmlController {
  event: EventEmitter<DeviceSortationInfoEvent> = new EventEmitter()

  constructor() {
    this.regist()
  }

  private parser = new DOMParser()

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

    Status: document.getElementById('Status') as HTMLInputElement,
    DropPortStatus: document.getElementById(
      'DropPortStatus'
    ) as HTMLInputElement,
    ConsoleOpenStatus: document.getElementById(
      'ConsoleOpenStatus'
    ) as HTMLInputElement,
    AirPressure: document.getElementById('AirPressure') as HTMLInputElement,

    test: document.getElementById('test') as HTMLButtonElement,
    save: document.getElementById('save') as HTMLButtonElement,
  }

  regist() {
    this.element.save.addEventListener('click', () => {
      this.event.emit('save')
    })
    this.element.test.addEventListener('click', () => {
      this.event.emit('test')
    })
  }

  load(data: SortationDevice) {
    this.element.Name.value = HtmlTool.set(data.Name)
    this.element.HostAddress.value = HtmlTool.set(data.HostAddress)
    this.element.PortNo.value = HtmlTool.set(data.PortNo)
    this.element.ProtocolType.value = HtmlTool.set(data.ProtocolType)
    this.element.Model.value = HtmlTool.set(data.Model)
    this.element.SerialNumber.value = HtmlTool.set(data.SerialNumber)
    this.element.DeviceType.value = HtmlTool.set(data.DeviceType)
    this.element.FirmwareVersion.value = HtmlTool.set(data.FirmwareVersion)
    this.element.UserName.value = HtmlTool.set(data.UserName)
    this.element.Password.value = HtmlTool.set(data.Password)
    this.element.CustomizedInfo.value = HtmlTool.set(data.CustomizedInfo)

    this.element.Status.value = HtmlTool.set(Language.OnlineStatus(data.Status))
    this.element.DropPortStatus.value = HtmlTool.set(
      Language.OpenOrClose(data.DropPortStatus)
    )
    this.element.ConsoleOpenStatus.value = HtmlTool.set(
      Language.OpenOrClose(data.ConsoleOpenStatus)
    )
    this.element.AirPressure.value = HtmlTool.set(data.AirPressure)
  }

  get(data: SortationDevice) {
    data.CustomizedInfo = HtmlTool.get(this.element.CustomizedInfo.value)
    data.ProtocolType = HtmlTool.get(this.element.ProtocolType.value)
    data.HostAddress = HtmlTool.get(this.element.HostAddress.value)
    data.PortNo = HtmlTool.get(this.element.PortNo.value, 'number')
    data.Name = HtmlTool.get(this.element.Name.value)
    data.UserName = HtmlTool.get(this.element.UserName.value)
    data.Password = HtmlTool.get(this.element.Password.value)
    return data
  }

  equals(a: SortationDevice, b: SortationDevice) {
    return (
      a.Name == b.Name &&
      a.HostAddress == b.HostAddress &&
      a.PortNo == b.PortNo &&
      a.ProtocolType == b.ProtocolType &&
      a.UserName == b.UserName &&
      a.Password == b.Password
    )
  }
}
