import { ColorTool } from '../../../../common/tools/color/color.tool'
import { Point } from '../../../../data-core/models/arm/point.model'
import { Polygon } from '../../../../data-core/models/arm/polygon.model'

export class AIEventRuleDetailsChartPolygonController {
  constructor(private ctx: CanvasRenderingContext2D) {}

  drawing(polygon: Polygon, opts: { isnew?: boolean; current?: Point } = {}) {
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
