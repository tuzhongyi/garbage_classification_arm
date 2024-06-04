import { MessageBar } from '../../common/tools/controls/message-bar/message-bar'
import { Deployment } from '../../data-core/models/arm/deployment.model'
import { NetworkServerDeploymentBusiness } from './network-server-deployment.business'
import { NetworkServerDeploymentCapability } from './network-server-deployment.capability'
import { NetworkServerDeploymentHtmlController } from './network-server-deployment.html.controller'
import { NetworkServerDeploymentMessage } from './network-server-deployment.message'
import { NetworkServerDeploymentWindow } from './network-server-deployment.window'

export namespace NetworkServerDeployment {
  class Controller {
    constructor() {
      this.init()
      this.regist()
    }
    capability = new NetworkServerDeploymentCapability()
    private html = new NetworkServerDeploymentHtmlController()
    private business = new NetworkServerDeploymentBusiness()
    private message = new NetworkServerDeploymentMessage()
    private window = new NetworkServerDeploymentWindow()

    private data?: Deployment

    private init() {
      let source = this.business.load()
      this.html.init(source)
    }

    private async load() {
      this.data = await this.business.get()
      this.html.load(this.data)
    }

    private regist() {
      this.html.event.on('inited', () => {
        this.load()
      })
      this.html.event.on('test', this.ontest.bind(this))
      this.html.event.on('isupserverchange', (id) => {
        this.business.server.isup.domain(id).then((x) => {
          this.html.initISUPDomain(x)
          if (this.data) {
            this.html.loadISUPDomain(this.data.ISUPDomainId)
          }
        })
      })
      this.html.event.on('save', () => {
        this.window.confirm.message = '是否保存服务器部署信息？'
        this.message.save_confirm(this.window.confirm)
      })
      this.message.event.on('save', this.onsave.bind(this))
    }

    private ontest() {
      this.business.get().then((data) => {
        let current = this.data ?? new Deployment()
        current = this.html.get(current)
        if (this.html.equals(current, data)) {
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
        } else {
          MessageBar.warning('部署信息已修改，请先保存')
        }
      })
    }

    private onsave() {
      if (this.data) {
        this.data = this.html.get(this.data)
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
