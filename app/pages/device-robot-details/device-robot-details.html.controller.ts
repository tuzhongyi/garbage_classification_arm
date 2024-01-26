import { EventEmitter } from '../../common/event-emitter'
import '../window/window.less'
import { DeviceRobotDetailsEvent } from './device-robot-details.event'
import './device-robot-details.less'

export class DeviceRobotDetailsHtmlController {
  constructor() {
    this.regist()
  }

  event: EventEmitter<DeviceRobotDetailsEvent> = new EventEmitter()
  private parser = new DOMParser()

  element = {
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

  regist() {
    this.element.ok.addEventListener('click', () => {
      this.event.emit('ok')
    })
    this.element.cancel.addEventListener('click', () => {
      this.event.emit('cancel')
    })
  }
}
