import '../../../assets/styles/table-sticky.less'
import { EventEmitter } from '../../common/event-emitter'
import { DeviceChannelListEvent } from './device-channel-list.event'
import { DeviceChannelListHtmlTable } from './device-channel-list.html.table'
import './device-channel-list.less'
export class DeviceChannelListHtmlController {
  element = {
    table: new DeviceChannelListHtmlTable(),
    search: {
      text: document.getElementById('search_text') as HTMLInputElement,
      button: document.getElementById('search_button') as HTMLButtonElement,
    },
    button: {
      create: document.getElementById('btn_create') as HTMLButtonElement,
      delete: document.getElementById('btn_delete') as HTMLButtonElement,
      discover: document.getElementById('btn_discover') as HTMLButtonElement,
      sync: document.getElementById('btn_sync') as HTMLButtonElement,
    },
  }

  event: EventEmitter<DeviceChannelListEvent> = new EventEmitter()

  constructor() {
    this.init()
    this.regist()
  }

  init() {}

  regist() {
    this.element.button.create.addEventListener('click', () => {
      this.event.emit('create')
    })
    this.element.button.delete.addEventListener('click', () => {
      if (
        this.element.table.selecteds &&
        this.element.table.selecteds.length > 0
      ) {
        this.event.emit('delete', this.element.table.selecteds)
      }
    })
    this.element.button.discover.addEventListener('click', () => {
      this.event.emit('discover')
    })
    this.element.button.sync.addEventListener('click', () => {
      this.event.emit('sync')
    })
    this.element.search.button.addEventListener('click', () => {
      this.event.emit('search', this.element.search.text.value)
    })
  }
}
