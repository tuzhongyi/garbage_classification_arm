import '../../../assets/styles/table-sticky.less'
import { EventEmitter } from '../../common/event-emitter'
import { DateTimePicker } from '../../common/tools/date-time-picker/date-time-picker'
import { DateTimePickerView } from '../../common/tools/date-time-picker/date-time-picker.model'
import { DateTimeTool } from '../../common/tools/date-time-tool/datetime.tool'
import { EnumNameValue } from '../../data-core/models/capabilities/enum-name-value.model'
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
      nodetype: document.getElementById('filter_nodetype') as HTMLSelectElement,
      cantype: document.getElementById('filter_cantype') as HTMLSelectElement,
    },
    search: document.getElementById('search') as HTMLButtonElement,
  }
  event: EventEmitter<DeviceRobotLogEvent> = new EventEmitter()

  regist() {
    this.element.search.addEventListener('click', () => {
      this.event.emit('search')
    })
    this.element.filter.nodetype.addEventListener('change', () => {
      this.event.emit('majorchange', this.element.filter.nodetype.value)
    })
    this.element.filter.cantype.addEventListener('change', () => {
      this.event.emit('minorchange', this.element.filter.cantype.value)
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
    return picker
  }

  load(nodeTypes: EnumNameValue[], cantypes: EnumNameValue[]) {
    for (let i = 0; i < nodeTypes.length; i++) {
      let option = document.createElement('option') as HTMLOptionElement
      option.innerHTML = nodeTypes[i].Name
      option.value = nodeTypes[i].Value
      this.element.filter.nodetype.appendChild(option)
    }
    for (let i = 0; i < cantypes.length; i++) {
      let option = document.createElement('option') as HTMLOptionElement
      option.innerHTML = cantypes[i].Name
      option.value = cantypes[i].Value
      this.element.filter.cantype.appendChild(option)
    }
  }
}
