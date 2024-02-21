import { CameraAIModel } from '../../data-core/models/arm/camera-ai-model.model'
import { AIModelDeploymentHtmlController } from './ai-model-deployment.html.controller'
import { AIModelDeploymentWindow } from './ai-model-deployment.model'
import { AIModelDeploymentBusiness } from './business/ai-model-deployment.business'

export namespace AIModelDeployment {
  class Controller {
    constructor() {
      this.load()
      this.regist()
    }
    html = new AIModelDeploymentHtmlController()
    business = new AIModelDeploymentBusiness()

    window = new AIModelDeploymentWindow()
    datas: CameraAIModel[] = []
    async load() {
      this.datas = await this.business.list()
      this.html.list.load(this.datas)
      if (this.datas.length > 0) {
        this.html.list.select(this.datas[0].Id)
      }
    }

    regist() {
      this.html.list.event.on('select', (id) => {
        let model = this.datas.find((x) => x.Id === id)
        if (model) {
          this.html.details.load(model)
        }
      })
    }
  }

  let controller = new Controller()
}
