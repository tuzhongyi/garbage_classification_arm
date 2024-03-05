import { EventEmitter } from '../../../event-emitter'
import { UploadControlEventArgs } from './upload-control.event'
import './upload-control.less'
import { FileReadType } from './upload-control.model'

export class UploadControl {
  private _accept?: string
  public get accept(): string | undefined {
    return this._accept
  }
  public set accept(v: string | undefined) {
    this._accept = v
    this.file.accept = v ?? ''
  }

  type: FileReadType = FileReadType.DataURL
  encoding?: string
  event: EventEmitter<UploadControlEventArgs> = new EventEmitter()

  constructor(
    private text: HTMLInputElement,
    private button: HTMLElement,
    private file: HTMLInputElement
  ) {
    this.regist()
  }

  private regist() {
    this.button.addEventListener('click', () => {
      this.file.click()
    })
    this.file.addEventListener('change', () => {
      this.fileChange()
    })
  }

  private fileChange() {
    if (this.file) {
      const t_files = this.file.files

      if (t_files && t_files.length > 0) {
        this.text.value = t_files[0].name
        this.uploadFile(t_files[0])
        this.file.value = ''
      }
    }
  }

  private async uploadFile(file: any) {
    var reader = new FileReader()
    switch (this.type) {
      case FileReadType.ArrayBuffer:
        reader.readAsArrayBuffer(file)
        break
      case FileReadType.BinaryString:
        reader.readAsBinaryString(file)
        break
      case FileReadType.DataURL:
        reader.readAsDataURL(file)
        break
      case FileReadType.Text:
        reader.readAsText(file, this.encoding)
        break

      default:
        break
    }

    reader.addEventListener('loadend', () => {
      this.event.emit('upload', reader.result)
    })
  }
}
