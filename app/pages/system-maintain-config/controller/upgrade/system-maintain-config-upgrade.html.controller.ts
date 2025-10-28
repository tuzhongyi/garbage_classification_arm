import { EventEmitter } from '../../../../common/event-emitter'
import { UploadControl } from '../../../../common/tools/controls/upload-control/upload-control'
import { FileReadType } from '../../../../common/tools/controls/upload-control/upload-control.model'

interface UpgradeEvent {
  upload(file: ArrayBuffer): void
}

export class SystemMaintainConfigUpgradeHtmlController {
  event = new EventEmitter<UpgradeEvent>()

  constructor() {
    this.init()
    this.regist()
  }

  private file?: ArrayBuffer
  private element = {
    upload: new UploadControl(
      document.getElementById('upgrade_text') as HTMLInputElement,
      document.getElementById('upgrade_button') as HTMLButtonElement,
      document.getElementById('upgrade_file') as HTMLInputElement
    ),
    input: document.getElementById('button_upgrade_input') as HTMLButtonElement,
    progress: {
      container: document.getElementById('upgrade_progress') as HTMLDivElement,
      content: document.getElementById(
        'upgrade_progress_content'
      ) as HTMLDivElement,
      text: document.getElementById('upgrade_progress_text') as HTMLDivElement,
    },
  }
  private init() {
    this.element.upload.accept = '.deb||.zip'
    this.element.upload.type = FileReadType.ArrayBuffer
    this.element.progress.content.style.width = '0%'
  }
  private regist() {
    this.element.upload.event.on('upload', (args) => {
      this.file = args as ArrayBuffer
    })
    this.element.input.addEventListener('click', () => {
      if (this.file) {
        this.event.emit('upload', this.file)
      }
    })
  }

  set = {
    progress: (value: number) => {
      if (value < 0) {
        value = 0
      }
      if (value > 100) {
        value = 100
      }
      this.element.progress.content.style.width = value + '%'
      this.element.progress.text.innerText = value + '%'
    },
  }
}
