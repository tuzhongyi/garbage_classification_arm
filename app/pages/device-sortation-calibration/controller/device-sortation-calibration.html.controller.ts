import { EventEmitter } from '../../../common/event-emitter'
import { HtmlTool } from '../../../common/tools/html-tool/html.tool'
import { SortationCalibration } from '../../../data-core/models/sortation/sortation-calibration.model'
import { DeviceSortationCalibrationSource } from '../device-sortation-calibration.model'
import '../less/device-sortation-calibration.less'
import { DeviceSortationCalibrationCanvasController } from './canvas/device-sortation-calibration-canvas.controller'
import { DeviceSortationCalibrationControlController } from './controls/device-sortation-calibration-controls.controller'
import { DeviceSortationCalibrationEvent } from './device-sortation-calibration.html.event'
import { DeviceSortationCalibrationInfoController } from './info/device-sortation-calibration-info.controller'
import { DeviceSortationCalibrationStatusController } from './status/device-sortation-calibration-status.controller'
export class DeviceSortationCalibrationHtmlController {
  event = new EventEmitter<DeviceSortationCalibrationEvent>()
  control = new DeviceSortationCalibrationControlController()
  status = new DeviceSortationCalibrationStatusController()
  info = new DeviceSortationCalibrationInfoController()
  canvas = new DeviceSortationCalibrationCanvasController()
  constructor() {
    this.regist()
  }
  private element = {
    select: {
      channel: document.getElementById('select_channel') as HTMLSelectElement,
    },
    Enabled: document.getElementById('Enabled') as HTMLInputElement,
    picture: document.getElementById('picture') as HTMLImageElement,
    save: document.getElementById('save') as HTMLButtonElement,
  }

  private regist() {
    this.element.select.channel.addEventListener('change', () => {
      this.event.emit('onchannel', this.element.select.channel.value)
    })
    this.canvas.event.on('draw', (data) => {
      this.event.emit('draw', data)
    })
    this.info.event.on('rotation', (value) => {
      this.event.emit('rotation', value)
    })
    this.element.save.addEventListener('click', () => {
      this.event.emit('save')
    })
  }

  init(data: DeviceSortationCalibrationSource) {
    data.channels.forEach((item) => {
      HtmlTool.select.append(
        {
          Id: `${item.Id}`,
          Name: item.Name,
        },
        this.element.select.channel
      )
    })
  }

  load(data?: SortationCalibration) {
    if (!data) {
      this.event.emit('onchannel', this.element.select.channel.value)
      return
    }
    this.element.select.channel.value = HtmlTool.set(data.ChannelId)
    this.event.emit('onchannel', this.element.select.channel.value)
    this.element.Enabled.checked = data.Enabled
    this.info.load(data)
  }

  picture(data: string) {
    this.element.picture.src = data
  }

  get(data: SortationCalibration) {
    data.ChannelId = HtmlTool.get(this.element.select.channel.value, 'number')
    data.ChannelName =
      this.element.select.channel.options[
        this.element.select.channel.selectedIndex
      ].innerText
    data.Enabled = this.element.Enabled.checked
    data = this.info.get(data)
    return data
  }
}
