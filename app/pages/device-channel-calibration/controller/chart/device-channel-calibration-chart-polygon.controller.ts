import { Point } from '../../../../data-core/models/arm/point.model'
import { Polygon } from '../../../../data-core/models/arm/polygon.model'

export class DeviceChannelCalibrationChartPolygonController {
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

  drawing(
    polygon: Polygon,
    opts: { isnew?: boolean; current?: Point; selected?: boolean } = {}
  ) {
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
    if (opts.selected) {
      this.ctx.strokeStyle = this.color.border.selected
      this.ctx.fillStyle = this.color.fill.selected
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

  load(polygons: Polygon[], selected?: Polygon) {
    for (let i = 0; i < polygons.length; i++) {
      if (selected && this.equals(selected, polygons[i])) {
        this.drawing(polygons[i], { selected: true })
        continue
      }
      this.drawing(polygons[i])
    }
  }

  equals(a: Polygon, b: Polygon) {
    if (a.Coordinates.length !== b.Coordinates.length) return false
    return a.Coordinates.every(
      (v, i) => v.X === b.Coordinates[i].X && v.Y === b.Coordinates[i].Y
    )
  }
}
