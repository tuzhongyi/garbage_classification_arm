import '../../../assets/styles/table-sticky.less'
import { EventEmitter } from '../../common/event-emitter'
import { NetworkFrpListEvent } from './network-frp-list.event'
import { NetworkFrpListHtmlTable } from './network-frp-list.html.table'
import './network-frp-list.less'
export class NetworkFrpListHtmlController {
  event = new EventEmitter<NetworkFrpListEvent>()
  table = new NetworkFrpListHtmlTable()
  constructor() {
    this.regist()
  }
  private element = {
    create: document.getElementById('btn_create') as HTMLButtonElement,
  }

  private regist() {
    this.element.create.addEventListener('click', () => {
      this.event.emit('create')
    })
  }
}
