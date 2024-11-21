import { EventEmitter } from '../../../../common/event-emitter'
import { wait } from '../../../../common/tools/asyn'
import { Resolution } from '../../../../data-core/models/arm/analysis/resolution.model'
import { Polygon } from '../../../../data-core/models/arm/polygon.model'
import { DeviceDropPortDetailsConverter as Converter } from '../../device-drop-port-details.converter'
import { DeviceDropPortDetailsCreater as Creater } from '../../device-drop-port-details.creater'
import { DeviceDropPortDetailsChartPolygonController } from './device-drop-port-details-chart-polygon.controller'
import { DeviceDropPortDetailsChartHtmlController } from './device-drop-port-details-chart.html.controller'

export interface DeviceDropPortDetailsChartEvent {
  polygon(polygon: Polygon): void
  clear(): void
}
export class DeviceDropPortDetailsChartController {
  event: EventEmitter<DeviceDropPortDetailsChartEvent> = new EventEmitter()

  constructor() {
    this.regist()
  }
  private html = new DeviceDropPortDetailsChartHtmlController()
  private ctx?: CanvasRenderingContext2D
  private size: Resolution = {
    Width: 0,
    Height: 0,
  }
  private current?: Polygon
  private data = Creater.Polygon()
  private polygon!: DeviceDropPortDetailsChartPolygonController
  private inited = false

  private regist() {
    this.html.event.on('init', (canvas) => {
      this.size.Width = canvas.width
      this.size.Height = canvas.height
      this.ctx = canvas.getContext('2d') as CanvasRenderingContext2D
      this.polygon = new DeviceDropPortDetailsChartPolygonController(this.ctx)
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
        this.current = Creater.Polygon()
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
        this.data = Creater.Polygon()
        for (let i = 0; i < this.current.Coordinates.length; i++) {
          const point = this.current.Coordinates[i]
          this.data.Coordinates.push({
            X: point.X / this.size.Width,
            Y: point.Y / this.size.Height,
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
    this.ctx.clearRect(0, 0, this.size.Width, this.size.Height)
    if (args) {
      if (args.data) {
        this.data = Creater.Polygon()
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
        for (let i = 0; i < polygon.Coordinates.length; i++) {
          const point = polygon.Coordinates[i]
          this.data.Coordinates.push({
            X: point.X * this.size.Width,
            Y: point.Y * this.size.Height,
          })
        }
        this.polygon.drawing(this.data)
      }
    )
  }

  get() {
    return Converter.polygon.from(this.size, this.data)
  }
}
