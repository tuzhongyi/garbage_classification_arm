import { EventEmitter } from '../../common/event-emitter'
import { EnumTool } from '../../common/tools/enum-tool/enum.tool'
import { HtmlTool } from '../../common/tools/html-tool/html.tool'
import { CanType } from '../../data-core/enums/robot/robot-can-type.model'
import { TrashCanThreshold } from '../../data-core/models/arm/analysis/trash-can-threshold.model'
import { DeviceTrashCanParamsCreater as Creater } from './device-trashcan-params.creater'
import { DeviceTrashCanParamsEvent } from './device-trashcan-params.event'
import './device-trashcan-params.less'

export class DeviceTrashCanParamsHtmlController {
  event: EventEmitter<DeviceTrashCanParamsEvent> = new EventEmitter()

  constructor() {
    this.regist()
  }
  private element = {
    template: document.getElementById('template-item') as HTMLTemplateElement,
    content: document.querySelector(
      '.device-trashcan-params-body'
    ) as HTMLDivElement,
    save: document.getElementById('save') as HTMLButtonElement,

    OverflowFromIOEnabled: document.getElementById(
      'OverflowFromIOEnabled'
    ) as HTMLInputElement,
    ChangeTrashCanEnabled: document.getElementById(
      'ChangeTrashCanEnabled'
    ) as HTMLInputElement,
    TrashCanTimeout: document.getElementById(
      'TrashCanTimeout'
    ) as HTMLInputElement,
    NoReplacementTimeout: document.getElementById(
      'NoReplacementTimeout'
    ) as HTMLInputElement,
  }

  private regist() {
    this.element.save.addEventListener('click', () => {
      this.event.emit('save')
    })
    HtmlTool.input.number.mousewheelchangevalue(this.element.TrashCanTimeout)
    HtmlTool.input.number.mousewheelchangevalue(
      this.element.NoReplacementTimeout
    )
  }

  private async append(item: TrashCanThreshold) {
    const clone = this.element.template.content.cloneNode(true) as HTMLElement
    let forms = clone.querySelector('.forms') as HTMLDivElement
    forms.setAttribute('can-type', item.CanType)
    forms.classList.add('TrashCanThreshold')
    let Threshold_CanType = clone.querySelector(
      '.Threshold-CanType'
    ) as HTMLDivElement
    Threshold_CanType.innerHTML = `${await EnumTool.trashcan.CanType(
      item.CanType
    )}最小空桶数量`

    let Threshold = clone.querySelector('.Threshold') as HTMLInputElement
    Threshold.value = HtmlTool.set(item.Threshold)
    Threshold.min = '-1'
    HtmlTool.input.number.mousewheelchangevalue(Threshold)

    let ChangeThreshold_CanType = clone.querySelector(
      '.ChangeThreshold-CanType'
    ) as HTMLDivElement
    ChangeThreshold_CanType.innerHTML = `${await EnumTool.trashcan.CanType(
      item.CanType
    )}更换阈值`
    let ChangeThreshold = clone.querySelector(
      '.ChangeThreshold'
    ) as HTMLInputElement
    ChangeThreshold.value = HtmlTool.set(item.ChangeThreshold)
    ChangeThreshold.min = '50'
    ChangeThreshold.max = '100'
    HtmlTool.input.number.mousewheelchangevalue(ChangeThreshold)

    this.element.content.appendChild(clone)
  }

  clear() {
    let items = this.element.content.querySelectorAll('.TrashCanThreshold')
    items.forEach((item) => {
      this.element.content.removeChild(item)
    })
  }
  async load(data = Creater.TrashCanWarningParams()) {
    for (let i = 0; i < data.CanThresholds.length; i++) {
      await this.append(data.CanThresholds[i])
    }
    this.element.ChangeTrashCanEnabled.checked =
      data.ChangeTrashCanEnabled ?? false
    this.element.OverflowFromIOEnabled.checked =
      data.OverflowFromIOEnabled ?? false
    this.element.TrashCanTimeout.value = HtmlTool.set(data.TrashCanTimeout)
    this.element.NoReplacementTimeout.value = HtmlTool.set(
      data.NoReplacementTimeout
    )
  }

  get(data = Creater.TrashCanWarningParams()) {
    data.CanThresholds = []
    let items = this.element.content.querySelectorAll('.TrashCanThreshold')
    items.forEach((item) => {
      let Threshold = item.querySelector('.Threshold') as HTMLInputElement
      let ChangeThreshold = item.querySelector(
        '.ChangeThreshold'
      ) as HTMLInputElement
      let threshold = new TrashCanThreshold()
      threshold.CanType = item.getAttribute('can-type') as CanType
      threshold.Threshold = HtmlTool.get(Threshold.value, 'number')
      threshold.ChangeThreshold = HtmlTool.get(ChangeThreshold.value, 'number')
      data.CanThresholds.push(threshold)
    })
    data.ChangeTrashCanEnabled = this.element.ChangeTrashCanEnabled.checked
    data.OverflowFromIOEnabled = this.element.OverflowFromIOEnabled.checked
    data.TrashCanTimeout = HtmlTool.get(
      this.element.TrashCanTimeout.value,
      'number'
    )
    data.NoReplacementTimeout = HtmlTool.get(
      this.element.NoReplacementTimeout.value,
      'number'
    )
    return data
  }
}
