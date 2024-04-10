import { ColorTool } from '../../../common/tools/color/color.tool'
import { wait } from '../../../common/tools/wait'
import { EventDataObject } from '../../../data-core/models/arm/events/event-data-object.model'
import { EventRule } from '../../../data-core/models/arm/events/event-rule.model'
import { Point } from '../../../data-core/models/arm/point.model'

export class EventRecordResourcesCanvasController {
  constructor() {}
  private canvas = document.getElementById('canvas') as HTMLCanvasElement
  private ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D
  private size = {
    width: 0,
    height: 0,
  }

  init() {
    return new Promise<void>((resolve) => {
      let parent = this.canvas.parentElement as HTMLElement
      wait(
        () => {
          return !!(parent.clientWidth && parent.clientHeight)
        },
        () => {
          this.canvas.width = parent.clientWidth
          this.canvas.height = parent.clientHeight
          this.size.width = this.canvas.width
          this.size.height = this.canvas.height
          resolve()
        }
      )
    })
  }

  private drawing(points: Point[], color: string, text?: string) {
    this.ctx.beginPath()
    this.ctx.lineWidth = 2
    this.ctx.lineJoin = 'round'
    this.ctx.lineCap = 'round'
    this.ctx.strokeStyle = color

    for (let i = 0; i < points.length; i++) {
      const point = points[i]
      if (i === 0) {
        this.ctx.moveTo(point.X * this.size.width, point.Y * this.size.height)
        continue
      }
      this.ctx.lineTo(point.X * this.size.width, point.Y * this.size.height)
    }
    this.ctx.lineTo(
      points[0].X * this.size.width,
      points[0].Y * this.size.height
    )
    this.ctx.stroke()

    if (text) {
      this.ctx.beginPath()
      this.ctx.font = '16px Arial bold'
      this.ctx.fillStyle = color
      this.ctx.font
      this.ctx.textAlign = 'left'
      this.ctx.fillText(
        text,
        points[0].X * this.size.width,
        points[0].Y * this.size.height - 5
      )
      this.ctx.closePath()
    }

    this.ctx.closePath()
  }

  private loadObjects(datas: EventDataObject[]) {
    for (let i = 0; i < datas.length; i++) {
      const data = datas[i]
      this.drawing(
        data.Polygon,
        ColorTool.canvas.stroke.object,
        `${data.Id} ${data.Confidence}%`
      )
    }
  }
  private loadRules(datas: EventRule[]) {
    for (let i = 0; i < datas.length; i++) {
      const data = datas[i]
      if (data.Polygon) {
        this.drawing(data.Polygon, ColorTool.canvas.stroke.normal)
      }
    }
  }

  load(objects?: EventDataObject[], rules?: EventRule[]) {
    if (objects && objects.length > 0) {
      this.loadObjects(objects)
    }
    if (rules && rules.length > 0) {
      this.loadRules(rules)
    }
  }
}
