import { EventEmitter } from '../../../common/event-emitter'
import { HtmlTool } from '../../../common/tools/html-tool/html.tool'
import { CompressionTask } from '../../../data-core/models/compactor/compression-task.model'

interface DeviceCompactorOperationCompressionEvent {
  start(): void
  stop(): void
}

export class DeviceCompactorOperationCompressionController {
  event: EventEmitter<DeviceCompactorOperationCompressionEvent> =
    new EventEmitter()

  constructor() {
    this.regist()
  }

  private element = {
    Distance: document.getElementById('Distance') as HTMLInputElement,
    Pressure: document.getElementById('Pressure') as HTMLInputElement,
    MaxDistance: document.getElementById('MaxDistance') as HTMLInputElement,
    MaxPressure: document.getElementById('MaxPressure') as HTMLInputElement,
    button: {
      start: document.getElementById('start') as HTMLButtonElement,
      stop: document.getElementById('stop') as HTMLButtonElement,
    },
  }

  private regist() {
    this.element.button.start.addEventListener('click', () => {
      this.event.emit('start')
    })
    this.element.button.stop.addEventListener('click', () => {
      this.event.emit('stop')
    })
  }

  load(data: CompressionTask) {
    this.element.Distance.value = HtmlTool.set(data.Distance)
    this.element.Pressure.value = HtmlTool.set(data.Pressure)
    this.element.MaxDistance.value = HtmlTool.set(data.MaxDistance)
    this.element.MaxPressure.value = HtmlTool.set(data.MaxPressure)
    this.element.button.start.style.display = 'none'
    this.element.button.stop.style.display = ''
  }
  clear() {
    // this.element.Distance.value = ''
    // this.element.Pressure.value = ''
    // this.element.MaxDistance.value = ''
    // this.element.MaxPressure.value = ''

    this.element.button.start.style.display = ''
    this.element.button.stop.style.display = 'none'
  }
}
