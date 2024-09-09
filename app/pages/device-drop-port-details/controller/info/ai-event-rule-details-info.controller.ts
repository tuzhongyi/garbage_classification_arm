import { EventEmitter } from '../../../../common/event-emitter'
import { HtmlTool } from '../../../../common/tools/html-tool/html.tool'
import { IOState } from '../../../../data-core/enums/io/io-state.enum'
import { CanType } from '../../../../data-core/enums/robot/robot-can-type.model'
import { InputProxyChannel } from '../../../../data-core/models/arm/input-proxy-channel.model'
import { DropPortConfig } from '../../../../data-core/models/arm/io/drop-port-config.model'
import { IOOutputPort } from '../../../../data-core/models/arm/io/io-output-port.model'
import { Manager } from '../../../../data-core/requests/managers/manager'
import { DeviceDropPortDetailsInfoEvent } from '../../device-drop-port-details.event'

export class DeviceDropPortDetailsInfoController {
  event = new EventEmitter<DeviceDropPortDetailsInfoEvent>()
  constructor() {
    this.regist()
    this._init()
  }
  private element = {
    Name: document.getElementById('Name') as HTMLInputElement,
    AlarmOutEnabled: document.getElementById(
      'AlarmOutEnabled'
    ) as HTMLInputElement,
    DefaultIOState: document.getElementById(
      'DefaultIOState'
    ) as HTMLSelectElement,
    FullIOState: document.getElementById('FullIOState') as HTMLSelectElement,
    DropPortType: document.getElementById('DropPortType') as HTMLSelectElement,
    channel: {
      parent: document.getElementById('channel_parent') as HTMLDivElement,
      control: document.getElementById('channel') as HTMLSelectElement,
    },
    AlarmOutIds: {
      div: document.getElementById('AlarmOutIds') as HTMLDivElement,
      items: [] as HTMLInputElement[],
    },
    FullTrashCanPortStates: {
      div: document.getElementById('FullTrashCanPortStates') as HTMLDivElement,
      items: [] as HTMLInputElement[],
    },
  }

  private _init() {
    Manager.capability.device.then((capability) => {
      if (capability.IOStates) {
        this.element.DefaultIOState.innerHTML = ''
        this.element.FullIOState.innerHTML = ''
        capability.IOStates.forEach((x) => {
          let item = { Id: x.Value, Name: x.Name }
          HtmlTool.select.append(item, this.element.DefaultIOState)
          HtmlTool.select.append(item, this.element.FullIOState)
        })
      }
      if (capability.DropPortTypes) {
        this.element.DropPortType.innerHTML = ''
        capability.DropPortTypes.forEach((x) => {
          let item = { Id: x.Value, Name: x.Name }
          HtmlTool.select.append(item, this.element.DropPortType)
        })
      }
      if (capability.TrashCanPortStates) {
        this.element.FullTrashCanPortStates.div.innerHTML = ''
        let states = capability.TrashCanPortStates.sort((a, b) => {
          return a.Name.length - b.Name.length
        })
        states.forEach((x) => {
          if (x.Value === 'Unknown') return
          let div = document.createElement('div')
          this.element.FullTrashCanPortStates.div.appendChild(div)
          let checkbox = HtmlTool.input.checkbox.append(
            `FullTrashCanPortStates_${x.Value}`,
            x.Name,
            false,
            div
          )
          checkbox.addEventListener('change', (e) => {
            let control = e.currentTarget as HTMLInputElement
            let id = parseInt(control.id.split('_')[1])
          })
          this.element.FullTrashCanPortStates.items.push(checkbox)
        })
      }
    })
  }

  private regist() {
    this.element.channel.control.addEventListener('change', (e) => {
      let control = e.currentTarget as HTMLSelectElement
      let id = control.value
      this.event.emit('channel', id)
    })
  }

  private initchannels(channels: InputProxyChannel[]) {
    this.element.channel.control.innerHTML = ''
    channels.forEach((x) => {
      HtmlTool.select.append(x, this.element.channel.control)
    })
  }
  private initoutputs(outputs: IOOutputPort[]) {
    outputs.forEach((x) => {
      let div = document.createElement('div')
      this.element.AlarmOutIds.div.appendChild(div)

      let checkbox = HtmlTool.input.checkbox.append(
        `output_${x.Id}`,
        x.Name ?? `继电器${x.Id}`,
        false,
        div
      )
      checkbox.addEventListener('change', (e) => {
        let control = e.currentTarget as HTMLInputElement
        let id = parseInt(control.id.split('_')[1])
      })
      this.element.AlarmOutIds.items.push(checkbox)
    })
  }

  init(channels: InputProxyChannel[], outputs: IOOutputPort[]) {
    this.initchannels(channels)
    this.initoutputs(outputs)
  }

  channel() {
    return this.element.channel.control.value
  }

  load(data: DropPortConfig) {
    this.element.Name.value = HtmlTool.set(data.Name)
    this.element.AlarmOutEnabled.checked = data.AlarmOutEnabled
    this.element.DefaultIOState.value = data.DefaultIOState
    this.element.FullIOState.value = data.FullIOState
    this.element.DropPortType.value = data.DropPortType
    this.element.channel.control.value = HtmlTool.set(data.ChannelId)
    this.event.emit('channel', data.ChannelId)
    if (data.AlarmOutIds) {
      data.AlarmOutIds.forEach((id) => {
        let control = document.getElementById(
          `output_${id}`
        ) as HTMLInputElement
        if (control) {
          control.checked = true
        }
      })
    }
    if (data.FullTrashCanPortStates) {
      data.FullTrashCanPortStates.forEach((id) => {
        let control = document.getElementById(
          `FullTrashCanPortStates_${id}`
        ) as HTMLInputElement
        if (control) {
          control.checked = true
        }
      })
    }
  }

  get(data?: DropPortConfig) {
    let result = data ?? new DropPortConfig()

    result.Name = HtmlTool.get(this.element.Name.value)
    result.AlarmOutEnabled = this.element.AlarmOutEnabled.checked

    result.FullIOState = HtmlTool.get(this.element.FullIOState.value) as IOState
    result.DefaultIOState = HtmlTool.get(
      this.element.DefaultIOState.value
    ) as IOState
    result.DropPortType = HtmlTool.get(
      this.element.DropPortType.value
    ) as CanType
    result.ChannelId = HtmlTool.get(
      this.element.channel.control.value,
      'number'
    )

    result.AlarmOutIds = this.element.AlarmOutIds.items
      .filter((x) => x.checked)
      .map((x) => parseInt(x.id.split('_')[1]))

    result.FullTrashCanPortStates = this.element.FullTrashCanPortStates.items
      .filter((x) => x.checked)
      .map((x) => x.id.split('_')[1])

    return result
  }
}
