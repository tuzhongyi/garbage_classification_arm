import { EventEmitter } from '../../common/event-emitter'
import { AddressingType } from '../../data-core/enums/addressing-type.enum'
import { NetworkInterface } from '../../data-core/models/arm/network-interface.model'
import { NetworkConfigTCPIPEvent } from './network-config-tcp-ip.event'

import './network-config-tcp-ip.less'

export class NetworkConfigTCPIPHtmlController {
  constructor() {
    this.regist()
  }

  event: EventEmitter<NetworkConfigTCPIPEvent> = new EventEmitter()

  element = {
    Interface: document.getElementById('Interface') as HTMLSelectElement,
    AutoNegotiation: document.getElementById(
      'AutoNegotiation'
    ) as HTMLInputElement,
    Speed: document.getElementById('Speed') as HTMLSelectElement,
    Duplex: document.getElementById('Duplex') as HTMLSelectElement,
    MTU: document.getElementById('MTU') as HTMLInputElement,
    MACAddress: document.getElementById('MACAddress') as HTMLInputElement,
    IPAddress: {
      AddressingType: document.getElementById(
        'AddressingType'
      ) as HTMLInputElement,
      IPv4: {
        IPAddress: document.getElementById('IPv4Address') as HTMLInputElement,
        SubnetMask: document.getElementById(
          'IPv4SubnetMask'
        ) as HTMLInputElement,
        Gateway: document.getElementById(
          'IPv4DefaultGateway'
        ) as HTMLInputElement,
        PrimaryDNS: document.getElementById('PrimaryDNS') as HTMLInputElement,
        SecondaryDNS: document.getElementById(
          'SecondaryDNS'
        ) as HTMLInputElement,
      },
    },
    save: document.getElementById('save') as HTMLButtonElement,
  }

  regist() {
    this.element.Interface.addEventListener('change', () => {
      this.event.emit('select', parseInt(this.element.Interface.value))
    })
    this.element.AutoNegotiation.addEventListener(
      'change',
      this.onnegotiationchange.bind(this)
    )
    this.element.IPAddress.AddressingType.addEventListener(
      'change',
      this.ontypechange.bind(this)
    )
    this.element.save.addEventListener('click', () => {
      this.event.emit('save', parseInt(this.element.Interface.value))
    })
  }

  onnegotiationchange() {
    this.element.Speed.disabled = this.element.AutoNegotiation.checked
    this.element.Duplex.disabled = this.element.AutoNegotiation.checked
  }
  ontypechange() {
    this.element.IPAddress.IPv4.PrimaryDNS.disabled =
      !this.element.IPAddress.AddressingType.checked
    this.element.IPAddress.IPv4.SecondaryDNS.disabled =
      !this.element.IPAddress.AddressingType.checked

    this.element.IPAddress.IPv4.IPAddress.disabled =
      this.element.IPAddress.AddressingType.checked
    this.element.IPAddress.IPv4.SubnetMask.disabled =
      this.element.IPAddress.AddressingType.checked
    this.element.IPAddress.IPv4.Gateway.disabled =
      this.element.IPAddress.AddressingType.checked
  }

  appendInterface(index: number) {
    let option = document.createElement('option')
    option.value = index.toString()
    option.innerHTML = `网口${index + 1}`
    this.element.Interface.appendChild(option)
  }

  init(count: number = 0) {
    for (let i = 0; i < count; i++) {
      this.appendInterface(i)
    }
  }

  load(data: NetworkInterface) {
    this.element.AutoNegotiation.checked = data.AutoNegotiation
    this.onnegotiationchange()
    this.element.MTU.value = data.MTU.toString()
    this.element.MACAddress.value = data.MACAddress
    this.element.Duplex.value = data.Duplex ?? ''
    this.element.Speed.value = data.Speed ?? ''
    this.element.IPAddress.AddressingType.checked =
      data.IPAddress.AddressingType === AddressingType.Dynamic
    this.ontypechange()
    this.element.IPAddress.IPv4.IPAddress.value =
      data.IPAddress.IPv4Address.Address
    this.element.IPAddress.IPv4.SubnetMask.value =
      data.IPAddress.IPv4Address.SubnetMask
    this.element.IPAddress.IPv4.Gateway.value =
      data.IPAddress.IPv4Address.DefaultGateway
    this.element.IPAddress.IPv4.PrimaryDNS.value =
      data.IPAddress.IPv4Address.PrimaryDNS ?? ''
    this.element.IPAddress.IPv4.SecondaryDNS.value =
      data.IPAddress.IPv4Address.SecondaryDNS ?? ''
  }
}
