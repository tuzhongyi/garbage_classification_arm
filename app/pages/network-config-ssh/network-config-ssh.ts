import { MessageBar } from '../../common/tools/message-bar/message-bar'
import { SSH } from '../../data-core/models/arm/ssh.model'
import { NetworkConfigSSHBusiness } from './network-config-ssh.business'
import { NetworkConfigSSHHtmlController } from './network-config-ssh.html.controller'

export namespace NetworkConfigSSH {
  class Controller {
    constructor() {
      this.regist()
      this.load()
    }
    html = new NetworkConfigSSHHtmlController()
    business = new NetworkConfigSSHBusiness()

    data?: SSH

    async load() {
      this.data = await this.business.load()
      this.html.load(this.data)
    }

    regist() {
      this.html.event.on('save', this.onsave.bind(this))
    }

    onsave() {
      if (this.data) {
        this.data.Enabled = JSON.parse(this.html.element.Enabled.value)
        this.business
          .update(this.data)
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
