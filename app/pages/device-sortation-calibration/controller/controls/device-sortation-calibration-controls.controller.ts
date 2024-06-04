import { EventEmitter } from '../../../../common/event-emitter'
import { SortationRotation } from '../../../../data-core/enums/sortation/sortation-rotation.enum'
import { DeviceSortationCalibrationControlEvent } from './device-sortation-calibration-controls.event'

export class DeviceSortationCalibrationControlController {
  event = new EventEmitter<DeviceSortationCalibrationControlEvent>()
  constructor() {
    this.regist()
  }
  private rotation = SortationRotation.D0
  private element = {
    direction: {
      top: document.getElementById('btn_top') as HTMLButtonElement,
      bottom: document.getElementById('btn_bottom') as HTMLButtonElement,
      left: document.getElementById('btn_left') as HTMLButtonElement,
      right: document.getElementById('btn_right') as HTMLButtonElement,
    },
    code: {
      top: document.getElementById('btn_top_code') as HTMLSpanElement,
      bottom: document.getElementById('btn_bottom_code') as HTMLSpanElement,
      left: document.getElementById('btn_left_code') as HTMLSpanElement,
      right: document.getElementById('btn_right_code') as HTMLSpanElement,
    },
    operation: {
      up: document.getElementById('btn_up') as HTMLButtonElement,
      down: document.getElementById('btn_down') as HTMLButtonElement,
      stop: document.getElementById('btn_stop') as HTMLButtonElement,
    },
    command: document.getElementById('command') as HTMLSelectElement,
    calibrate: document.getElementById('calibrate') as HTMLButtonElement,
  }

  private regist() {
    this.element.calibrate.addEventListener('click', () => {
      this.event.emit('calibrate', this.element.command.value)
    })
    this.element.direction.top.addEventListener('mousedown', () => {
      switch (this.rotation) {
        case SortationRotation.D0:
          this.event.emit('move8to1')
          break
        case SortationRotation.D90:
          this.event.emit('moveh2a')
          break
        case SortationRotation.D180:
          this.event.emit('move1to8')
          break
        case SortationRotation.D270:
          this.event.emit('movea2h')
          break
        default:
          break
      }
    })

    this.element.direction.bottom.addEventListener('mousedown', () => {
      switch (this.rotation) {
        case SortationRotation.D0:
          this.event.emit('move1to8')
          break
        case SortationRotation.D90:
          this.event.emit('movea2h')
          break
        case SortationRotation.D180:
          this.event.emit('move8to1')
          break
        case SortationRotation.D270:
          this.event.emit('moveh2a')
          break
        default:
          break
      }
    })
    this.element.direction.left.addEventListener('mousedown', () => {
      switch (this.rotation) {
        case SortationRotation.D0:
          this.event.emit('moveh2a')
          break
        case SortationRotation.D90:
          this.event.emit('move1to8')
          break
        case SortationRotation.D180:
          this.event.emit('movea2h')
          break
        case SortationRotation.D270:
          this.event.emit('move8to1')
          break
        default:
          break
      }
    })
    this.element.direction.right.addEventListener('mousedown', () => {
      switch (this.rotation) {
        case SortationRotation.D0:
          this.event.emit('movea2h')
          break
        case SortationRotation.D90:
          this.event.emit('move8to1')
          break
        case SortationRotation.D180:
          this.event.emit('moveh2a')
          break
        case SortationRotation.D270:
          this.event.emit('move1to8')
          break
        default:
          break
      }
    })
    this.element.operation.up.addEventListener('mousedown', () => {
      this.event.emit('up')
    })
    this.element.operation.down.addEventListener('mousedown', () => {
      this.event.emit('down')
    })

    this.element.direction.top.addEventListener('mouseup', () => {
      this.event.emit('stop')
    })
    this.element.direction.bottom.addEventListener('mouseup', () => {
      this.event.emit('stop')
    })
    this.element.direction.left.addEventListener('mouseup', () => {
      this.event.emit('stop')
    })
    this.element.direction.right.addEventListener('mouseup', () => {
      this.event.emit('stop')
    })
    this.element.operation.up.addEventListener('mouseup', () => {
      this.event.emit('stop')
    })
    this.element.operation.down.addEventListener('mouseup', () => {
      this.event.emit('stop')
    })
    this.element.operation.stop.addEventListener('click', () => {
      this.event.emit('stop')
    })
  }

  load(rotation: string) {
    this.rotation = rotation as SortationRotation
    switch (rotation) {
      case SortationRotation.D0:
        this.element.code.top.innerHTML = '1'
        this.element.code.bottom.innerHTML = '8'
        this.element.code.left.innerHTML = 'A'
        this.element.code.right.innerHTML = 'H'
        break
      case SortationRotation.D90:
        this.element.code.top.innerHTML = 'A'
        this.element.code.bottom.innerHTML = 'H'
        this.element.code.left.innerHTML = '8'
        this.element.code.right.innerHTML = '1'
        break
      case SortationRotation.D180:
        this.element.code.top.innerHTML = '8'
        this.element.code.bottom.innerHTML = '1'
        this.element.code.left.innerHTML = 'H'
        this.element.code.right.innerHTML = 'A'
        break
      case SortationRotation.D270:
        this.element.code.top.innerHTML = 'H'
        this.element.code.bottom.innerHTML = 'A'
        this.element.code.left.innerHTML = '1'
        this.element.code.right.innerHTML = '8'
        break
      default:
        break
    }
  }
}
