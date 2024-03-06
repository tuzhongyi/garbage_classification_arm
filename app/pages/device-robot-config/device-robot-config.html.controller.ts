import { EventEmitter } from '../../common/event-emitter'
import { UploadControl } from '../../common/tools/controls/upload-control/upload-control'
import { FileReadType } from '../../common/tools/controls/upload-control/upload-control.model'
import { DeviceRobotConfigEvent } from './device-robot-config.event'
import './device-robot-config.less'

export class DeviceRobotConfigHtmlController {
  event = new EventEmitter<DeviceRobotConfigEvent>()
  constructor() {
    this.init()
    this.regist()
  }

  private element = {
    config: {
      upload: new UploadControl(
        document.getElementById('config_upload_text') as HTMLInputElement,
        document.getElementById('config_upload_button') as HTMLButtonElement,
        document.getElementById('config_upload_file') as HTMLInputElement
      ),
      input: document.getElementById(
        'button_config_input'
      ) as HTMLButtonElement,
      output: document.getElementById(
        'button_config_output'
      ) as HTMLButtonElement,
    },
  }

  private file?: string

  private init() {
    this.element.config.upload.accept = '.json'
    this.element.config.upload.type = FileReadType.Text
  }

  private regist() {
    this.element.config.output.addEventListener('click', () => {
      this.event.emit('download')
    })
    this.element.config.upload.event.on('upload', (args) => {
      this.file = args as string
    })
    this.element.config.input.addEventListener('click', () => {
      if (this.file) {
        this.event.emit('upload', this.file)
      }
    })
  }
}
