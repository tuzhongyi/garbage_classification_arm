import { Point } from '../../../../data-core/models/arm/point.model'

export class DeviceChannelCalibrationChartPointController {
  constructor(private ctx: CanvasRenderingContext2D) {}

  private color = {
    border: {
      normal: '#0f0',
      drawing: '#ffff7d',
      selected: '#ff3232',
    },
    fill: {
      normal: 'rgba(0,150,0,0.3)',
      drawing: 'rgba(255,255,125,0.3)',
      selected: 'rgba(180,40,40,0.3)',
    },
  }

  drawing(point: Point) {
    this.ctx.beginPath()
    this.ctx.strokeStyle = this.color.border.drawing
    this.ctx.fillStyle = this.color.fill.drawing
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
      this.ctx.strokeStyle = this.color.border.normal
      this.ctx.fillStyle = this.color.fill.normal
      this.ctx.arc(point.X, point.Y, 5, 0, Math.PI * 2)
      this.ctx.fill()
      this.ctx.stroke()
      this.ctx.closePath()
    }
  }

  private drawselect(point: Point, text?: string) {
    this.ctx.beginPath()
    this.ctx.strokeStyle = this.color.border.selected
    this.ctx.fillStyle = this.color.fill.selected

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
