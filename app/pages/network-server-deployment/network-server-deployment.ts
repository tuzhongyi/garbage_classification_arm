import { MessageBar } from '../../common/tools/controls/message-bar/message-bar'
import { NetworkServerDeploymentBusiness } from './network-server-deployment.business'
import { NetworkServerDeploymentHtmlController } from './network-server-deployment.html.controller'
import { NetworkServerDeploymentModel } from './network-server-deployment.model'

export namespace NetworkServerDeployment {
  class Controller {
    constructor() {
      this.regist()
      this.load()
    }
    html = new NetworkServerDeploymentHtmlController()
    business = new NetworkServerDeploymentBusiness()

    data?: NetworkServerDeploymentModel

    async load() {
      this.data = await this.business.load()
      this.html.load(this.data)
    }

    regist() {
      this.html.event.on('save', this.onsave.bind(this))
      this.html.event.on('test', this.ontest.bind(this))
      this.html.event.on('isupserverchange', (id) => {
        this.onisupserverchange(id)
      })
    }

    onisupserverchange(id: string) {
      this.business.server.isup.domain(id).then((x) => {
        this.html.load(x)
      })
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
