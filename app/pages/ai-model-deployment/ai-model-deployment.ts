import { InputProxyChannel } from '../../data-core/models/arm/input-proxy-channel.model'
import { AIModelDeploymentBusiness } from './ai-model-deployment.business'
import { AIModelDeploymentHtmlController } from './ai-model-deployment.html.controller'
import { AIModelDeploymentMessage } from './ai-model-deployment.message'
import { AIModelDeploymentWindow } from './ai-model-deployment.model'

export namespace AIModelDeployment {
  class Controller {
    constructor() {
      this.load()
      this.regist()
    }
    html = new AIModelDeploymentHtmlController()
    business = new AIModelDeploymentBusiness()
    message = new AIModelDeploymentMessage()
    window = new AIModelDeploymentWindow()
    datas: InputProxyChannel[] = []
    async load() {}

    regist() {
      this.html.event.on('create', () => {
        this.oncreate()
      })
      this.html.event.on('delete', (ids) => {
        this.ondelete(ids)
      })
      this.html.event.on('discover', () => {
        this.ondiscover()
      })
      this.message.event.on('load', () => {
        this.load()
      })
      this.message.event.on('todelete', () => {
        this.todelete()
      })
    }
    ondiscover() {
      this.message.discover(this.window.discover)
    }
    oncreate() {
      this.window.details.clear()
      this.message.create(this.window.details)
    }
    onmodify(id: string) {
      this.window.details.id = id
      this.message.modify(this.window.details)
    }
    ondelete(ids: string[]) {
      this.window.confirm.ids = ids
      this.window.confirm.message = `确定要删除这 ${ids.length} 条记录吗?`
      this.message.confirm(this.window.confirm)
    }
    todelete() {
      if (this.window.confirm.ids.length > 0) {
      }
    }
  }

  let controller = new Controller()
}
