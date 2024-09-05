import { HtmlTool } from '../../../common/tools/html-tool/html.tool'
import { DeviceInfo } from '../../../data-core/models/arm/device-info.model'
import { EventTrigger } from '../../../data-core/models/arm/event-trigger.model'

export class AIEventDeploymentTriggerController {
  constructor() {
    this.regist()
  }
  private data?: EventTrigger
  private element = {
    UploadCenter: document.getElementById('UploadCenter') as HTMLInputElement,
    Picture: document.getElementById('Picture') as HTMLInputElement,
    Audio: document.getElementById('Audio') as HTMLInputElement,
    AudioId: document.getElementById('AudioId') as HTMLInputElement,
    AlarmOut: {
      parent: document.getElementById('AlarmOut') as HTMLDivElement,
      list: [] as HTMLInputElement[],
    },
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
    HtmlTool.input.number.mousewheelchangevalue(
      this.element.AudioId,
      (value) => {
        if (this.data) {
          this.data.AudioId = value
        }
      }
    )
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

  private _init() {
    this.element.AlarmOut.list.forEach((item) => {
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

  private create(index: number) {
    let div = document.createElement('div')
    div.className = 'input-checkbox'
    let input = document.createElement('input')
    input.type = 'checkbox'
    input.name = 'AlarmOut'
    input.id = `AlarmOut_${index}`
    input.setAttribute('index', index.toString())

    let div_label = document.createElement('div')
    div_label.className = 'input-checkbox-text'
    let label = document.createElement('label')
    label.htmlFor = `AlarmOut_${index}`
    label.innerText = `继电器${index + 1}`
    div_label.appendChild(label)
    div.appendChild(div_label)
    div.appendChild(input)
    return div
  }

  init(device: DeviceInfo) {
    this.element.AlarmOut.parent.innerHTML = ''
    for (let i = 0; i < device.IOOutNumber; i++) {
      let div = this.create(i)
      this.element.AlarmOut.parent.appendChild(div)
      let input = div.querySelector('input') as HTMLInputElement
      this.element.AlarmOut.list.push(input)
    }
    this._init()
  }

  load(data: EventTrigger) {
    this.data = data
    this.element.UploadCenter.checked = data.UploadCenter

    this.element.Picture.checked = data.Picture
    this.element.Audio.checked = data.Audio
    this.audiochange(data.Audio)
    this.element.AudioId.value = HtmlTool.set(data.AudioId)
    this.element.AlarmOut.list.forEach((item) => {
      item.checked = false
    })
    if (data.AlarmOutIds) {
      for (let i = 0; i < data.AlarmOutIds.length; i++) {
        let id = data.AlarmOutIds[i]
        this.element.AlarmOut.list[id - 1].checked = true
      }
    }
  }
}
