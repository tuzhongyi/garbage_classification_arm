import '../../../assets/styles/table-sticky.less'
import { EventEmitter } from '../../common/event-emitter'
import { Language } from '../../common/language'
import { DateTimePicker } from '../../common/tools/controls/date-time-picker/date-time-picker'
import { DateTimePickerView } from '../../common/tools/controls/date-time-picker/date-time-picker.model'
import { DateTimeTool } from '../../common/tools/date-time-tool/datetime.tool'
import { HtmlTool } from '../../common/tools/html-tool/html.tool'
import { MajorType } from '../../data-core/enums/robot/major-type.enum'
import { DeviceRobotLogEvent } from './device-robot-log.event'
import { DeviceRobotLogHtmlTable } from './device-robot-log.html.table'
import './device-robot-log.less'
export class DeviceRobotLogHtmlController {
  constructor() {
    this.regist()
    this.init()
  }

  element = {
    table: new DeviceRobotLogHtmlTable(),
    filter: {
      begin: document.getElementById('begin_time') as HTMLInputElement,
      end: document.getElementById('end_time') as HTMLInputElement,
      major: document.getElementById('filter_major') as HTMLSelectElement,
      minor: document.getElementById('filter_minor') as HTMLSelectElement,
    },
    search: document.getElementById('search') as HTMLButtonElement,
  }
  event: EventEmitter<DeviceRobotLogEvent> = new EventEmitter()

  private regist() {
    this.element.search.addEventListener('click', () => {
      this.event.emit('search')
    })
    this.element.filter.major.addEventListener('change', () => {
      this.event.emit('majorchange', this.element.filter.major.value)
    })
    this.element.filter.minor.addEventListener('change', () => {
      this.event.emit('minorchange', this.element.filter.minor.value)
    })
  }

  private init() {
    let duration = DateTimeTool.allDay(new Date())
    let begin = this.initDateTimePicker(
      this.element.filter.begin,
      duration.begin
    )
    begin.dateChange = (date) => {
      this.event.emit('beginchange', date)
    }
    let end = this.initDateTimePicker(this.element.filter.end, duration.end)
    end.dateChange = (date) => {
      this.event.emit('endchange', date)
    }

    this.initFilter()
  }

  private initDateTimePicker(element: HTMLInputElement, datetime: Date) {
    let picker = new DateTimePicker(element)
    picker.dateChange = (date: Date) => {
      console.log(date.format('yyyy-MM-dd HH:mm:ss'))
    }
    picker.format = 'yyyy-MM-dd HH:mm:ss'
    picker.minView = DateTimePickerView.hour
    picker.date = datetime
    picker.init()
    return picker
  }

  private initFilter() {
    this.initMajor()
    this.initMinor()
  }

  private initMajor() {
    for (const key in MajorType) {
      if (typeof key === 'string') {
        let item = {
          Id: key,
          Name: Language.MajorType(key as MajorType),
        }
        HtmlTool.select.append(item, this.element.filter.major)
      }
    }
  }
  private initMinor() {}

  load() {}
}
