import { ColorTool } from '../../../../common/tools/color/color.tool'
import { Point } from '../../../../data-core/models/arm/point.model'

export class DeviceChannelCalibrationChartPointController {
  constructor(private ctx: CanvasRenderingContext2D) {}

  drawing(point: Point) {
    this.ctx.beginPath()
    this.ctx.strokeStyle = ColorTool.canvas.stroke.drawing
    this.ctx.fillStyle = ColorTool.canvas.fill.drawing
    this.ctx.arc(point.X, point.Y, 5, 0, Math.PI * 2)
    this.ctx.fill()
    this.ctx.stroke()
    this.ctx.closePath()
  }

  load(
    points: Point[],
    selected?: {
      point: Point
      text: string
    }
  ) {
    for (let i = 0; i < points.length; i++) {
      const point = points[i]
      if (selected && this.equals(selected.point, point)) {
        this.drawselect(selected.point, selected.text)
        continue
      }
      this.ctx.beginPath()
      this.ctx.strokeStyle = ColorTool.canvas.stroke.normal
      this.ctx.fillStyle = ColorTool.canvas.fill.normal
      this.ctx.arc(point.X, point.Y, 5, 0, Math.PI * 2)
      this.ctx.fill()
      this.ctx.stroke()
      this.ctx.closePath()
    }
  }

  private drawselect(point: Point, text?: string) {
    this.ctx.beginPath()
    this.ctx.strokeStyle = ColorTool.canvas.stroke.selected
    this.ctx.fillStyle = ColorTool.canvas.fill.selected

    this.ctx.arc(point.X, point.Y, 5, 0, Math.PI * 2)

    this.ctx.fill()
    this.ctx.stroke()
    this.ctx.closePath()

    if (text) {
      this.ctx.beginPath()
      this.ctx.font = '18px Arial'
      this.ctx.fillStyle = '#fff'
      this.ctx.textAlign = 'center'
      this.ctx.fillText(text, point.X, point.Y + 30)
      this.ctx.closePath()
    }
  }

  private equals(a: Point, b: Point) {
    return a.X === b.X && a.Y === b.Y
  }
}
