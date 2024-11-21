import { EventEmitter } from '../../common/event-emitter'
import { HtmlTool } from '../../common/tools/html-tool/html.tool'
import { AddressingType } from '../../data-core/enums/addressing-type.enum'
import { IPAddress } from '../../data-core/models/arm/ip-address.model'
import { IPv4Address } from '../../data-core/models/arm/ip-v4-address.model'
import { DeviceCompactorNetworkEvent } from './device-compactor-network.event'

import './device-compactor-network.less'

export class DeviceCompactorNetworkHtmlController {
  constructor() {
    this.regist()
  }

  event: EventEmitter<DeviceCompactorNetworkEvent> = new EventEmitter()

  element = {
    AddressingType: document.getElementById(
      'AddressingType'
    ) as HTMLInputElement,
    IPv4: {
      IPAddress: document.getElementById('IPv4Address') as HTMLInputElement,
      SubnetMask: document.getElementById('IPv4SubnetMask') as HTMLInputElement,
      Gateway: document.getElementById(
        'IPv4DefaultGateway'
      ) as HTMLInputElement,
      PrimaryDNS: document.getElementById('PrimaryDNS') as HTMLInputElement,
      SecondaryDNS: document.getElementById('SecondaryDNS') as HTMLInputElement,
    },
    save: document.getElementById('save') as HTMLButtonElement,
  }

  private regist() {
    this.element.AddressingType.addEventListener(
      'change',
      this.ontypechange.bind(this)
    )
    this.element.save.addEventListener('click', () => {
      this.event.emit('save')
    })
  }

  private ontypechange() {
    this.element.IPv4.IPAddress.disabled = this.element.AddressingType.checked
    this.element.IPv4.SubnetMask.disabled = this.element.AddressingType.checked
    this.element.IPv4.Gateway.disabled = this.element.AddressingType.checked
  }

  load(data: IPAddress) {
    this.element.AddressingType.checked =
      data.AddressingType === AddressingType.Dynamic
    this.ontypechange()
    this.element.IPv4.IPAddress.value = data.IPv4Address.Address
    this.element.IPv4.SubnetMask.value = data.IPv4Address.SubnetMask
    this.element.IPv4.Gateway.value = data.IPv4Address.DefaultGateway
    this.element.IPv4.PrimaryDNS.value = data.IPv4Address.PrimaryDNS ?? ''
    this.element.IPv4.SecondaryDNS.value = data.IPv4Address.SecondaryDNS ?? ''
  }

  get(data: IPAddress) {
    data.AddressingType = this.element.AddressingType.checked
      ? AddressingType.Dynamic
      : AddressingType.Static
    if (!data.IPv4Address) {
      data.IPv4Address = new IPv4Address()
    }
    if (data.AddressingType === AddressingType.Static) {
      data.IPv4Address.Address = HtmlTool.get(this.element.IPv4.IPAddress.value)
      data.IPv4Address.SubnetMask = HtmlTool.get(
        this.element.IPv4.SubnetMask.value
      )
      data.IPv4Address.DefaultGateway = HtmlTool.get(
        this.element.IPv4.Gateway.value
      )
    }

    data.IPv4Address.PrimaryDNS = HtmlTool.get(
      this.element.IPv4.PrimaryDNS.value
    )
    data.IPv4Address.SecondaryDNS = HtmlTool.get(
      this.element.IPv4.SecondaryDNS.value
    )
    return data
  }
}
