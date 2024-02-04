import { Point } from '../../../../data-core/models/arm/point.model'
import { Polygon } from '../../../../data-core/models/arm/polygon.model'

export class AIEventRuleDetailsChartPolygonController {
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

  drawing(polygon: Polygon, opts: { isnew?: boolean; current?: Point } = {}) {
    this.ctx.beginPath()
    this.ctx.lineWidth = 2
    this.ctx.lineJoin = 'round'
    this.ctx.lineCap = 'round'
    this.ctx.strokeStyle = this.color.border.normal
    this.ctx.fillStyle = this.color.fill.normal
    if (opts.isnew) {
      this.ctx.strokeStyle = this.color.border.drawing
      this.ctx.fillStyle = this.color.fill.drawing
    }
    for (let i = 0; i < polygon.Coordinates.length; i++) {
      const point = polygon.Coordinates[i]
      if (i === 0) {
        this.ctx.moveTo(point.X, point.Y)
        continue
      }
      this.ctx.lineTo(point.X, point.Y)
    }
    if (opts.current) {
      this.ctx.lineTo(opts.current.X, opts.current.Y)
    }
    this.ctx.stroke()
    this.ctx.fill()
    this.ctx.closePath()
  }
}
