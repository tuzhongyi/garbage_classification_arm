import { EventEmitter } from '../../../../common/event-emitter'
import { UploadControl } from '../../../../common/tools/controls/upload-control/upload-control'
import { FileReadType } from '../../../../common/tools/controls/upload-control/upload-control.model'

interface ConfigEvent {
  download(): void
  upload(file: ArrayBuffer): void
}

export class SystemMaintainConfigConfigHtmlController {
  event = new EventEmitter<ConfigEvent>()

  constructor() {
    this.init()
    this.regist()
  }

  private file?: ArrayBuffer
  private element = {
    upload: new UploadControl(
      document.getElementById('config_upload_text') as HTMLInputElement,
      document.getElementById('config_upload_button') as HTMLButtonElement,
      document.getElementById('config_upload_file') as HTMLInputElement
    ),
    input: document.getElementById('button_config_input') as HTMLButtonElement,
    output: document.getElementById(
      'button_config_output'
    ) as HTMLButtonElement,
  }
  private init() {
    this.element.upload.accept = '.zip'
    this.element.upload.type = FileReadType.ArrayBuffer
  }
  private regist() {
    this.element.output.addEventListener('click', () => {
      this.event.emit('download')
    })
    this.element.upload.event.on('upload', (args) => {
      this.file = args as ArrayBuffer
    })
    this.element.input.addEventListener('click', () => {
      if (this.file) {
        this.event.emit('upload', this.file)
      }
    })
  }
}
