import { EventEmitter } from '../../../../common/event-emitter'
import { wait } from '../../../../common/tools/wait'
import { Polygon } from '../../../../data-core/models/arm/polygon.model'
import { AIEventRuleDetailsChartPolygonController } from './device-channel-calibration-chart-polygon.controller'
import { AIEventRuleDetailsChartHtmlController } from './device-channel-calibration-chart.html.controller'
export interface AIEventRuleDetailsChartEvent {
  polygon(polygon: Polygon): void
  clear(): void
}
export class AIEventRuleDetailsChartController {
  event: EventEmitter<AIEventRuleDetailsChartEvent> = new EventEmitter()

  constructor() {
    this.regist()
  }
  private html = new AIEventRuleDetailsChartHtmlController()
  private ctx?: CanvasRenderingContext2D
  private size = {
    width: 0,
    height: 0,
  }
  private current?: Polygon
  private data?: Polygon
  private polygon!: AIEventRuleDetailsChartPolygonController
  private inited = false

  private regist() {
    this.html.event.on('init', (canvas) => {
      this.size.width = canvas.width
      this.size.height = canvas.height
      this.ctx = canvas.getContext('2d') as CanvasRenderingContext2D
      this.polygon = new AIEventRuleDetailsChartPolygonController(this.ctx)
      this.inited = true
    })
    this.html.event.on('buttonclear', () => {
      this.clear({
        data: true,
        current: true,
      })
      this.event.emit('clear')
    })
    this.html.event.on('buttoncancel', () => {
      this.clear({
        current: true,
      })
      this.reload()
    })
    this.html.event.on('buttonrectangle', () => {
      let polygon = new Polygon()
      polygon.Coordinates = [
        { X: 0, Y: 0 },
        { X: 0, Y: 1 },
        { X: 1, Y: 1 },
        { X: 1, Y: 0 },
        { X: 0, Y: 0 },
      ]
      this.event.emit('polygon', polygon)
    })
    this.html.event.on('buttonpolygon', () => {
      this.clear({
        current: true,
        data: true,
      })
    })

    this.html.event.on('drawing', (point) => {
      if (!this.current) {
        this.current = new Polygon()
        this.current.Coordinates = []
      }
      this.current.Coordinates.push(point)
      this.reload()
      this.polygon.drawing(this.current, { isnew: true })
    })
    this.html.event.on('mousemove', (point) => {
      if (this.current && this.current.Coordinates.length > 0) {
        this.reload()
        this.polygon.drawing(this.current, {
          isnew: true,
          current: point,
        })
      }
    })
    this.html.event.on('over', () => {
      if (this.current && this.current.Coordinates.length > 2) {
        let polygon = new Polygon()
        polygon.Coordinates = []
        for (let i = 0; i < this.current.Coordinates.length; i++) {
          const point = this.current.Coordinates[i]
          polygon.Coordinates.push({
            X: point.X / this.size.width,
            Y: point.Y / this.size.height,
          })
        }
        polygon.Coordinates.push(polygon.Coordinates[0])
        this.event.emit('polygon', polygon)
      } else {
        this.reload()
      }
      this.current = undefined
    })
  }

  clear(args?: { data?: boolean; current?: boolean }) {
    if (!this.ctx) return
    this.ctx.clearRect(0, 0, this.size.width, this.size.height)
    if (args) {
      if (args.data) {
        this.data = undefined
      }
      if (args.current) {
        this.current = undefined
      }
    }
  }

  reload() {
    this.clear()
    if (this.data) {
      this.polygon.drawing(this.data)
    }
  }

  load(polygon: Polygon) {
    wait(
      () => {
        return this.inited
      },
      () => {
        this.clear({ data: true })
        this.data = new Polygon()
        this.data.Coordinates = []
        for (let i = 0; i < polygon.Coordinates.length; i++) {
          const point = polygon.Coordinates[i]
          this.data.Coordinates.push({
            X: point.X * this.size.width,
            Y: point.Y * this.size.height,
          })
        }
        this.polygon.drawing(this.data)
      }
    )
  }
}
