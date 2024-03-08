import '../../../assets/styles/table-sticky.less'
import { EventEmitter } from '../../common/event-emitter'
import { DateTimePicker } from '../../common/tools/controls/date-time-picker/date-time-picker'
import { DateTimePickerView } from '../../common/tools/controls/date-time-picker/date-time-picker.model'
import { DeviceTrashCanLogEvent } from './device-trashcan-log.event'
import { DeviceTrashCanLogHtmlTable } from './device-trashcan-log.html.table'
import './device-trashcan-log.less'
export class DeviceTrashCanLogHtmlController {
  event: EventEmitter<DeviceTrashCanLogEvent> = new EventEmitter()

  constructor() {
    this.regist()
    this.init()
  }

  private element = {
    filter: {
      date: document.getElementById('date') as HTMLInputElement,
    },
    search: document.getElementById('search') as HTMLButtonElement,
  }
  table = new DeviceTrashCanLogHtmlTable()
  private regist() {
    this.element.search.addEventListener('click', () => {
      this.event.emit('search')
    })
  }

  private init() {
    let date = this.initDateTimePicker(this.element.filter.date, new Date())
    date.dateChange = (date) => {
      this.event.emit('datechange', date)
    }
  }

  private initDateTimePicker(element: HTMLInputElement, datetime: Date) {
    let picker = new DateTimePicker(element)
    picker.format = 'yyyy-MM-dd'
    picker.minView = DateTimePickerView.month
    picker.date = datetime
    picker.init()
    return picker
  }

  load() {}
}
