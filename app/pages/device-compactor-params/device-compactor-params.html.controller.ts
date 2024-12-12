import { EventEmitter } from '../../common/event-emitter'
import { HtmlTool } from '../../common/tools/html-tool/html.tool'
import { CompactorParams } from '../../data-core/models/compactor/compactor-params.model'
import { DeviceCompactorParamsEvent } from './device-compactor-params.event'

import './device-compactor-params.less'

export class DeviceCompactorParamsHtmlController {
  event: EventEmitter<DeviceCompactorParamsEvent> = new EventEmitter()

  constructor() {
    this.regist()
  }

  private element = {
    InitialDistance: document.getElementById(
      'InitialDistance'
    ) as HTMLInputElement,
    HangingDistance: document.getElementById(
      'HangingDistance'
    ) as HTMLInputElement,
    Pressure: document.getElementById('Pressure') as HTMLInputElement,
    PressureDistance: document.getElementById(
      'PressureDistance'
    ) as HTMLInputElement,

    HorizontalDistance: document.getElementById(
      'HorizontalDistance'
    ) as HTMLInputElement,
    ReusedDistance: document.getElementById(
      'ReusedDistance'
    ) as HTMLInputElement,
    CanPressed: document.getElementById('CanPressed') as HTMLInputElement,
    save: document.getElementById('save') as HTMLButtonElement,
  }

  private regist() {
    HtmlTool.input.number.mousewheelchangevalue(this.element.InitialDistance)
    HtmlTool.input.number.mousewheelchangevalue(this.element.HangingDistance)
    HtmlTool.input.number.mousewheelchangevalue(this.element.Pressure)
    HtmlTool.input.number.mousewheelchangevalue(this.element.PressureDistance)
    HtmlTool.input.number.mousewheelchangevalue(this.element.HorizontalDistance)
    HtmlTool.input.number.mousewheelchangevalue(this.element.ReusedDistance)
    this.element.save.addEventListener('click', () => {
      this.event.emit('save')
    })
  }

  load(data: CompactorParams) {
    this.element.InitialDistance.value = HtmlTool.set(data.InitialDistance)
    this.element.HangingDistance.value = HtmlTool.set(data.HangingDistance)
    this.element.Pressure.value = HtmlTool.set(data.Pressure)
    this.element.PressureDistance.value = HtmlTool.set(data.PressureDistance)
    this.element.HorizontalDistance.value = HtmlTool.set(
      data.HorizontalDistance
    )
    this.element.ReusedDistance.value = HtmlTool.set(data.ReusedDistance)
  }

  get(data: CompactorParams) {
    data.InitialDistance = HtmlTool.get(
      this.element.InitialDistance.value,
      'number'
    )
    data.HangingDistance = HtmlTool.get(
      this.element.HangingDistance.value,
      'number'
    )
    data.Pressure = HtmlTool.get(this.element.Pressure.value, 'number')
    data.PressureDistance = HtmlTool.get(
      this.element.PressureDistance.value,
      'number'
    )
    data.HorizontalDistance = HtmlTool.get(
      this.element.HorizontalDistance.value,
      'number'
    )
    data.ReusedDistance = HtmlTool.get(
      this.element.ReusedDistance.value,
      'number'
    )
    data.CanPressed = HtmlTool.get(this.element.CanPressed.value, 'boolean')
    return data
  }
}
