import { EventEmitter } from '../../../../common/event-emitter'
import { Resolution } from '../../../../data-core/models/arm/analysis/resolution.model'
import { Point } from '../../../../data-core/models/arm/point.model'
import { Polygon } from '../../../../data-core/models/arm/polygon.model'
import { DeviceChannelCalibrationConverter as Converter } from '../../device-channel-calibration.converter'
import { DeviceChannelCalibrationChartPointController } from './device-channel-calibration-chart-point.controller'
import { DeviceChannelCalibrationChartPolygonController } from './device-channel-calibration-chart-polygon.controller'
import { DeviceChannelCalibrationChartHtmlController } from './device-channel-calibration-chart.html.controller'
export interface DeviceChannelCalibrationChartEvent {
  createPoint(point: Point): void
  createPolygon(polygon: Polygon): void
  clear(): void
}
export class DeviceChannelCalibrationChartController {
  event: EventEmitter<DeviceChannelCalibrationChartEvent> = new EventEmitter()
  private selected: {
    point?: {
      point: Point
      text: string
    }
    polygon?: Polygon
  } = {}
  constructor() {
    this.regist()
    this.html.init()
  }
  private html = new DeviceChannelCalibrationChartHtmlController()
  private ctx?: CanvasRenderingContext2D
  private size = {
    width: 0,
    height: 0,
  }
  private current: {
    point?: Point
    polygon?: Polygon
  } = {}
  private data = {
    points: [] as Point[],
    polygons: [] as Polygon[],
    resolution: {
      Width: 0,
      Height: 0,
    } as Resolution,
  }
  private point!: DeviceChannelCalibrationChartPointController
  private polygon!: DeviceChannelCalibrationChartPolygonController

  private regist() {
    this.html.event.on('init', (canvas) => {
      this.size.width = canvas.width
      this.size.height = canvas.height
      this.ctx = canvas.getContext('2d') as CanvasRenderingContext2D
      this.point = new DeviceChannelCalibrationChartPointController(this.ctx)
      this.polygon = new DeviceChannelCalibrationChartPolygonController(
        this.ctx
      )
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
      this.event.emit('createPolygon', polygon)
    })
    this.html.event.on('buttonpoint', () => {
      this.clear({
        current: true,
      })
      this.reload()
    })
    this.html.event.on('buttonpolygon', () => {
      this.clear({
        current: true,
      })
      this.reload()
    })
    this.html.event.on('pointdrawing', (point) => {
      this.current.point = point
      this.reload()
      let point_1 = Converter.point.from(
        { Width: this.size.width, Height: this.size.height },
        this.current.point
      )
      let point_2 = Converter.point.to(this.data.resolution, point_1)
      this.point.drawing(this.current.point, `(${point_2.X}, ${point_2.Y})`)
    })
    this.html.event.on('pointover', () => {
      if (this.current.point) {
        let position = {
          X: this.current.point.X / this.size.width,
          Y: this.current.point.Y / this.size.height,
        }
        this.event.emit('createPoint', position)
        this.current.point = undefined
      }
    })
    this.html.event.on('polygondrawing', (point) => {
      if (!this.current.polygon) {
        this.current.polygon = new Polygon()
        this.current.polygon.Coordinates = []
      }
      this.current.polygon.Coordinates.push(point)
      this.reload()
      this.polygon.drawing(this.current.polygon, { isnew: true })
    })
    this.html.event.on('mousemove', (point) => {
      if (this.current.polygon && this.current.polygon.Coordinates.length > 0) {
        this.reload()
        this.polygon.drawing(this.current.polygon, {
          isnew: true,
          current: point,
        })
      }
    })
    this.html.event.on('polygonover', () => {
      if (this.current.polygon && this.current.polygon.Coordinates.length > 2) {
        let polygon = new Polygon()
        polygon.Coordinates = []
        for (let i = 0; i < this.current.polygon.Coordinates.length; i++) {
          const point = this.current.polygon.Coordinates[i]
          polygon.Coordinates.push({
            X: point.X / this.size.width,
            Y: point.Y / this.size.height,
          })
        }
        polygon.Coordinates.push(polygon.Coordinates[0])
        this.event.emit('createPolygon', polygon)
      } else {
        this.reload()
      }
      this.current.polygon = undefined
    })
  }

  clear(args?: { data?: boolean; current?: boolean }) {
    if (!this.ctx) return
    this.ctx.clearRect(0, 0, this.size.width, this.size.height)
    if (args) {
      if (args.data) {
        this.data.points = []
        this.data.polygons = []
        this.selected = {}
      }
      if (args.current) {
        this.current = {}
      }
    }
  }

  reload() {
    this.clear()
    this.point.load(this.data.points, this.selected.point)
    this.polygon.load(this.data.polygons, this.selected.polygon)
  }
  selectPoint(item?: { point: Point; text: string }) {
    if (item) {
      this.selected.polygon = undefined
      this.selected.point = {
        point: {
          X: item.point.X * this.size.width,
          Y: item.point.Y * this.size.height,
        },
        text: item.text,
      }
    } else {
      this.selected.point = item
    }
  }
  selectPolygon(polygon?: Polygon) {
    if (polygon) {
      this.selected.point = undefined
      this.selected.polygon = {
        Coordinates: polygon.Coordinates.map((point) => {
          return {
            X: point.X * this.size.width,
            Y: point.Y * this.size.height,
          }
        }),
      }
    } else {
      this.selected.polygon = polygon
    }
  }

  load(resolution: Resolution, polygons: Polygon[] = [], points: Point[] = []) {
    this.clear({ data: true })

    this.data.resolution = resolution

    this.data.points = points.map((point) => {
      return {
        X: point.X * this.size.width,
        Y: point.Y * this.size.height,
      }
    })
    this.point.load(this.data.points, this.selected.point)

    this.data.polygons = polygons.map((polygon) => {
      let _new = new Polygon()
      _new.Coordinates = []
      for (let i = 0; i < polygon.Coordinates.length; i++) {
        const point = polygon.Coordinates[i]
        _new.Coordinates.push({
          X: point.X * this.size.width,
          Y: point.Y * this.size.height,
        })
      }
      return _new
    })
    this.polygon.load(this.data.polygons, this.selected.polygon)
  }
}
