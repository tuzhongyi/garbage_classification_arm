import { MessageBar } from '../../common/tools/controls/message-bar/message-bar'
import { VideoSource } from '../../data-core/models/arm/analysis/video-source.model'
import { AIAnalysisServerSourceBusiness } from './ai-analysis-server-source.business'
import { AIAnalysisServerSourceHtmlController } from './ai-analysis-server-source.html.controller'
import { AIAnalysisServerSourceMessage } from './ai-analysis-server-source.message'
import { AIAnalysisServerSourceWindow } from './ai-analysis-server-source.window'

export namespace AIAnalysisServerSource {
  class Controller {
    constructor() {
      this.regist()
      this.load()
    }
    private html = new AIAnalysisServerSourceHtmlController()
    private business = new AIAnalysisServerSourceBusiness()
    private message = new AIAnalysisServerSourceMessage()
    private window = new AIAnalysisServerSourceWindow()
    datas: VideoSource[] = []
    async load() {
      this.datas = await this.business.load()
      this.html.table.clear()
      this.html.table.load(this.datas)
    }

    regist() {
      this.html.table.event.on('delete', (id) => {
        this.window.confirm.id = id
        let item = this.datas.find((x) => x.Id === id) as VideoSource
        this.window.confirm.message = `确定要删除 ${item.Name} 吗？`
        this.message.delete_confirm(this.window.confirm)
      })
      this.message.event.on('todelete', this.todelete.bind(this))
      this.html.table.event.on('modify', async (id) => {
        let item = this.datas.find((x) => x.Id === id) as VideoSource
        let picture = await this.business.channel.picture(item.Id)
        if (picture) {
          this.window.params.query.serverId = item.AnalysisServerId!
          this.window.params.query.title = item.Name
          this.window.params.query.img = picture
          this.window.params.query.sourceId = item.Id
          this.message.params(this.window.params)
        }
      })
    }
    todelete() {
      let id = this.window.confirm.id
      this.business
        .delete(id)
        .then((x) => {
          MessageBar.success('操作成功')
          this.load()
        })
        .catch((x) => {
          MessageBar.success('操作失败')
        })
    }
  }

  let controller = new Controller()
}
