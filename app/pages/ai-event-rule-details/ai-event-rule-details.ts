import { CheckTool } from '../../common/tools/check-tool/check.tool'
import { Guid } from '../../common/tools/guid/guid'
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
      this.load()
    }

    private business = new AIEventRuleDetailsBusiness()
    private message = new AIEventRuleDetailsMessage()
    source = new AIEventRuleDetailsSource()
    data = new CameraAIEventRule()
    get id() {
      let querys = LocationTool.query.decode(location.search)
      return querys.id
    }
    get type() {
      let querys = LocationTool.query.decode(location.search)
      if (querys.type) {
        return parseInt(querys.type) as EventType
      }
      throw new Error('未指定事件类型')
    }
    private html = new AIEventRuleDetailsHtmlController(this.type)

    async init() {
      this.data.EventType = this.type
      this.source.type = this.type
      this.source.channels = this.business.channels()
      this.html.initChannels(this.source.channels, !this.id)
    }

    loadAIModels(channelId: string) {
      this.source.aimodels = this.business.aimodels(this.type, channelId)
      this.html.initAIModels(this.source.aimodels, !this.id)
    }

    load() {
      if (this.type) {
        if (this.id) {
          this.business.load(this.type, this.id).then((data) => {
            this.data = data
            this.html.load(this.data).then((x) => {
              if (this.data.ModelRule) {
                this.html.info.load(this.data.ModelRule)
                if (
                  this.data.ModelRule.Regions &&
                  this.data.ModelRule.Regions.length > 0
                ) {
                  this.html.chart.load(this.data.ModelRule.Regions[0])
                }
              }
            })
          })
        } else {
          this.data.ModelRule = Creater.fromType(this.type)
        }
      }
    }

    regist() {
      this.html.event.on('selectChannel', this.selectChannel.bind(this))
      this.html.event.on('selectAIModel', this.selectAIModel.bind(this))
      this.html.event.on('cancel', this.cancel.bind(this))
      this.html.event.on('ok', this.ok.bind(this))

      this.html.chart.event.on('polygon', (polygon) => {
        if (this.type && this.data.ModelRule) {
          this.data.ModelRule.Regions = [polygon]
          this.html.chart.load(polygon)
        }
      })
      // this.html.chart.event.on('clear', () => {
      //   if (this.data.ModelRule) {
      //     this.data.ModelRule.Regions = []
      //   }
      // })
    }

    selectChannel(id: string) {
      let url = this.business.picture(id)
      this.html.properties.picture.set(url)
      this.loadAIModels(id)
    }
    async selectAIModel(id: string) {
      let aimosels = await this.source.aimodels
      let aimodel = aimosels.find((x) => x.Id === id)
      if (aimodel && aimodel.ModelDTO && aimodel.ModelDTO.Labels) {
        this.html.info.init(aimodel.ModelDTO.Labels)
      }
    }

    ok() {
      if (this.data && this.id && this.data.RuleId === this.id) {
        this.update(this.data)
      } else {
        this.create()
      }
    }
    cancel() {
      this.message.close()
    }

    check(data?: CameraAIEventRule) {
      // let args: ResultArgs = {
      //   result: false,
      //   inner: true,
      // }
      // if (!data) {
      //   return false
      // }
      // if (!data.EventType) {
      //   args.message = '请选择事件类型'
      //   this.message.result(args)
      //   return false
      // }
      // if (data.ChannelId == undefined) {
      //   args.message = '请选择代理通道'
      //   this.message.result(args)
      //   return false
      // }
      // if (!data.RuleName) {
      //   args.message = '请输入规则名称'
      //   this.message.result(args)
      //   return false
      // }
      // if (!data.ModelId) {
      //   args.message = '请选择AI模型'
      //   this.message.result(args)
      //   return false
      // }
      // if (!data.ModelRule) {
      //   return false
      // }
      // if (!data.ModelRule.Regions || data.ModelRule.Regions.length == 0) {
      //   args.message = '请绘制识别区域'
      //   this.message.result(args)
      //   return false
      // }
      // return true
      if (!data) {
        return false
      }
      let result = CheckTool.CameraAIEventRule(data)
      if (!result.result && result.inner) {
        this.message.result(result)
      }
      return result.result
    }

    create() {
      this.data.RuleId = Guid.NewGuid().ToString('N')
      this.data = this.html.get(this.data)
      this.data.ModelRule = this.html.info.get(this.data.ModelRule)
      this.data.ModelRule.Regions = [this.html.chart.get()]
      if (this.check(this.data)) {
        this.business
          .create(this.data)
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
    update(data: CameraAIEventRule) {
      this.data = this.html.get(this.data)
      this.data.ModelRule = this.html.info.get(this.data.ModelRule)
      this.data.ModelRule.Regions = [this.html.chart.get()]
      if (this.check(this.data)) {
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
  }

  const controller = new Controller()
}
