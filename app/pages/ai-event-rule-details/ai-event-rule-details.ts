import { LocationTool } from '../../common/tools/location.tool'
import { EventType } from '../../data-core/enums/event-type.enum'
import { CameraAIEventRule } from '../../data-core/models/arm/analysis/rules/camera-ai-event-rule.model'
import { AIEventRuleDetailsCreater as Creater } from './ai-event-rule-details.creater'
import { AIEventRuleDetailsHtmlController } from './ai-event-rule-details.html.controller'
import { AIEventRuleDetailsMessage } from './ai-event-rule-details.message'
import { AIEventRuleDetailsSource } from './ai-event-rule-details.model'
import { AIEventRuleDetailsBusiness } from './business/ai-event-rule-details.business'

export namespace AIEventRuleDetails {
  class Controller {
    constructor() {
      this.regist()
      this.init()
    }

    business = new AIEventRuleDetailsBusiness()
    message = new AIEventRuleDetailsMessage()
    source = new AIEventRuleDetailsSource()
    data = new CameraAIEventRule()
    get id() {
      let querys = LocationTool.querys(location.search)
      return querys.id
    }
    get type() {
      let querys = LocationTool.querys(location.search)
      if (querys.type) {
        return parseInt(querys.type) as EventType
      }
      return undefined
    }
    html = new AIEventRuleDetailsHtmlController(this.type!)

    async init() {
      this.source = await this.business.source()
      this.source.type = this.type
      this.html.init(this.source)
    }

    load() {
      if (this.type && this.id) {
        this.business.load(this.type, this.id).then((data) => {
          this.data = data
        })
      }
    }

    regist() {
      this.html.event.on('selectChannel', this.selectChannel.bind(this))
      this.html.event.on('selectAIModel', this.selectAIModel.bind(this))
      this.html.event.on('cancel', this.cancel.bind(this))
      this.html.event.on('ok', this.ok.bind(this))

      this.html.chart.event.on('polygon', (polygon) => {
        if (this.type) {
          if (!this.data.ModelRule) {
            this.data.ModelRule = Creater.fromType(this.type)
          }
          this.data.ModelRule.Regions = [polygon]
          this.html.chart.load(polygon)
        }
      })
      this.html.chart.event.on('clear', () => {
        if (this.data.ModelRule) {
          this.data.ModelRule.Regions = []
        }
      })
    }

    selectChannel(id: string) {
      let url = this.business.picture(id)
      this.html.properties.picture.set(url)
    }
    async selectAIModel(id: string) {
      let aimosels = await this.source.aimodels
      let aimodel = aimosels.find((x) => x.Id === id)
      if (aimodel && aimodel.ModelDTO && aimodel.ModelDTO.Labels) {
        this.html.info.init(aimodel.ModelDTO.Labels)
      }
    }

    ok() {
      if (this.data) {
        this.update(this.data)
      } else {
        this.create()
      }
    }
    cancel() {
      this.message.close()
    }

    create() {
      let data = new CameraAIEventRule()
      this.business
        .create(data)
        .then((x) => {
          this.message.result({
            result: true,
          })
          this.message.close()
        })
        .catch((e) => {
          this.message.result({
            result: false,
          })
        })
    }
    update(data: CameraAIEventRule) {
      this.business
        .update(data)
        .then((x) => {
          this.message.result({
            result: true,
          })
          this.message.close()
        })
        .catch((e) => {
          this.message.result({
            result: false,
          })
        })
    }
  }

  const controller = new Controller()
}
