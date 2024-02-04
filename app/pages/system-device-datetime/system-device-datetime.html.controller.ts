import { EventEmitter } from '../../common/event-emitter'
import { DateTimePicker } from '../../common/tools/date-time-picker/date-time-picker'
import { NTPTimeMode } from '../../data-core/enums/ntp-time-mode.enum'
import { SystemTime } from '../../data-core/models/arm/system-time.model'
import { DeviceCapability } from '../../data-core/models/capabilities/arm/device-capability.model'
import { SystemDeviceDatetimeHtmlEventArgs } from './system-device-datetime.event'

import './system-device-datetime.less'
import { TimeController } from './system-device-datetime.model'

export class SystemDeviceDatetimeHtmlController {
  constructor() {
    this.regist()
    this.init()
  }

  event: EventEmitter<SystemDeviceDatetimeHtmlEventArgs> = new EventEmitter()

  element = {
    SystemTime: document.getElementById('SystemTime') as HTMLInputElement,
    NTPTimeMode: document.getElementById('NTPTimeMode') as HTMLSelectElement,
    LocalDate: document.getElementById('LocalDate') as HTMLInputElement,
    LocalTime: document.getElementById('LocalTime') as HTMLInputElement,
    NTPServer: {
      HostAddress: document.getElementById('HostAddress') as HTMLInputElement,
      PortNo: document.getElementById('PortNo') as HTMLInputElement,
      SynchronizeInterval: document.getElementById(
        'SynchronizeInterval'
      ) as HTMLInputElement,
    },
    IsSynchronize: document.getElementById('IsSynchronize') as HTMLInputElement,

    button: {
      save: document.getElementById('save') as HTMLButtonElement,
    },
  }
  systemtime = new TimeController(
    this.element.SystemTime,
    'yyyy年MM月dd日 HH:mm:ss'
  )
  localtime = new TimeController(this.element.LocalTime, 'HH:mm:ss')

  init() {
    this.initDateTimePicker()
    this.onmodechange(NTPTimeMode.NTP)
  }
  initDateTimePicker() {
    let picker = new DateTimePicker(this.element.LocalDate)
    picker.dateChange = (date: Date) => {
      console.log(date.format('yyyy-MM-dd HH:mm:ss'))
    }
    picker.format = 'yyyy-MM-dd'
    picker.init()
  }

  regist() {
    this.element.NTPTimeMode.addEventListener('change', (e: Event) => {
      let current = e.target as HTMLSelectElement
      let elements = document.querySelectorAll(`.form-item`)
      for (let i = 0; i < elements.length; i++) {
        ;(elements[i] as HTMLDivElement).style.display = ''
      }
      let date = new Date()
      this.element.LocalDate.value = date.format('yyyy-MM-dd')
      this.element.LocalTime.value = date.format('HH:mm:ss')
      this.onmodechange(current.value as NTPTimeMode)
    })
    this.element.button.save.addEventListener('click', (e: Event) => {
      this.event.emit('save')
    })
    this.element.IsSynchronize.addEventListener('change', (e: Event) => {
      let input = e.target as HTMLInputElement
      this.element.LocalDate.disabled = input.checked
      this.element.LocalTime.disabled = input.checked
      if (input.checked) {
        this.localtime.run(new Date())
      } else {
        this.localtime.stop()
      }

      this.event.emit('onsyncchange', input.checked)
    })
  }

  onmodechange(mode: NTPTimeMode) {
    let elements: NodeListOf<HTMLDivElement>
    switch (mode) {
      case NTPTimeMode.Manual:
        elements = document.querySelectorAll(`.${NTPTimeMode.NTP}`)
        for (let i = 0; i < elements.length; i++) {
          elements[i].style.display = 'none'
        }
        break
      case NTPTimeMode.NTP:
        elements = document.querySelectorAll(`.${NTPTimeMode.Manual}`)
        for (let i = 0; i < elements.length; i++) {
          elements[i].style.display = 'none'
        }
        break

      default:
        break
    }
    this.event.emit('onmodechange', mode)
  }

  load(data: SystemTime, capability: DeviceCapability) {
    this.element.NTPTimeMode.value = data.TimeMode
    this.systemtime.stop()
    this.systemtime.run(data.LocalTime)
    if (data.NTPServer) {
      this.element.NTPServer.HostAddress.value = data.NTPServer.HostAddress
      this.element.NTPServer.PortNo.value = data.NTPServer.PortNo.toString()
      this.element.NTPServer.SynchronizeInterval.value =
        data.NTPServer.SynchronizeInterval.toString()
    }
  }
}
