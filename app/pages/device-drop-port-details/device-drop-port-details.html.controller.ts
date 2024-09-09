import '../window/window.less'
import './device-drop-port-details.less'

import { EventEmitter } from '../../common/event-emitter'
import { DeviceDropPortDetailsEvent } from './device-drop-port-details.event'

import { DropPortConfig } from '../../data-core/models/arm/io/drop-port-config.model'
import { DeviceDropPortDetailsChartController } from './controller/chart/device-drop-port-details-chart.controller'
import { DeviceDropPortDetailsInfoController } from './controller/info/ai-event-rule-details-info.controller'

export class DeviceDropPortDetailsHtmlController {
  chart = new DeviceDropPortDetailsChartController()
  info = new DeviceDropPortDetailsInfoController()

  event: EventEmitter<DeviceDropPortDetailsEvent> = new EventEmitter()
  constructor() {
    this.regist()
  }
  private element = {
    picture: document.getElementById('picture') as HTMLImageElement,
    button: {
      ok: document.getElementById('btn_ok') as HTMLButtonElement,
      cancel: document.getElementById('btn_cancel') as HTMLButtonElement,
    },
  }

  private regist() {
    this.element.button.ok.addEventListener('click', () => {
      this.event.emit('ok')
    })
    this.element.button.cancel.addEventListener('click', () => {
      this.event.emit('cancel')
    })
  }
  picture(url: string) {
    this.element.picture.src = url
  }

  load(data: DropPortConfig) {
    this.info.load(data)
    this.chart.load(data.TrashCanArea)
  }

  get(data?: DropPortConfig) {
    data = this.info.get(data)
    data.TrashCanArea = this.chart.get()
    return data
  }
}
