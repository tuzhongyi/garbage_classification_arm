import { EventEmitter } from '../../../common/event-emitter'
import { SortationCalibration } from '../../../data-core/models/sortation/sortation-calibration.model'
import '../less/device-sortation-play.less'
import { DeviceSortationPlayCanvasController } from './canvas/device-sortation-play-canvas.controller'
import { DeviceSortationPlayControlController } from './controls/device-sortation-play-controls.controller'
import { DeviceSortationPlayHtmlEvent } from './device-sortation-play.html.event'
import { DeviceSortationPlayStatusController } from './status/device-sortation-play-status.controller'
export class DeviceSortationPlayHtmlController {
  control = new DeviceSortationPlayControlController()
  status = new DeviceSortationPlayStatusController()
  canvas = new DeviceSortationPlayCanvasController()
  event = new EventEmitter<DeviceSortationPlayHtmlEvent>()
  constructor() {
    this.regist()
  }
  private element = {
    picture: document.getElementById('picture') as HTMLImageElement,
    buttons: {
      refresh: document.getElementById('button_refresh') as HTMLButtonElement,
    },
  }

  private regist() {
    this.canvas.event.on('select', (grid) => {
      this.control.grid.select(grid)
    })
    this.element.buttons.refresh.addEventListener('click', () => {
      this.event.emit('picture')
    })
  }

  load(data: SortationCalibration) {}

  picture(data: string) {
    this.element.picture.src = data
  }
}
