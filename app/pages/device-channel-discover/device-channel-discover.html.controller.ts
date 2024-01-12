import '../../../assets/styles/table-sticky.less'
import { EventEmitter } from '../../common/event-emitter'
import '../window/window.less'
import { DeviceChannelDiscoverEvent } from './device-channel-discover.event'
import { DeviceChannelDiscoverHtmlTable } from './device-channel-discover.html.table'
import './device-channel-discover.less'
export class DeviceChannelDiscoverHtmlController {
  element = {
    table: new DeviceChannelDiscoverHtmlTable(),
    search: {
      text: document.getElementById('search_text') as HTMLInputElement,
      button: document.getElementById('search_button') as HTMLButtonElement,
    },
    button: {
      refresh: document.getElementById('btn_refresh') as HTMLButtonElement,
      password: document.getElementById('btn_password') as HTMLButtonElement,
      ok: document.getElementById('btn_ok') as HTMLButtonElement,
      cancel: document.getElementById('btn_cancel') as HTMLButtonElement,
    },
  }

  event: EventEmitter<DeviceChannelDiscoverEvent> = new EventEmitter()

  constructor() {
    this.init()
    this.regist()
  }

  init() {}

  regist() {
    this.element.button.refresh.addEventListener('click', () => {
      this.event.emit('refresh')
    })
    this.element.button.password.addEventListener('click', () => {
      this.event.emit('password')
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
