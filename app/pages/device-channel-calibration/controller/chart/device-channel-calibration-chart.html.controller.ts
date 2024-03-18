import { EventEmitter } from '../../../../common/event-emitter'
import { Point } from '../../../../data-core/models/arm/point.model'
import { DeviceChannelCalibrationMode as CalibrationMode } from '../../device-channel-calibration.model'

export interface DeviceChannelCalibrationChartHtmlEvent {
  init(canvas: HTMLCanvasElement): void
  buttoncancel(): void
  buttonpolygon(): void
  buttonrectangle(): void
  buttonpoint(): void
  buttonclear(): void
  pointdrawing(point: Point): void
  polygondrawing(point: Point): void
  mousemove(point: Point): void
  pointover(): void
  polygonover(): void
}

export class DeviceChannelCalibrationChartHtmlController {
  event = new EventEmitter<DeviceChannelCalibrationChartHtmlEvent>()

  constructor() {
    this.regist()
  }
  private element = {
    message: document.getElementById('message') as HTMLDivElement,
    button: {
      polygon: document.getElementById('button_polygon') as HTMLButtonElement,
      rectangle: document.getElementById(
        'button_rectangle'
      ) as HTMLButtonElement,
      point: document.getElementById('button_point') as HTMLButtonElement,
      clear: document.getElementById('button_clear') as HTMLButtonElement,
    },
    canvas: document.getElementById('canvas') as HTMLCanvasElement,
  }
  private mode?: CalibrationMode

  init() {
    let parent = this.element.canvas.parentElement as HTMLElement
    let img = parent.querySelector('img') as HTMLImageElement
    this.element.canvas.width = img.clientWidth
    this.element.canvas.height = img.clientHeight
    this.event.emit('init', this.element.canvas)
  }

  onbuttonpolygon() {
    this.clear()
    if (this.mode == CalibrationMode.polygon) {
      this.mode = undefined
      this.event.emit('buttoncancel')
    } else {
      this.mode = CalibrationMode.polygon
      this.element.button.polygon.classList.add('selected')
      this.event.emit('buttonpolygon')
    }
  }

  private regist() {
    this.element.button.polygon.addEventListener(
      'click',
      this.onbuttonpolygon.bind(this)
    )
    this.element.button.point.addEventListener('click', (e) => {
      this.clear()
      if (this.mode == CalibrationMode.point) {
        this.mode = undefined
        this.event.emit('buttoncancel')
      } else {
        this.mode = CalibrationMode.point
        this.element.button.point.classList.add('selected')
        this.event.emit('buttonpoint')
      }
    })
    this.element.button.rectangle.addEventListener('click', (e: Event) => {
      this.clear()
      this.event.emit('buttonrectangle')
    })

    this.element.button.clear.addEventListener('click', (e) => {
      this.mode = undefined
      this.clear()
      this.event.emit('buttonclear')
    })
    this.element.canvas.addEventListener('click', (e: MouseEvent) => {
      e.stopImmediatePropagation()

      let point = new Point()
      point.X = e.offsetX
      point.Y = e.offsetY
      switch (this.mode) {
        case CalibrationMode.point:
          this.event.emit('pointdrawing', point)
          this.element.message.innerText = '右击保存'
          break
        case CalibrationMode.polygon:
          this.event.emit('polygondrawing', point)
          break
        default:
          break
      }
    })
    this.element.canvas.addEventListener('mousemove', (e: MouseEvent) => {
      if (this.mode === CalibrationMode.polygon) {
        let point = new Point()
        point.X = e.offsetX
        point.Y = e.offsetY
        this.event.emit('mousemove', point)
      }
    })
    this.element.canvas.oncontextmenu = () => {
      return false
    }
    this.element.canvas.addEventListener('contextmenu', () => {
      this.element.message.innerText = ''
      switch (this.mode) {
        case CalibrationMode.point:
          this.event.emit('pointover')
          break
        case CalibrationMode.polygon:
          this.event.emit('polygonover')
          break
        default:
          break
      }
    })
  }

  clear() {
    this.element.message.innerText = ''
    let selected = document.querySelector('button.selected')
    if (selected) {
      selected.classList.remove('selected')
    }
  }
}
