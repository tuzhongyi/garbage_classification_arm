import { EventEmitter } from '../../../../common/event-emitter'
import { CanvasTool } from '../../../../common/tools/canvas-tool/canvas.tool'
import { wait } from '../../../../common/tools/wait'
import { Resolution } from '../../../../data-core/models/arm/analysis/resolution.model'
import { Rectangle } from '../../../../data-core/models/arm/rectangle.model'
import { SortationGrid } from '../../../../data-core/models/sortation/sortation-grid.model'
import { DeviceSortationCalibrationCanvasGridController } from './device-sortation-calibration-canvas-grid.controller'
import { DeviceSortationCalibrationCanvasHtmlController } from './device-sortation-calibration-canvas-html.controller'
import { DeviceSortationCalibrationCanvasRectangleController } from './device-sortation-calibration-canvas-rectangle.controller'

export interface DeviceSortationCalibrationCanvasEvent {
  draw(polygon: Rectangle): void
  clear(): void
}
export class DeviceSortationCalibrationCanvasController {
  event: EventEmitter<DeviceSortationCalibrationCanvasEvent> =
    new EventEmitter()

  constructor() {
    this.regist()
  }
  private html = new DeviceSortationCalibrationCanvasHtmlController()
  private ctx?: CanvasRenderingContext2D
  private size: Resolution = {
    Width: 0,
    Height: 0,
  }
  private current?: Rectangle
  private data?: Rectangle
  private rectangle!: DeviceSortationCalibrationCanvasRectangleController
  private inited = false
  private drawing = false
  private grid = new DeviceSortationCalibrationCanvasGridController()

  private regist() {
    this.html.event.on('init', (canvas) => {
      this.size.Width = canvas.width
      this.size.Height = canvas.height
      this.ctx = canvas.getContext('2d') as CanvasRenderingContext2D
      this.rectangle = new DeviceSortationCalibrationCanvasRectangleController(
        this.ctx
      )
      this.inited = true
    })
    this.html.event.on('buttonclear', () => {
      this.clear({
        data: true,
        current: true,
      })
      this.event.emit('clear')
    })

    this.html.event.on('start', (point) => {
      this.clear({
        data: true,
        current: true,
      })
      this.current = new Rectangle()
      this.current.Left = point.X
      this.current.Top = point.Y
      this.drawing = true
    })
    this.html.event.on('end', (point) => {
      this.drawing = false
      if (!this.current) {
        return
      }
      let data = new Rectangle()
      data.Left = Math.min(this.current.Left, point.X)
      data.Top = Math.min(this.current.Top, point.Y)
      data.Width = Math.abs(point.X - this.current.Left)
      data.Height = Math.abs(point.Y - this.current.Top)

      this.clear()
      this.data = CanvasTool.rectangle.from.html(data, this.size)
      this.event.emit('draw', this.data)
    })
    this.html.event.on('mousemove', (point) => {
      if (!this.current) {
        return
      }
      this.clear()
      this.current.Width = point.X - this.current.Left
      this.current.Height = point.Y - this.current.Top
      this.rectangle.drawing(this.current, { isnew: true })
    })
    this.html.event.on('cancel', () => {
      this.clear({ current: true })
    })
    this.grid.event.on('mouseover', (data) => {
      if (this.drawing) return
      this.clear()
      this.grid.reload({ data: data })
    })
    this.grid.event.on('mouseout', () => {
      if (this.drawing) return
      this.clear()
      this.grid.reload()
    })
  }

  clear(args?: { data?: boolean; current?: boolean }) {
    if (!this.ctx) return
    this.ctx.clearRect(0, 0, this.size.Width, this.size.Height)

    if (args) {
      if (args.data) {
        this.data = new Rectangle()
        this.grid.clear()
      }
      if (args.current) {
        this.current = undefined
      }
    }
  }

  reload(rotation: string) {
    this.clear()
    this.grid.reload({ rotation: rotation })
  }

  load(datas: SortationGrid[], rotation: string) {
    wait(
      () => {
        return this.inited
      },
      () => {
        this.clear({ data: true })

        let data = this.grid.load(datas, this.size, rotation)
        this.data = CanvasTool.rectangle.from.html(data, this.size)
      }
    )
  }

  get() {
    return this.data
  }
}
