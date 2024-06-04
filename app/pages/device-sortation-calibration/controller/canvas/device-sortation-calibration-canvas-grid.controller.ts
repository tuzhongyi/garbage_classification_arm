import { EventEmitter } from '../../../../common/event-emitter'
import { CanvasTool } from '../../../../common/tools/canvas-tool/canvas.tool'
import { SortationRotation } from '../../../../data-core/enums/sortation/sortation-rotation.enum'
import { Point } from '../../../../data-core/models/arm/point.model'
import { Rectangle } from '../../../../data-core/models/arm/rectangle.model'
import { Size } from '../../../../data-core/models/arm/size.model'
import { SortationGrid } from '../../../../data-core/models/sortation/sortation-grid.model'

import { DeviceSortationCalibrationCanvasRectangleController } from './device-sortation-calibration-canvas-rectangle.controller'
interface DeviceSortationCalibrationCanvasGridEvent {
  mouseover(data: SortationGrid): void
  mouseout(): void
}
export class DeviceSortationCalibrationCanvasGridController {
  event = new EventEmitter<DeviceSortationCalibrationCanvasGridEvent>()
  constructor() {
    this.regist()
    let ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D
    this.rectangle = new DeviceSortationCalibrationCanvasRectangleController(
      ctx
    )
  }

  private canvas = document.getElementById('canvas') as HTMLCanvasElement
  private rectangle: DeviceSortationCalibrationCanvasRectangleController
  private datas: SortationGrid[] = []
  private size = new Size()
  private rotation: string = SortationRotation.D0

  private overed?: SortationGrid

  private init() {}
  private regist() {
    this.canvas.addEventListener('mousemove', (e: MouseEvent) => {
      let data = this.datas.find((x) => {
        let point = new Point()
        point.X = e.offsetX
        point.Y = e.offsetY
        return CanvasTool.rectangle.isin(x.Area, point)
      })

      if (data) {
        if (this.overed != data) {
          this.overed = data
          this.event.emit('mouseover', data)
        }
      } else {
        this.overed = undefined
        this.event.emit('mouseout')
      }
    })
  }

  clear() {
    this.datas = []
  }

  reload(opts?: { rotation?: string; data?: SortationGrid }) {
    if (this.datas.length == 0) return
    if (opts && opts.rotation) {
      this.rotation = opts.rotation as SortationRotation
    }
    let border = new Rectangle()
    border.Width = 0
    border.Height = 0
    this.datas.forEach((item, index) => {
      this.rectangle.draw(
        item.Area,
        item.Row,
        item.Column,
        this.rotation,
        item == opts?.data ? item.Name : ''
      )
      if (item.Row == 1) {
        border.Width += item.Area.Width
      }
      if (item.Row == 1) {
        border.Height += item.Area.Height
      }
    })

    border.Left = Math.min(...this.datas.map((x) => x.Area.Left))
    border.Top = Math.min(...this.datas.map((x) => x.Area.Top))

    this.rectangle.border(border)
  }

  load(datas: SortationGrid[], size: Size, rotation: string) {
    this.size = size
    this.rotation = rotation
    this.datas = datas.map((x) => {
      let data = new SortationGrid()
      data.Column = x.Column
      data.Row = x.Row
      data.Name = x.Name
      data.Area = CanvasTool.rectangle.to.html(x.Area, this.size)
      return data
    })

    let border = new Rectangle()
    border.Width = 0
    border.Height = 0
    this.datas.forEach((item, index) => {
      this.rectangle.draw(item.Area, item.Row, item.Column, this.rotation)
      if (item.Row == 1) {
        border.Width += Math.abs(item.Area.Width)
      }
      if (item.Row == 1) {
        border.Height += Math.abs(item.Area.Height)
      }
    })

    border.Left = Math.min(...this.datas.map((x) => x.Area.Left))
    border.Top = Math.min(...this.datas.map((x) => x.Area.Top))

    this.rectangle.border(border)
    return border
  }
}
