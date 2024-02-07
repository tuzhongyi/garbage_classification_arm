import { HtmlTool } from '../../../common/tools/html-tool/html.tool'
import { EventTrigger } from '../../../data-core/models/arm/event-trigger.model'

export class AIEventDeploymentTriggerController {
  constructor() {
    this.init()
    this.regist()
  }
  private data?: EventTrigger
  private element = {
    UploadCenter: document.getElementById('UploadCenter') as HTMLInputElement,
    Picture: document.getElementById('Picture') as HTMLInputElement,
    Audio: document.getElementById('Audio') as HTMLInputElement,
    AudioId: document.getElementById('AudioId') as HTMLInputElement,
    AlarmOut: [] as HTMLInputElement[],
  }

  private regist() {
    this.element.Audio.addEventListener('change', () => {
      this.audiochange(this.element.Audio.checked)
    })
    this.element.UploadCenter.addEventListener('change', () => {
      if (this.data) {
        this.data.UploadCenter = this.element.UploadCenter.checked
      }
    })
    this.element.Picture.addEventListener('change', () => {
      if (this.data) {
        this.data.Picture = this.element.Picture.checked
      }
    })
    this.element.AudioId.addEventListener('input', () => {
      if (this.data) {
        this.data.AudioId = parseInt(this.element.AudioId.value)
      }
    })
  }

  audiochange(enabled: boolean) {
    this.element.AudioId.disabled = !enabled
    if (this.element.AudioId.disabled) {
      this.element.AudioId.value = ''
    } else if (this.data) {
      this.element.AudioId.value = this.data.AudioId?.toString() ?? '1'
    } else {
      this.element.AudioId.value = '1'
    }
    if (this.data) {
      this.data.Audio = enabled
    }
  }

  init() {
    let list = document.getElementsByName('AlarmOut')
    list.forEach((item) => {
      this.element.AlarmOut.push(item as HTMLInputElement)
      item.addEventListener('change', (e) => {
        let input = e.target as HTMLInputElement
        let id = parseInt(input.getAttribute('index') as string)
        if (this.data) {
          this.data.AlarmOutIds = this.data.AlarmOutIds ?? []
          let index = this.data.AlarmOutIds.indexOf(id)
          if (input.checked && index === -1) {
            this.data.AlarmOutIds.push(id)
          } else if (!input.checked && index >= 0) {
            this.data.AlarmOutIds.splice(index, 1)
          }
        }
      })
    })
  }

  load(data: EventTrigger) {
    this.data = data
    this.element.UploadCenter.checked = data.UploadCenter

    this.element.Picture.checked = data.Picture
    this.element.Audio.checked = data.Audio
    this.audiochange(data.Audio)
    this.element.AudioId.value = HtmlTool.set(data.AudioId)
    if (data.AlarmOutIds) {
      for (let i = 0; i < data.AlarmOutIds.length; i++) {
        let id = data.AlarmOutIds[i]
        this.element.AlarmOut[id].checked = true
      }
    }
  }
}
