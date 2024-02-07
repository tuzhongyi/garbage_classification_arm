import { EventType } from '../../data-core/enums/event-type.enum'
import { CameraAIEventRule } from '../../data-core/models/arm/analysis/rules/camera-ai-event-rule.model'
import { AIEventRuleBusiness } from './ai-event-rule.business'
import { AIEventRuleHtmlController } from './ai-event-rule.html.controller'
import { AIEventRuleMessage } from './ai-event-rule.message'
import { AIEventRuleWindow } from './ai-event-rule.window'

export namespace AIEventRule {
  class Controller {
    constructor() {
      this.load()
      this.regist()
    }
    html = new AIEventRuleHtmlController()
    business = new AIEventRuleBusiness()
    message = new AIEventRuleMessage()
    window = new AIEventRuleWindow()
    datas: CameraAIEventRule[] = []
    type = EventType.IllegalDrop
    async load() {
      this.datas = await this.business.rules(this.type)
      this.html.table.load(this.datas)
    }

    regist() {
      this.html.event.on('eventchange', (type) => {
        this.type = type
        this.load()
      })
      this.html.event.on('create', () => {
        this.oncreate()
      })
      this.html.event.on('delete', (ids) => {
        this.ondelete(ids)
      })
      this.message.event.on('load', () => {
        this.load()
      })
      this.message.event.on('todelete', () => {
        this.todelete()
      })
    }
    oncreate() {
      this.window.details.clear()
      this.window.details.query.type = this.type
      this.message.create(this.window.details)
    }
    onmodify(id: string) {
      this.window.details.query.id = id
      this.window.details.query.type = this.type
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