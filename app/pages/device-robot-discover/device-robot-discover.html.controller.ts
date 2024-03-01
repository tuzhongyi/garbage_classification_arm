import '../../../assets/styles/table-sticky.less'
import { EventEmitter } from '../../common/event-emitter'
import { RobotSearchResult } from '../../data-core/models/robot/robot-search-result.model'
import '../window/window.less'
import { DeviceRobotDiscoverEvent } from './device-robot-discover.event'
import { DeviceRobotDiscoverHtmlTable } from './device-robot-discover.html.table'
import './device-robot-discover.less'
export class DeviceRobotDiscoverHtmlController {
  element = {
    loading: document.getElementById('loading') as HTMLDivElement,

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
  table = new DeviceRobotDiscoverHtmlTable()

  public get loading(): boolean {
    return this.element.loading.style.display !== 'none'
  }
  public set loading(v: boolean) {
    this.table.show = !v
    this.element.loading.style.display = v ? '' : 'none'
  }

  public get selecteds() {
    return this.table.selecteds
  }

  constructor() {
    this.init()
    this.regist()
  }

  init() {}

  regist() {
    this.element.button.refresh.addEventListener('click', () => {
      this.table.clear()
      this.loading = true
      this.event.emit('refresh')
    })
    this.element.button.ok.addEventListener('click', () => {
      this.event.emit('ok')
    })
    this.element.button.cancel.addEventListener('click', () => {
      this.event.emit('cancel')
    })
    this.element.search.button.addEventListener('click', () => {
      this.clear()
      this.event.emit('search', this.element.search.text.value)
    })
    this.table.event.on('select', (selecteds) => {
      this.element.button.ok.disabled = !selecteds || selecteds.length === 0
    })
  }

  load(datas: RobotSearchResult[] = []) {
    this.loading = false
    this.table.load(datas)
  }

  clear() {
    this.table.clear()
  }
}
