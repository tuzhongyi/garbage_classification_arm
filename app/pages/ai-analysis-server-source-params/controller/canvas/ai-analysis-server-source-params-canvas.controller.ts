import { EventEmitter } from '../../../../common/event-emitter'
import { wait } from '../../../../common/tools/asyn'
import { Point } from '../../../../data-core/models/arm/point.model'
import { Polygon } from '../../../../data-core/models/arm/polygon.model'
import { AIAnalysisServerSourceParamsCanvasPolygonController } from './ai-analysis-server-source-params-canvas-polygon.controller'
import { AIAnalysisServerSourceParamsCanvasHtmlController } from './ai-analysis-server-source-params-canvas.html.controller'

export interface AIAnalysisServerSourceParamsCanvasEvent {
  polygon(polygon: Polygon): void
  clear(): void
  inited(): void
}

export class AIAnalysisServerSourceParamsCanvasController {
  event: EventEmitter<AIAnalysisServerSourceParamsCanvasEvent> =
    new EventEmitter()
  constructor() {
    this.init()
    this.regist()
  }
  private canvas = document.getElementById('canvas') as HTMLCanvasElement
  private ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D
  private polygon = new AIAnalysisServerSourceParamsCanvasPolygonController(
    this.ctx
  )
  private size = {
    width: 0,
    height: 0,
  }

  html = new AIAnalysisServerSourceParamsCanvasHtmlController()
  private data = this.create()
  private current?: Polygon

  private create() {
    let data = new Polygon()
    data.Coordinates = []
    return data
  }

  private init() {
    return new Promise<void>((resolve) => {
      let parent = this.canvas.parentElement as HTMLElement
      wait(
        () => {
          return !!(parent.clientWidth && parent.clientHeight)
        },
        () => {
          this.canvas.width = parent.clientWidth
          this.canvas.height = parent.clientHeight
          this.size.width = this.canvas.width
          this.size.height = this.canvas.height
          this.event.emit('inited')
          resolve()
        }
      )
    })
  }

  private regist() {
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
      this.data.Coordinates = [
        { X: 0, Y: 0 },
        { X: 0, Y: 1 },
        { X: 1, Y: 1 },
        { X: 1, Y: 0 },
        { X: 0, Y: 0 },
      ]
      this.event.emit('polygon', this.data)
    })
    this.html.event.on('buttonpolygon', () => {
      this.clear({
        current: true,
        data: true,
      })
    })

    this.html.event.on('drawing', (point) => {
      if (!this.current) {
        this.current = this.create()
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
        this.data = this.create()
        for (let i = 0; i < this.current.Coordinates.length; i++) {
          const point = this.current.Coordinates[i]
          this.data.Coordinates.push({
            X: point.X / this.size.width,
            Y: point.Y / this.size.height,
          })
        }
        this.data.Coordinates.push(this.data.Coordinates[0])
        this.event.emit('polygon', this.data)
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
        this.data = this.create()
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
    this.clear({ data: true })
    for (let i = 0; i < polygon.Coordinates.length; i++) {
      const point = polygon.Coordinates[i]
      this.data.Coordinates.push({
        X: point.X * this.size.width,
        Y: point.Y * this.size.height,
      })
    }
    this.polygon.drawing(this.data)
  }

  get() {
    let result = new Polygon()
    result.Coordinates = []
    for (let i = 0; i < this.data.Coordinates.length; i++) {
      let point = new Point()
      point.X = this.data.Coordinates[i].X / this.size.width
      point.Y = this.data.Coordinates[i].Y / this.size.height
      result.Coordinates.push(point)
    }
    return result
  }
}
