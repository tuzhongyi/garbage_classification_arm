import { MessageBar } from '../../common/tools/controls/message-bar/message-bar'
import { LocationTool } from '../../common/tools/location.tool'
import { IPAddress } from '../../data-core/models/arm/ip-address.model'
import { DeviceCompactorNetworkBusiness } from './device-compactor-network.business'
import { DeviceCompactorNetworkHtmlController } from './device-compactor-network.html.controller'
import { DeviceCompactorNetworkMessage } from './device-compactor-network.message'
import { DeviceCompactorNetworkWindow } from './device-compactor-network.window'

export namespace DeviceCompactorNetwork {
  class Controller {
    constructor() {
      this.regist()
      this.load()
    }
    private html = new DeviceCompactorNetworkHtmlController()
    private message = new DeviceCompactorNetworkMessage()
    private business = new DeviceCompactorNetworkBusiness()
    private window = new DeviceCompactorNetworkWindow()
    get id() {
      let querys = LocationTool.query.decode(location.search)
      return querys.id
    }
    data?: IPAddress

    async load() {
      this.data = await this.business.load(this.id)

      this.html.load(this.data)
    }
    regist() {
      this.html.event.on('save', () => {
        this.window.confirm.message = '是否保存网络信息参数？'
        this.message.save_confirm(this.window.confirm)
      })
      this.message.event.on('save', () => {
        this.tosave()
      })
    }

    tosave() {
      if (this.data) {
        let data = this.html.get(this.data)
        this.business
          .update(this.id, data)
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
