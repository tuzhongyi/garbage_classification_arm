import { EventEmitter } from '../../common/event-emitter'
import { HtmlTool } from '../../common/tools/html-tool/html.tool'
import { IOState } from '../../data-core/enums/io/io-state.enum'
import { IOInputPort } from '../../data-core/models/arm/io/io-input-port.model'
import { Manager } from '../../data-core/requests/managers/manager'

import './system-io-input.less'

interface SystemIOInputEvent {
  save: (data: IOInputPort) => void
  select: (id: number) => void
}
export class SystemIOInputHtmlController {
  event: EventEmitter<SystemIOInputEvent> = new EventEmitter()

  constructor() {
    this.regist()
    this._init()
  }

  private element = {
    Id: document.getElementById('Id') as HTMLSelectElement,
    Name: document.getElementById('Name') as HTMLInputElement,
    State: document.getElementById('State') as HTMLSelectElement,
    AlarmState: document.getElementById('AlarmState') as HTMLSelectElement,

    save: document.getElementById('save') as HTMLButtonElement,
  }

  private _init() {
    Manager.capability.device.then((x) => {
      if (x.IOStates) {
        this.element.State.innerHTML = ''
        this.element.AlarmState.innerHTML = ''
        x.IOStates.forEach((item) => {
          let value = { Id: item.Value, Name: item.Name }
          HtmlTool.select.append(value, this.element.State)
          HtmlTool.select.append(value, this.element.AlarmState)
        })
      }
    })
  }

  private regist() {
    this.element.Id.addEventListener('change', () => {
      let id = HtmlTool.get(this.element.Id.value, 'number')
      this.event.emit('select', id)
    })
    this.element.save.addEventListener('click', () => {
      let data = this.get()
      this.event.emit('save', data)
    })
  }

  private get() {
    let data = new IOInputPort()
    data.Id = HtmlTool.get(this.element.Id.value, 'number')
    data.Name = HtmlTool.get(this.element.Name.value)
    data.State = HtmlTool.get(this.element.State.value) as IOState
    data.AlarmState = HtmlTool.get(this.element.AlarmState.value)
    return data
  }

  init(datas: IOInputPort[]) {
    datas.forEach((x) => {
      let value = { Id: x.Id, Name: `端口${x.Id}` }
      HtmlTool.select.append<number>(value, this.element.Id)
    })
  }
  clear() {
    this.element.Id.innerHTML = ''
  }

  load(data: IOInputPort) {
    this.element.Id.value = HtmlTool.set(data.Id)
    this.element.Name.value = HtmlTool.set(data.Name)
    this.element.State.value = HtmlTool.set(data.State)
    this.element.AlarmState.value = HtmlTool.set(data.AlarmState)
  }
}
