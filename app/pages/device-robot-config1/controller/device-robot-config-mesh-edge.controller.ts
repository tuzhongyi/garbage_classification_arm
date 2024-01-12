import { EqualsTool, Line } from '../device-robot-config.model'
import { DeviceRobotConfigConverter } from './device-robot-config.converter'

export class RobotMeshEdgeController {
  private lines: Line[] = []

  size = {
    width: 500,
    height: 500,
  }

  private drawing() {
    let canvas = document.createElement('canvas')
    canvas.width = this.size.width
    canvas.height = this.size.height
    let ctx = canvas.getContext('2d') as CanvasRenderingContext2D
    ctx.strokeStyle = 'red'
    ctx.lineWidth = 2
    for (let i = 0; i < this.lines.length; i++) {
      const line = this.lines[i]
      let begin = DeviceRobotConfigConverter.position(line.begin)
      let end = DeviceRobotConfigConverter.position(line.end)
      ctx.moveTo(begin.x, begin.y)
      ctx.lineTo(end.x, end.y)

      ctx.stroke()
    }
    return canvas
  }

  existed(line: Line) {
    let index = this.lines.findIndex((x) => EqualsTool.line(x, line))
    return index >= 0
  }

  add(line: Line) {
    if (!this.existed(line)) {
      this.lines.push(line)
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    let canvas = this.drawing()
    ctx.drawImage(canvas, 0, 0, this.size.width, this.size.height)
  }
}
