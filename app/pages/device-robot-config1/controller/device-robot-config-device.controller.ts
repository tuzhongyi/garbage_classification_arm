import { EventEmitter } from '../../../common/event-emitter'
import { Geometry } from '../../../common/geometry/geometry.tool'
import { Position, Size } from '../device-robot-config.model'
import { DeviceRobotConfigConverter } from './device-robot-config.converter'

export class RobotDeviceController {
  constructor(private img: HTMLImageElement) {}

  flag = true //小人是否在移动

  size: Size = {
    height: 20,
    width: 20,
  }

  position: Position = {
    x: 0,
    y: 0,
  }

  image = new Image()
  event: EventEmitter<ImageEvent> = new EventEmitter()

  private _degree: number = 0
  public get degree(): number {
    return this._degree
  }
  public set degree(v: number) {
    this._degree = v % 360
  }

  run(distance: number = 70) {
    let point = Geometry.point_degree_distance(
      {
        X: this.position.x,
        Y: this.position.y,
      },
      this.degree,
      distance
    )

    this.position.x = point.X
    this.position.y = point.Y
    return this.position
  }

  async drawing() {
    return new Promise<HTMLCanvasElement>((resolve) => {
      let canvas = document.createElement('canvas') as HTMLCanvasElement
      canvas.width = this.size.width * 1.5
      canvas.height = this.size.height * 1.5
      let ctx = canvas.getContext('2d') as CanvasRenderingContext2D
      ctx.translate(this.size.width / 2, this.size.height / 2)
      ctx.rotate((this.degree * Math.PI) / 180)
      // ctx.fillStyle = 'red'
      // ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.drawImage(
        this.img,
        -this.size.width / 2,
        -this.size.height / 2,
        this.size.width,
        this.size.height
      )
      resolve(canvas)
    })
  }

  async draw(ctx: CanvasRenderingContext2D) {
    this.drawing().then((canvas) => {
      let position = DeviceRobotConfigConverter.position({
        x: this.position.x - this.size.width / 2,
        y: this.position.y + this.size.height / 2,
      })
      ctx.drawImage(
        canvas,
        position.x,
        position.y,
        this.size.width * 1.5,
        this.size.height * 1.5
      )
    })
  }
}

interface ImageEvent {
  change: (ctx: CanvasRenderingContext2D) => void
}
