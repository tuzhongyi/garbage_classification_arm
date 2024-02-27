import { EventEmitter } from '../../common/event-emitter'
import { EnumTool } from '../../common/tools/enum-tool/enum.tool'
import { CanType } from '../../data-core/enums/robot/robot-can-type.model'
import { TrashCanThreshold } from '../../data-core/models/arm/analysis/trash-can-threshold.model'
import { TrashCanWarningParams } from '../../data-core/models/arm/analysis/trash-can-warning-params.model'
import { DeviceTrashCanParamsEvent } from './device-trashcan-params.event'
import './device-trashcan-params.less'

export class DeviceTrashCanParamsHtmlController {
  event: EventEmitter<DeviceTrashCanParamsEvent> = new EventEmitter()

  constructor() {
    this.regist()
  }
  private parser = new DOMParser()
  private element = {
    template: document.getElementById('template-item') as HTMLTemplateElement,
    forms: document.getElementById('forms') as HTMLDivElement,
    save: document.getElementById('save') as HTMLButtonElement,
  }

  private regist() {
    this.element.save.addEventListener('click', () => {
      this.event.emit('save')
    })
  }

  private async append(item: TrashCanThreshold) {
    const clone = this.element.template.content.cloneNode(true) as HTMLElement

    let name = clone.querySelector('.name') as HTMLDivElement
    name.innerHTML = await EnumTool.CanType(item.CanType)
    name.id = item.CanType
    let value = clone.querySelector('.value') as HTMLInputElement
    value.value = item.Threshold.toString()
    this.element.forms.appendChild(clone)
  }

  clear() {
    this.element.forms.innerHTML = ''
  }
  load(data: TrashCanWarningParams = { CanThresholds: [] }) {
    for (let i = 0; i < data.CanThresholds.length; i++) {
      this.append(data.CanThresholds[i])
    }
  }

  get() {
    let params = new TrashCanWarningParams()
    params.CanThresholds = []
    let items = this.element.forms.querySelectorAll<HTMLElement>('.form-item')
    items.forEach((item) => {
      let input = item.querySelector('.value') as HTMLInputElement
      let name = item.querySelector('.name') as HTMLDivElement
      let threshold = new TrashCanThreshold()
      threshold.CanType = name.id as CanType
      threshold.Threshold = parseInt(input.value)
      params.CanThresholds.push(threshold)
    })
    return params
  }
}
