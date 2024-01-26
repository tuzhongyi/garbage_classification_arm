import '../../../assets/styles/table-sticky.less'
import { EventEmitter } from '../../common/event-emitter'
import '../window/window.less'
import { DeviceRobotDiscoverEvent } from './device-robot-discover.event'
import { DeviceRobotDiscoverHtmlTable } from './device-robot-discover.html.table'
import './device-robot-discover.less'
export class DeviceRobotDiscoverHtmlController {
  element = {
    table: new DeviceRobotDiscoverHtmlTable(),
    search: {
      text: document.getElementById('search_text') as HTMLInputElement,
      button: document.getElementById('search_button') as HTMLButtonElement,
    },
    button: {
      refresh: document.getElementById('btn_refresh') as HTMLButtonElement,
      ok: document.getElementById('btn_ok') as HTMLButtonElement,
      cancel: document.getElementById('btn_cancel') as HTMLButtonElement,
    },
  }

  event: EventEmitter<DeviceRobotDiscoverEvent> = new EventEmitter()

  constructor() {
    this.init()
    this.regist()
  }

  init() {}

  regist() {
    this.element.button.refresh.addEventListener('click', () => {
      this.event.emit('refresh')
    })
    this.element.button.ok.addEventListener('click', () => {
      this.event.emit('ok')
    })
    this.element.button.cancel.addEventListener('click', () => {
      this.event.emit('cancel')
    })
    this.element.search.button.addEventListener('click', () => {
      this.event.emit('search', this.element.search.text.value)
    })
  }
}
