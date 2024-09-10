import '../../../assets/styles/table-sticky.less'
import { EventEmitter } from '../../common/event-emitter'
import { DateTimePicker } from '../../common/tools/controls/date-time-picker/date-time-picker'
import { DateTimePickerView } from '../../common/tools/controls/date-time-picker/date-time-picker.model'
import { DateTimeTool } from '../../common/tools/date-time-tool/datetime.tool'
import { HtmlTool } from '../../common/tools/html-tool/html.tool'
import { Manager } from '../../data-core/requests/managers/manager'
import { EventRecordListEvent } from './event-record-list.event'
import { EventRecordListHtmlTable } from './event-record-list.html.table'
import './event-record-list.less'
export class EventRecordListHtmlController {
  event: EventEmitter<EventRecordListEvent> = new EventEmitter()

  constructor() {
    this.regist()
    this.init()
  }

  private element = {
    filter: {
      time: {
        begin: document.getElementById('begin_time') as HTMLInputElement,
        end: document.getElementById('end_time') as HTMLInputElement,
      },
      type: document.getElementById('event_type') as HTMLSelectElement,
      uploaded: document.getElementById('uploaded') as HTMLInputElement,
    },
    search: document.getElementById('search') as HTMLButtonElement,
  }
  private inited = false

  table = new EventRecordListHtmlTable()

  private regist() {
    this.element.filter.type.addEventListener('change', () => {
      let value: number | undefined = undefined
      if (this.element.filter.type.value) {
        value = parseInt(this.element.filter.type.value)
      }
      this.event.emit('type', value)
    })
    this.element.filter.uploaded.addEventListener('change', () => {
      let value: boolean | undefined = undefined
      if (this.element.filter.uploaded.value) {
        value = JSON.parse(this.element.filter.uploaded.value)
      }
      this.event.emit('uploaded', value)
    })
    this.element.search.addEventListener('click', () => {
      this.event.emit('search')
    })
  }

  private init() {
    this.initDuration()
    this.initEventType()
  }

  private initDuration() {
    let duration = DateTimeTool.allDay(new Date())
    let begin = this.initDateTimePicker(
      this.element.filter.time.begin,
      duration.begin
    )
    begin.dateChange = (date) => {
      this.event.emit('begin', date)
    }
    let end = this.initDateTimePicker(
      this.element.filter.time.end,
      duration.end
    )
    end.dateChange = (date) => {
      this.event.emit('end', date)
    }
  }

  private initEventType() {
    Manager.capability.event.then((x) => {
      if (x.EventTypes) {
        HtmlTool.select.append(
          {
            Id: '',
            Name: '全部',
          },
          this.element.filter.type
        )
        for (let i = 0; i < x.EventTypes.length; i++) {
          const item = x.EventTypes[i]
          let model = {
            Id: item.Value,
            Name: item.Name,
          }
          HtmlTool.select.append(model, this.element.filter.type)
        }
      }
      this.inited = true
    })
  }

  private initDateTimePicker(element: HTMLInputElement, datetime: Date) {
    let picker = new DateTimePicker(element)
    picker.format = 'yyyy-MM-dd HH:mm:ss'
    picker.minView = DateTimePickerView.hour
    picker.date = datetime
    picker.init()
    return picker
  }

  load() {}
}
