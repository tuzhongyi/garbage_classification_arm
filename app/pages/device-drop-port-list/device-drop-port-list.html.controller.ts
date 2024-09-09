import '../../../assets/styles/table-sticky.less'
import { EventEmitter } from '../../common/event-emitter'
import { DeviceDropPortListHtmlTable } from './device-drop-port-list.html.table'
import './device-drop-port-list.less'

interface DeviceDropPortListHtmlEvent {
  create(): void
}

export class DeviceDropPortListHtmlController {
  event = new EventEmitter<DeviceDropPortListHtmlEvent>()
  table = new DeviceDropPortListHtmlTable()

  private element = {
    create: document.getElementById('btn_create') as HTMLButtonElement,
  }

  constructor() {
    this.regist()
  }

  private regist() {
    this.element.create.addEventListener('click', () => {
      this.event.emit('create')
    })
  }
}
