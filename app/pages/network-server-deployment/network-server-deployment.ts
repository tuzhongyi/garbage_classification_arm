import { MessageBar } from '../../common/tools/controls/message-bar/message-bar'
import { NetworkServerDeploymentBusiness } from './network-server-deployment.business'
import { NetworkServerDeploymentCapability } from './network-server-deployment.capability'
import { NetworkServerDeploymentHtmlController } from './network-server-deployment.html.controller'
import { NetworkServerDeploymentMessage } from './network-server-deployment.message'
import { NetworkServerDeploymentModel } from './network-server-deployment.model'
import { NetworkServerDeploymentWindow } from './network-server-deployment.window'

export namespace NetworkServerDeployment {
  class Controller {
    constructor() {
      this.regist()
      this.load()
    }
    capability = new NetworkServerDeploymentCapability()
    private html = new NetworkServerDeploymentHtmlController()
    private business = new NetworkServerDeploymentBusiness()
    private message = new NetworkServerDeploymentMessage()
    private window = new NetworkServerDeploymentWindow()

    private data?: NetworkServerDeploymentModel

    private async load() {
      this.data = await this.business.load()
      this.html.load(this.data)
    }

    private regist() {
      this.html.event.on('test', this.ontest.bind(this))
      this.html.event.on('isupserverchange', (id) => {
        this.onisupserverchange(id)
      })
      this.html.event.on('save', () => {
        this.window.confirm.message = '是否保存服务器部署信息？'
        this.message.save_confirm(this.window.confirm)
      })
      this.message.event.on('save', this.onsave.bind(this))
    }

    private onisupserverchange(id: string) {
      this.business.server.isup.domain(id).then((x) => {
        this.html.load(x)
      })
    }
    private ontest() {
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

    private onsave() {
      if (this.data && this.data.deployment) {
        this.data.deployment.HostAddress =
          this.html.element.deployment.HostAddress.value
        this.data.deployment.PortNo = parseInt(
          this.html.element.deployment.PortNo.value
        )
        this.data.deployment.UserName =
          this.html.element.deployment.UserName.value
        this.data.deployment.Password =
          this.html.element.deployment.Password.value

        this.data.deployment.GarbageServerId =
          this.html.element.GarbageServer.value
        this.data.deployment.ISUPServerId = this.html.element.ISUPServer.value
        this.data.deployment.ISUPDomainId = this.html.element.ISUPDomain.value

        this.business
          .update(this.data.deployment)
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
