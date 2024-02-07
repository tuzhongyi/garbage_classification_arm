import { MessageBar } from '../../common/tools/controls/message-bar/message-bar'
import { AddressingType } from '../../data-core/enums/addressing-type.enum'
import { NetworkInterfaceDuplex } from '../../data-core/enums/network-interface-duplex.enum'
import { NetworkInterfaceSpeed } from '../../data-core/enums/network-interface-speed.enum'
import { IPAddress } from '../../data-core/models/arm/ip-address.model'
import { IPv4Address } from '../../data-core/models/arm/ip-v4-address.model'
import { NetworkInterface } from '../../data-core/models/arm/network-interface.model'
import { NetworkConfigTCPIPBusiness } from './network-config-tcp-ip.business'
import { NetworkConfigTCPIPHtmlController } from './network-config-tcp-ip.html.controller'

export namespace NetworkConfigTCPIP {
  class Controller {
    constructor() {
      this.regist()
      this.load()
    }
    html = new NetworkConfigTCPIPHtmlController()
    business = new NetworkConfigTCPIPBusiness()

    datas: NetworkInterface[] = []

    async load() {
      this.datas = await this.business.load()

      if (this.datas && this.datas.length > 0) {
        this.html.init(this.datas.length)
        this.html.load(this.datas[0])
      }
    }
    regist() {
      this.html.event.on('select', (index) => {
        this.html.load(this.datas[index])
      })
      this.html.event.on('save', (index) => {
        this.onsave(index)
      })
    }

    onsave(index: number) {
      if (this.datas && this.datas.length > index) {
        let data = this.datas[index]
        data.AutoNegotiation = this.html.element.AutoNegotiation.checked
        if (!data.AutoNegotiation) {
          data.Speed = this.html.element.Speed.value as NetworkInterfaceSpeed
          data.Duplex = this.html.element.Duplex.value as NetworkInterfaceDuplex
        }
        data.MTU = parseInt(this.html.element.MTU.value)
        if (!data.IPAddress) {
          data.IPAddress = new IPAddress()
        }
        data.IPAddress.AddressingType = this.html.element.IPAddress
          .AddressingType.checked
          ? AddressingType.Dynamic
          : AddressingType.Static
        if (!data.IPAddress.IPv4Address) {
          data.IPAddress.IPv4Address = new IPv4Address()
        }
        if (data.IPAddress.AddressingType === AddressingType.Static) {
          data.IPAddress.IPv4Address.Address =
            this.html.element.IPAddress.IPv4.IPAddress.value
          data.IPAddress.IPv4Address.SubnetMask =
            this.html.element.IPAddress.IPv4.SubnetMask.value
          data.IPAddress.IPv4Address.DefaultGateway =
            this.html.element.IPAddress.IPv4.Gateway.value
        } else {
          data.IPAddress.IPv4Address.PrimaryDNS =
            this.html.element.IPAddress.IPv4.PrimaryDNS.value
          data.IPAddress.IPv4Address.SecondaryDNS =
            this.html.element.IPAddress.IPv4.SecondaryDNS.value
        }
        this.business
          .update(data)
          .then((x) => {
            MessageBar.success('操作成功')
          })
          .catch((e) => {
            MessageBar.error('操作失败')
          })
      }
    }
  }

  const controller = new Controller()
}
