import { DateTimePicker } from '../../common/tools/date-time-picker/date-time-picker'
import { DeviceInfo } from '../../data-core/models/arm/device-info.model'

import './system-device-info.less'

export class SystemDeviceInfoHtmlController {
  constructor() {
    this.init()
  }

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
    Wireless: document.getElementById('Wireless') as HTMLSelectElement,
    HddNumber: document.getElementById('HddNumber') as HTMLInputElement,
    IOInNumber: document.getElementById('IOInNumber') as HTMLInputElement,
    IOOutNumber: document.getElementById('IOOutNumber') as HTMLInputElement,
    MaxIPCNumber: document.getElementById('MaxIPCNumber') as HTMLInputElement,
  }

  init() {
    let picker = new DateTimePicker(this.element.FirmwareBuildDate)
    picker.dateChange = (date: Date) => {
      console.log(date.format('yyyy-MM-dd'))
    }
    picker.init()
  }

  load(data: DeviceInfo) {
    this.element.Company.value = data.Company
    this.element.Name.value = data.Name
    this.element.Model.value = data.Model
    this.element.SerialNumber.value = data.SerialNumber
    this.element.DeviceType.value = data.DeviceType
    this.element.FirmwareVersion.value = data.FirmwareVersion
    this.element.FirmwareBuildDate.value =
      data.FirmwareBuildDate.format('yyyy-MM-dd')
    this.element.Company.value = data.Company
    this.element.OS.value = data.OS
    this.element.Hardware.value = data.Hardware
    this.element.HardwareVersion.value = data.HardwareVersion
    this.element.Vendor.value = data.Vendor
    this.element.CustomizedInfo.value = data.CustomizedInfo ?? ''
    this.element.Wireless.value = JSON.stringify(data.Wireless)
    this.element.HddNumber.value = data.HddNumber?.toString() ?? '0'
    this.element.IOInNumber.value = data.IOInNumber?.toString() ?? '0'
    this.element.IOOutNumber.value = data.IOOutNumber?.toString() ?? '0'
    this.element.MaxIPCNumber.value = data.MaxIPCNumber?.toString() ?? '0'
  }
}
