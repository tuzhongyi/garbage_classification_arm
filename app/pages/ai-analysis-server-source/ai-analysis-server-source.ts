import { AIAnalysisServerSourceBusiness } from './ai-analysis-server-source.business'
import { AIAnalysisServerSourceHtmlController } from './ai-analysis-server-source.html.controller'

export namespace AIAnalysisServerSource {
  class Controller {
    constructor() {
      this.init()
    }
    html = new AIAnalysisServerSourceHtmlController()
    business = new AIAnalysisServerSourceBusiness()
    async init() {
      let datas = await this.business.load()

      this.html.element.table.load(datas)
    }
  }

  let controller = new Controller()
}
