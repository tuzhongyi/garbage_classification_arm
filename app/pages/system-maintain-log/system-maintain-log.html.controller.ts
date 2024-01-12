import '../../../assets/styles/table-sticky.less'
import { DateTimePicker } from '../../common/tools/date-time-picker/date-time-picker'
import { DateTimePickerView } from '../../common/tools/date-time-picker/date-time-picker.model'
import { DateTimeTool } from '../../common/tools/date-time-tool/datetime.tool'
import { SystemMaintainLogHtmlTable } from './system-maintain-log.html.table'
import './system-maintain-log.less'
export class SystemMaintainLogHtmlController {
  constructor() {
    this.init()
  }

  element = {
    table: new SystemMaintainLogHtmlTable(),
    filter: {
      begin: document.getElementById('begin_time') as HTMLInputElement,
      end: document.getElementById('end_time') as HTMLInputElement,
    },
  }

  init() {
    let duration = DateTimeTool.allDay(new Date())
    this.initDateTimePicker(this.element.filter.begin, duration.begin)
    this.initDateTimePicker(this.element.filter.end, duration.end)
  }

  initDateTimePicker(element: HTMLInputElement, datetime: Date) {
    let picker = new DateTimePicker(element)
    picker.dateChange = (date: Date) => {
      console.log(date.format('yyyy-MM-dd HH:mm:ss'))
    }
    picker.format = 'yyyy-MM-dd HH:mm:ss'
    picker.minView = DateTimePickerView.hour
    picker.date = datetime
    picker.init()
  }
}
