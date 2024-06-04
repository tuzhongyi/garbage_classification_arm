import { EventEmitter } from '../../common/event-emitter'
import { HtmlTool } from '../../common/tools/html-tool/html.tool'
import { PlatformProtocolVersion } from '../../data-core/enums/platform-protocol-version.enum'
import { Platform } from '../../data-core/models/arm/platform.model'
import { NetworkServerPlatformEvent } from './network-server-platform.event'

import './network-server-platform.less'

export class NetworkServerPlatformHtmlController {
  constructor() {
    this.regist()
  }

  element = {
    Enabled: document.getElementById('Enabled') as HTMLInputElement,
    ProtocolVersion: document.getElementById(
      'ProtocolVersion'
    ) as HTMLInputElement,
    HostAddress: document.getElementById('HostAddress') as HTMLInputElement,
    PortNo: document.getElementById('PortNo') as HTMLInputElement,
    DeviceId: document.getElementById('DeviceId') as HTMLInputElement,
    DeviceKey: document.getElementById('DeviceKey') as HTMLInputElement,
    Status: document.getElementById('Status') as HTMLInputElement,

    save: document.getElementById('save') as HTMLButtonElement,
    test: document.getElementById('test') as HTMLButtonElement,
  }
  event: EventEmitter<NetworkServerPlatformEvent> = new EventEmitter()

  private regist() {
    this.element.Enabled.addEventListener('change', () => {
      this.onenabledchange(this.element.Enabled.checked)
    })
    this.element.save.addEventListener('click', () => {
      this.event.emit('save')
    })
    this.element.test.addEventListener('click', () => {
      this.event.emit('test')
    })
    HtmlTool.input.number.mousewheelchangevalue(this.element.PortNo)
  }

  onenabledchange(enabled: boolean) {
    this.element.ProtocolVersion.disabled = !enabled
    this.element.HostAddress.disabled = !enabled
    this.element.PortNo.disabled = !enabled
    this.element.DeviceId.disabled = !enabled
    this.element.DeviceKey.disabled = !enabled
    this.element.test.disabled = !enabled
  }

  load(data: Platform) {
    this.element.Enabled.checked = data.Enabled
    this.element.ProtocolVersion.value = HtmlTool.set(data.ProtocolVersion)
    this.element.HostAddress.value = HtmlTool.set(data.HostAddress)
    this.element.PortNo.value = HtmlTool.set(data.PortNo)
    this.element.DeviceId.value = HtmlTool.set(data.DeviceId)
    this.element.DeviceKey.value = HtmlTool.set(data.DeviceKey)
    this.element.Status.value = data.Status === 0 ? '正常' : '离线'
    this.onenabledchange(data.Enabled)
  }

  get() {
    let data = new Platform()
    data.Enabled = this.element.Enabled.checked
    data.ProtocolVersion = HtmlTool.get(
      this.element.ProtocolVersion.value
    ) as PlatformProtocolVersion
    data.HostAddress = HtmlTool.get(this.element.HostAddress.value)
    data.PortNo = HtmlTool.get(this.element.PortNo.value, 'number')
    data.DeviceId = HtmlTool.get(this.element.DeviceId.value)
    data.DeviceKey = HtmlTool.get(this.element.DeviceKey.value)
    return data
  }

  equals(a: Platform, b: Platform) {
    return (
      a.Enabled == b.Enabled &&
      a.ProtocolVersion == b.ProtocolVersion &&
      a.HostAddress == b.HostAddress &&
      a.PortNo == b.PortNo &&
      a.DeviceId == b.DeviceId &&
      a.DeviceKey == b.DeviceKey
    )
  }
}
