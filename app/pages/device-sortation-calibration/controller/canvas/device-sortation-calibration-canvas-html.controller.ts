import { EventEmitter } from '../../../../common/event-emitter'
import { Point } from '../../../../data-core/models/arm/point.model'

export interface DeviceSortationCalibrationCanvasHtmlEvent {
  init(canvas: HTMLCanvasElement): void
  buttonclear(): void
  start(point: Point): void
  end(point: Point): void
  cancel(): void
  mousemove(point: Point): void
}

export class DeviceSortationCalibrationCanvasHtmlController {
  event = new EventEmitter<DeviceSortationCalibrationCanvasHtmlEvent>()

  constructor() {
    this.regist()
  }
  private element = {
    button: {
      clear: document.getElementById('button_clear') as HTMLButtonElement,
    },
    canvas: document.getElementById('canvas') as HTMLCanvasElement,
    img: document.getElementById('picture') as HTMLImageElement,
  }

  drawing = false

  private regist() {
    this.element.img.addEventListener('load', (x) => {
      let img = x.target as HTMLImageElement
      this.element.canvas.width = img.clientWidth
      this.element.canvas.height = img.clientHeight
      this.event.emit('init', this.element.canvas)
    })

    this.element.button.clear.addEventListener('click', (e) => {
      this.clear()
      this.event.emit('buttonclear')
    })
    this.element.canvas.addEventListener('click', (e: MouseEvent) => {
      e.stopImmediatePropagation()
      this.drawing = !this.drawing
      let point = new Point()
      point.X = e.offsetX
      point.Y = e.offsetY
      if (this.drawing) {
        this.event.emit('start', point)
      } else {
        this.event.emit('end', point)
      }
    })
    this.element.canvas.addEventListener('mousemove', (e: MouseEvent) => {
      if (this.drawing) {
        let point = new Point()
        point.X = e.offsetX
        point.Y = e.offsetY
        this.event.emit('mousemove', point)
      }
    })
    this.element.canvas.oncontextmenu = () => {
      this.drawing = false
      this.event.emit('cancel')
      return false
    }
  }

  private clear() {
    let selected = document.querySelector('button.selected')
    if (selected) {
      selected.classList.remove('selected')
    }
  }
}
