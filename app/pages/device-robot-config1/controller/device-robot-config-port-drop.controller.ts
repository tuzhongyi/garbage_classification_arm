import { EqualsTool, Position } from '../device-robot-config.model'
import { DeviceRobotConfigConverter } from './device-robot-config.converter'

export class RobotDropPortController {
  constructor() {}
  size = {
    width: 500,
    height: 500,
  }

  private points: Position[] = []

  private drawing() {
    let canvas = document.createElement('canvas')
    canvas.width = this.size.width
    canvas.height = this.size.height
    let ctx = canvas.getContext('2d') as CanvasRenderingContext2D
    ctx.lineWidth = 2
    ctx.strokeStyle = '#7f7f7f'
    ctx.fillStyle = '#ffd787'
    for (let i = 0; i < this.points.length; i++) {
      const point = this.points[i]
      this.create(ctx, point)
    }
    return canvas
  }

  private create(ctx: CanvasRenderingContext2D, position: Position, side = 22) {
    let point = DeviceRobotConfigConverter.position(position)
    ctx.moveTo(point.x - side / 2, point.y - side / 2)
    ctx.strokeRect(point.x - side / 2, point.y - side / 2, side, side)
    ctx.fillRect(point.x - side / 2, point.y - side / 2, side, side)

    ctx.stroke()
    ctx.fill()
  }

  private existed(point: Position) {
    let index = this.points.findIndex((x) => EqualsTool.position(x, point))
    return index >= 0
  }

  add(point: Position) {
    if (!this.existed(point)) {
      this.points.push(point)
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    let canvas = this.drawing()
    ctx.drawImage(canvas, 0, 0, this.size.width, this.size.height)
  }
}
