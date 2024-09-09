import { EventEmitter } from '../../common/event-emitter'
import { HtmlTool } from '../../common/tools/html-tool/html.tool'
import { SystemIOOutputEvent } from './system-io-output.event'

import { EnumTool } from '../../common/tools/enum-tool/enum.tool'
import { IOState } from '../../data-core/enums/io/io-state.enum'
import { IOOutputPort } from '../../data-core/models/arm/io/io-output-port.model'
import { Manager } from '../../data-core/requests/managers/manager'
import { SystemIOOutputSheetController } from './controller/sheet/system-io-output-sheet.controller'
import './less/system-io-output.less'

declare const $: any

export class SystemIOOutputHtmlController {
  event: EventEmitter<SystemIOOutputEvent> = new EventEmitter()
  sheet = new SystemIOOutputSheetController()

  constructor() {
    this.regist()
    this._init()
  }

  private element = {
    Id: document.getElementById('Id') as HTMLSelectElement,
    Name: document.getElementById('Name') as HTMLInputElement,
    State: document.getElementById('State') as HTMLSelectElement,
    Delay: document.getElementById('Delay') as HTMLInputElement,

    save: document.getElementById('save') as HTMLButtonElement,
    manual: {
      button: document.getElementById('manual') as HTMLButtonElement,
      text: document.getElementById('manual_text') as HTMLTextAreaElement,
    },
    copy: document.getElementById('output_copy') as HTMLButtonElement,
  }

  datas: IOOutputPort[] = []

  private regist() {
    this.element.save.addEventListener('click', () => {
      let data = this.get()
      this.event.emit('save', data)
    })
    this.element.manual.button.addEventListener('click', () => {
      let data = this.get()
      this.event.emit('manual', data)
    })
    this.element.copy.addEventListener('click', () => {
      this.event.emit('copy')
    })
    this.element.Id.addEventListener('change', (e) => {
      let input = e.currentTarget as HTMLSelectElement
      let value = parseInt(input.value)
      let data = this.datas.find((x) => x.Id === value)
      this.event.emit('select', data)
    })
  }
  private _init() {
    HtmlTool.input.number.mousewheelchangevalue(this.element.Delay)
    Manager.capability.device.then((x) => {
      if (x.IOStates) {
        this.element.State.innerHTML = ''
        x.IOStates.forEach((item) => {
          let value = { Id: item.Value, Name: item.Name }
          HtmlTool.select.append(value, this.element.State)
        })
      }
    })
  }

  private get() {
    let data = new IOOutputPort()
    data.Id = HtmlTool.get(this.element.Id.value, 'number')
    data.Name = HtmlTool.get(this.element.Name.value)
    data.State = HtmlTool.get(this.element.State.value) as IOState
    data.Delay = HtmlTool.get(this.element.Delay.value, 'number')
    return data
  }

  get selected() {
    return this.datas.find((x) => x.Id.toString() === this.element.Id.value)
  }

  set(data: IOOutputPort) {
    let index = this.datas.findIndex((x) => x.Id === data.Id)
    if (index >= 0) {
      this.datas[index] = data
    }
  }

  init(datas: IOOutputPort[]) {
    this.datas = datas
    if (datas.length > 0) {
      datas.forEach((x) => {
        let value = { Id: x.Id, Name: `端口${x.Id}` }
        HtmlTool.select.append<number>(value, this.element.Id)
      })
      this.event.emit('select', datas[0])
    }
  }
  clear() {
    this.element.Id.innerHTML = ''
  }

  async load(data: IOOutputPort) {
    this.element.Id.value = HtmlTool.set(data.Id)
    this.element.Name.value = HtmlTool.set(data.Name)
    this.element.State.value = HtmlTool.set(data.State)
    this.element.Delay.value = HtmlTool.set(data.Delay)

    let other = data.State === IOState.Low ? IOState.High : IOState.Low
    this.element.manual.text.innerHTML = `${await EnumTool.IOState(other)}输出`
  }
}
