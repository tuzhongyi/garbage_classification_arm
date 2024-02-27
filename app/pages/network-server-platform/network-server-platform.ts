import { MessageBar } from '../../common/tools/controls/message-bar/message-bar'
import { NetworkServerPlatformBusiness } from './network-server-platform.business'
import { NetworkServerPlatformHtmlController } from './network-server-platform.html.controller'

export namespace NetworkServerPlatform {
  class Controller {
    constructor() {
      this.regist()
      this.load()
    }
    html = new NetworkServerPlatformHtmlController()
    business = new NetworkServerPlatformBusiness()

    async load() {
      let data = await this.business.load()
      this.html.load(data)
    }

    regist() {
      this.html.event.on('save', this.onsave.bind(this))
      this.html.event.on('test', this.ontest.bind(this))
    }

    ontest() {
      this.business
        .test()
        .then((x) => {
          if (x) {
            MessageBar.success('测试成功')
          } else {
            MessageBar.error('测试失败')
          }
        })
        .catch((e) => {
          MessageBar.error('测试失败')
        })
    }

    onsave() {
      let data = this.html.get()
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

  const controller = new Controller()
}
