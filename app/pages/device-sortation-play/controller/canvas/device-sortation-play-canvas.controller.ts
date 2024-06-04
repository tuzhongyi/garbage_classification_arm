import { EventEmitter } from '../../../../common/event-emitter'
import { CanvasTool } from '../../../../common/tools/canvas-tool/canvas.tool'
import { wait } from '../../../../common/tools/wait'
import { Resolution } from '../../../../data-core/models/arm/analysis/resolution.model'
import { Rectangle } from '../../../../data-core/models/arm/rectangle.model'
import { SortationGrid } from '../../../../data-core/models/sortation/sortation-grid.model'
import { DeviceSortationPlayCanvasGridController } from './device-sortation-play-canvas-grid.controller'
import { DeviceSortationPlayCanvasRectangleController } from './device-sortation-play-canvas-rectangle.controller'

export interface DeviceSortationPlayCanvasEvent {
  select(grid: SortationGrid): void
}
export class DeviceSortationPlayCanvasController {
  event: EventEmitter<DeviceSortationPlayCanvasEvent> = new EventEmitter()

  constructor() {
    this.regist()
  }

  private ctx?: CanvasRenderingContext2D
  private size: Resolution = {
    Width: 0,
    Height: 0,
  }
  private current?: Rectangle
  private data?: Rectangle
  private rectangle!: DeviceSortationPlayCanvasRectangleController
  private inited = false
  private drawing = false
  private grid = new DeviceSortationPlayCanvasGridController()

  private regist() {
    this.grid.event.on('init', (canvas) => {
      this.size.Width = canvas.width
      this.size.Height = canvas.height
      this.ctx = canvas.getContext('2d') as CanvasRenderingContext2D
      this.rectangle = new DeviceSortationPlayCanvasRectangleController(
        this.ctx
      )
      this.inited = true
    })

    this.grid.event.on('mouseover', (data) => {
      if (this.drawing) return
      this.clear()
      this.grid.reload({ over: data })
    })
    this.grid.event.on('mouseout', () => {
      if (this.drawing) return
      this.clear()
      this.grid.reload()
    })
    this.grid.event.on('select', (data) => {
      this.event.emit('select', data)
      this.clear()
      this.grid.reload({ over: data, selected: data })
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
