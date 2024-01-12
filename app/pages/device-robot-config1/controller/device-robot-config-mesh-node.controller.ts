import { EqualsTool, Position } from '../device-robot-config.model'
import { DeviceRobotConfigConverter } from './device-robot-config.converter'

export class RobotMeshNodeController {
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
    ctx.lineWidth = 1
    ctx.strokeStyle = '#7f7f7f'
    ctx.fillStyle = '#69adff'
    for (let i = 0; i < this.points.length; i++) {
      const point = this.points[i]
      this.create(ctx, point)
    }
    return canvas
  }

  private create(
    ctx: CanvasRenderingContext2D,
    position: Position,
    radius = 11
  ) {
    let point = DeviceRobotConfigConverter.position(position)
    ctx.moveTo(point.x, point.y)
    ctx.arc(point.x, point.y, radius, 0, 2 * Math.PI)
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
