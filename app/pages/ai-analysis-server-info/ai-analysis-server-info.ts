import { MessageBar } from '../../common/tools/controls/message-bar/message-bar'
import { AIAnalysisServerInfoBusiness } from './ai-analysis-server-info.business'
import { AIAnalysisServerInfoHtmlController } from './ai-analysis-server-info.html.controller'

export namespace AIAnalysisServerInfo {
  class Controller {
    constructor() {
      this.load()
    }
    html = new AIAnalysisServerInfoHtmlController()
    business = new AIAnalysisServerInfoBusiness()

    private async load() {
      try {
        let data = await this.business.load()
        this.html.load(data)
      } catch (error) {
        MessageBar.error('智能分析服务器获取失败')
      }
    }
  }

  const controller = new Controller()
}
