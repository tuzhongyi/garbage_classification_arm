import { EventEmitter } from '../../../../common/event-emitter'
import { Point } from '../../../../data-core/models/arm/point.model'

export interface AIEventRuleDetailsChartHtmlEvent {
  init(canvas: HTMLCanvasElement): void
  buttoncancel(): void
  buttonpolygon(): void
  buttonrectangle(): void
  buttonclear(): void
  drawing(point: Point): void
  mousemove(point: Point): void
  over(): void
}

export class AIEventRuleDetailsChartHtmlController {
  event = new EventEmitter<AIEventRuleDetailsChartHtmlEvent>()

  constructor() {
    this.regist()
  }
  private element = {
    button: {
      polygon: document.getElementById('button_polygon') as HTMLButtonElement,
      rectangle: document.getElementById(
        'button_rectangle'
      ) as HTMLButtonElement,
      clear: document.getElementById('button_clear') as HTMLButtonElement,
    },
    canvas: document.getElementById('canvas') as HTMLCanvasElement,
  }
  drawing = false

  init() {
    let parent = this.element.canvas.parentElement as HTMLElement
    let img = parent.querySelector('img') as HTMLImageElement
    this.element.canvas.width = img.clientWidth
    this.element.canvas.height = img.clientHeight
    this.event.emit('init', this.element.canvas)
  }

  private regist() {
    this.element.button.polygon.addEventListener('click', (e: Event) => {
      if (this.drawing) {
        this.clear()
        this.event.emit('buttoncancel')
      } else {
        this.element.button.polygon.classList.add('selected')
        this.event.emit('buttonpolygon')
      }
    })
    this.element.button.rectangle.addEventListener('click', (e: Event) => {
      this.clear()
      this.event.emit('buttonrectangle')
    })

    this.element.button.clear.addEventListener('click', (e) => {
      this.clear()
      this.event.emit('buttonclear')
    })
    this.element.canvas.addEventListener('click', (e: MouseEvent) => {
      e.stopImmediatePropagation()
      let point = new Point()
      point.X = e.offsetX
      point.Y = e.offsetY
      this.event.emit('drawing', point)
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
      try {
        this.event.emit('over')
      } finally {
        return false
      }
    }
  }

  private clear() {
    let selected = document.querySelector('button.selected')
    if (selected) {
      selected.classList.remove('selected')
    }
    this.drawing = false
  }
}
