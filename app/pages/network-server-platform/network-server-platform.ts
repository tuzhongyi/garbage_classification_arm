import { MessageBar } from '../../common/tools/controls/message-bar/message-bar'
import { NetworkServerPlatformBusiness } from './network-server-platform.business'
import { NetworkServerPlatformHtmlController } from './network-server-platform.html.controller'
import { NetworkServerPlatformMessage } from './network-server-platform.message'
import { NetworkServerPlatformWindow } from './network-server-Platform.window'

export namespace NetworkServerPlatform {
  class Controller {
    constructor() {
      this.regist()
      this.load()
    }
    html = new NetworkServerPlatformHtmlController()
    business = new NetworkServerPlatformBusiness()
    message = new NetworkServerPlatformMessage()
    window = new NetworkServerPlatformWindow()

    async load() {
      let data = await this.business.load()
      this.html.load(data)
    }

    regist() {
      this.html.event.on('test', this.ontest.bind(this))
      this.html.event.on('save', () => {
        this.window.confirm.message = '是否保存平台信息？'
        this.message.save_confirm(this.window.confirm)
      })
      this.message.event.on('save', this.onsave.bind(this))
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
