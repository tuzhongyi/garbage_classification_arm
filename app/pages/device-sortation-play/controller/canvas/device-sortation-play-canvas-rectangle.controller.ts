import { ColorTool } from '../../../../common/tools/color/color.tool'
import { SortationRotation } from '../../../../data-core/enums/sortation/sortation-rotation.enum'
import { Point } from '../../../../data-core/models/arm/point.model'
import { Rectangle } from '../../../../data-core/models/arm/rectangle.model'

export class DeviceSortationPlayCanvasRectangleController {
  constructor(private ctx: CanvasRenderingContext2D) {}

  drawing(data: Rectangle, opts: { isnew?: boolean; current?: Point } = {}) {
    this.ctx.beginPath()
    this.ctx.lineWidth = 2
    this.ctx.lineJoin = 'round'
    this.ctx.lineCap = 'round'
    this.ctx.strokeStyle = ColorTool.canvas.stroke.normal
    this.ctx.fillStyle = ColorTool.canvas.fill.normal
    if (opts.isnew) {
      this.ctx.strokeStyle = ColorTool.canvas.stroke.drawing
      this.ctx.fillStyle = ColorTool.canvas.fill.drawing
    }
    this.ctx.moveTo(data.Left, data.Top)
    this.ctx.fillRect(data.Left, data.Top, data.Width, data.Height)
    this.ctx.strokeRect(data.Left, data.Top, data.Width, data.Height)
    this.ctx.closePath()
  }

  draw(
    area: Rectangle,
    row: number,
    column: number,
    rotation: string,
    name?: string,
    selected: boolean = false
  ) {
    this.ctx.beginPath()
    this.ctx.lineWidth = 2
    this.ctx.lineJoin = 'round'
    this.ctx.lineCap = 'round'

    let alpha = 0.2
    if (row % 2 === 0) {
      if (column % 2 == 0) {
        alpha = 0.4
      }
    } else {
      if (column % 2 == 1) {
        alpha = 0.4
      }
    }

    this.ctx.fillStyle = `rgba(0,255,0,${alpha})`

    if (selected) {
      this.ctx.fillStyle = ColorTool.canvas.fill.selected
    }

    this.ctx.moveTo(area.Left, area.Top)
    this.ctx.fillRect(area.Left, area.Top, area.Width, area.Height)
    this.ctx.closePath()

    if (name) {
      this.ctx.fillStyle = '#fff'
      this.ctx.strokeStyle = 'rgba(0,0,0, 0.4)'
      this.ctx.textAlign = 'center'
      this.ctx.textBaseline = 'middle'
      this.ctx.font = `${Math.min(area.Width, area.Height) * 0.5}px Arial bold`
      this.ctx.strokeText(
        name,
        area.Left + area.Width * 0.5,
        area.Top + area.Height * 0.5,
        area.Width
      )
      this.ctx.fillText(
        name,
        area.Left + area.Width * 0.5,
        area.Top + area.Height * 0.5,
        area.Width
      )
    }

    this.rotation(area, row, column, rotation)
  }

