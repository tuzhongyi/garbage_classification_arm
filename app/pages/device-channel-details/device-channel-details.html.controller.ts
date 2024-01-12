import { EventEmitter } from '../../common/event-emitter'
import { InputProxyChannel } from '../../data-core/models/arm/input-proxy-channel.model'

import '../window/window.less'
import { DeviceChannelDetailsEvent } from './device-channel-details.event'
import './device-channel-details.less'

export class DeviceChannelDetailsHtmlController {
  constructor() {
    this.init()
    this.regist()
  }

  event: EventEmitter<DeviceChannelDetailsEvent> = new EventEmitter()

  element = {
    Name: document.getElementById('Name') as HTMLInputElement,
    PositionNo: document.getElementById('PositionNo') as HTMLInputElement,
    HostAddress: document.getElementById('HostAddress') as HTMLInputElement,
    PortNo: document.getElementById('PortNo') as HTMLInputElement,
    ProtocolType: document.getElementById('ProtocolType') as HTMLSelectElement,
    ChannelNo: document.getElementById('ChannelNo') as HTMLInputElement,
    UserName: document.getElementById('UserName') as HTMLInputElement,
    Password: document.getElementById('Password') as HTMLInputElement,
    DeviceId: document.getElementById('DeviceId') as HTMLInputElement,
    SerialNumber: document.getElementById('SerialNumber') as HTMLInputElement,
    WebPortNo: document.getElementById('WebPortNo') as HTMLInputElement,
    DeviceModel: document.getElementById('DeviceModel') as HTMLSelectElement,
    buttons: {
      ok: document.getElementById('ok') as HTMLButtonElement,
      cancel: document.getElementById('cancel') as HTMLButtonElement,
    },
  }

  init() {}

  regist() {
    this.element.buttons.ok.addEventListener('click', () => {
      this.event.emit('ok')
    })
    this.element.buttons.cancel.addEventListener('click', () => {
      this.event.emit('cancel')
    })
  }

  load(data: InputProxyChannel) {
    this.element.Name.value = data.Name
    this.element.PositionNo.value = data.PositionNo?.toString() ?? ''
    this.element.HostAddress.value = data.SourceChannel.HostAddress
    this.element.PortNo.value = data.SourceChannel.PortNo.toString()
    this.element.ProtocolType.value = data.SourceChannel.ProtocolType
    this.element.ChannelNo.value = data.SourceChannel.ChannelNo.toString()
    this.element.UserName.value = data.SourceChannel.UserName ?? ''
    this.element.Password.value = data.SourceChannel.Password ?? ''
    this.element.DeviceId.value = data.SourceChannel.DeviceId ?? ''
    this.element.SerialNumber.value = data.SourceChannel.SerialNumber ?? ''
    this.element.WebPortNo.value =
      data.SourceChannel.WebPortNo?.toString() ?? ''
    this.element.DeviceModel.value = data.SourceChannel.DeviceModel ?? ''
  }
}
