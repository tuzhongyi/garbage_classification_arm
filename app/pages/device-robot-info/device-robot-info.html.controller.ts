import { EventEmitter } from '../../common/event-emitter'
import { Robot } from '../../data-core/models/robot/robot.model'
import { DeviceRobotInfoEvent } from './device-robot-info.event'

import './device-robot-info.less'

export class DeviceRobotInfoHtmlController {
  constructor() {
    this.regist()
  }

  event: EventEmitter<DeviceRobotInfoEvent> = new EventEmitter()
  private parser = new DOMParser()

  element = {
    Name: document.getElementById('Name') as HTMLInputElement,
    Model: document.getElementById('Model') as HTMLInputElement,
    SerialNumber: document.getElementById('SerialNumber') as HTMLInputElement,
    DeviceType: document.getElementById('DeviceType') as HTMLInputElement,
    FirmwareVersion: document.getElementById(
      'FirmwareVersion'
    ) as HTMLInputElement,
    FirmwareBuildDate: document.getElementById(
      'FirmwareBuildDate'
    ) as HTMLInputElement,
    Company: document.getElementById('Company') as HTMLInputElement,
    OS: document.getElementById('OS') as HTMLInputElement,
    Hardware: document.getElementById('Hardware') as HTMLInputElement,
    HardwareVersion: document.getElementById(
      'HardwareVersion'
    ) as HTMLInputElement,
    Vendor: document.getElementById('Vendor') as HTMLInputElement,
    CustomizedInfo: document.getElementById(
      'CustomizedInfo'
    ) as HTMLInputElement,
    HostAddress: document.getElementById('HostAddress') as HTMLSelectElement,
    PortNo: document.getElementById('PortNo') as HTMLInputElement,
    ProtocolType: document.getElementById('ProtocolType') as HTMLSelectElement,
    save: document.getElementById('save') as HTMLButtonElement,
  }

  regist() {
    this.element.save.addEventListener('click', () => {
      this.event.emit('save')
    })
  }

  load(data: Robot) {
    this.element.Company.value = data.Company ?? ''
    this.element.Name.value = data.Name ?? ''
    this.element.Model.value = data.Model ?? ''
    this.element.SerialNumber.value = data.SerialNumber
    this.element.DeviceType.value = data.DeviceType
    this.element.FirmwareVersion.value = data.FirmwareVersion ?? ''
    this.element.FirmwareBuildDate.value =
      data.FirmwareBuildDate?.format('yyyy-MM-dd') ?? ''

    this.element.OS.value = data.OS ?? ''
    this.element.Hardware.value = data.Hardware ?? ''
    this.element.HardwareVersion.value = data.HardwareVersion ?? ''
    this.element.Vendor.value = data.Vendor ?? ''
    this.element.CustomizedInfo.value = data.CustomizedInfo ?? ''
    this.element.HostAddress.value = data.HostAddress
    this.element.PortNo.value = data.PortNo.toString()
    this.element.ProtocolType.value = data.ProtocolType
  }
}