  rotation(area: Rectangle, row: number, column: number, rotation: string) {
    this.ctx.beginPath()

    this.ctx.fillStyle = '#fff'
    this.ctx.strokeStyle = 'rgba(0,0,0, 0.4)'
    this.ctx.font = `${Math.min(area.Width, area.Height) * 0.5}px Arial bold`
    this.ctx.textAlign = 'center'
    this.ctx.textBaseline = 'middle'
    let code = String.fromCharCode(64 + column)
    let num = String.fromCharCode(48 + row)
    switch (rotation) {
      case SortationRotation.D0:
        if (row === 1) {
          this.ctx.strokeText(
            code,
            area.Left + area.Width * 0.5,
            area.Top - area.Height * 0.5,
            area.Width
          )
          this.ctx.fillText(
            code,
            area.Left + area.Width * 0.5,
            area.Top - area.Height * 0.5,
            area.Width
          )
        }
        if (column === 1) {
          this.ctx.strokeText(
            num,
            area.Left - area.Width * 0.5,
            area.Top + area.Height * 0.5,
            area.Width
          )
          this.ctx.fillText(
            num,
            area.Left - area.Width * 0.5,
            area.Top + area.Height * 0.5,
            area.Width
          )
        }
        break
      case SortationRotation.D90:
        if (row === 1) {
          this.ctx.strokeText(
            code,
            area.Left + area.Width * 1.5,
            area.Top + area.Height * 0.5,
            area.Width
          )
          this.ctx.fillText(
            code,
            area.Left + area.Width * 1.5,
            area.Top + area.Height * 0.5,
            area.Width
          )
        }
        if (column === 1) {
          this.ctx.strokeText(
            num,
            area.Left + area.Width * 0.5,
            area.Top - area.Height * 0.5,
            area.Width
          )
          this.ctx.fillText(
            num,
            area.Left + area.Width * 0.5,
            area.Top - area.Height * 0.5,
            area.Width
          )
        }
        break
      case SortationRotation.D180:
        if (row === 1) {
          this.ctx.strokeText(
            code,
            area.Left + area.Width * 0.5,
            area.Top + area.Height * 1.5,
            area.Width
          )
          this.ctx.fillText(
            code,
            area.Left + area.Width * 0.5,
            area.Top + area.Height * 1.5,
            area.Width
          )
        }
        if (column === 1) {
          this.ctx.strokeText(
            num,
            area.Left + area.Width * 1.5,
            area.Top + area.Height * 0.5,
            area.Width
          )
          this.ctx.fillText(
            num,
            area.Left + area.Width * 1.5,
            area.Top + area.Height * 0.5,
            area.Width
          )
        }
        break

      case SortationRotation.D270:
        if (row === 1) {
          this.ctx.strokeText(
            code,
            area.Left - area.Width * 0.5,
            area.Top + area.Height * 0.5,
            area.Width
          )
          this.ctx.fillText(
            code,
            area.Left - area.Width * 0.5,
            area.Top + area.Height * 0.5,
            area.Width
          )
        }
        if (column === 1) {
          this.ctx.strokeText(
            num,
            area.Left + area.Width * 0.5,
            area.Top + area.Height * 1.5,
            area.Width
          )
          this.ctx.fillText(
            num,
            area.Left + area.Width * 0.5,
            area.Top + area.Height * 1.5,
            area.Width
          )
        }
        break

      default:
        break
    }
    this.ctx.closePath()
  }

  border(area: Rectangle) {
    this.ctx.beginPath()
    this.ctx.lineWidth = 2
    this.ctx.lineJoin = 'round'
    this.ctx.lineCap = 'round'
    this.ctx.strokeStyle = 'rgba(0,255,0, 0.4)'

    this.ctx.moveTo(area.Left, area.Top)
    this.ctx.strokeRect(area.Left, area.Top, area.Width, area.Height)
    this.ctx.closePath()
  }

  private cross(p1: Point, p2: Point, p: Point) {
    return (p2.X - p1.X) * (p.Y - p1.Y) - (p.X - p1.X) * (p2.Y - p1.Y)
  }
  //判断点p是否在p1p2p3p4的正方形内
  isin(area: Rectangle, p: Point) {
    let p1 = new Point()
    p1.X = area.Left
    p1.Y = area.Top
    let p2 = new Point()
    p2.X = area.Left + area.Width
    p2.Y = area.Top
    let p3 = new Point()
    p3.X = area.Left + area.Width
    p3.Y = area.Top + area.Height
    let p4 = new Point()
    p4.X = area.Left
    p4.Y = area.Top + area.Height
    let isPointIn =
      this.cross(p1, p2, p) * this.cross(p3, p4, p) >= 0 &&
      this.cross(p2, p3, p) * this.cross(p4, p1, p) >= 0
    return isPointIn
  }
}
