import '../window/window.less'
import './ai-event-rule-details.less'

import { EventEmitter } from '../../common/event-emitter'
import { IIdNameModel } from '../../data-core/models/model.interface'
import { AIEventRuleDetailsEvent } from './ai-event-rule-details.event'

import { Language } from '../../common/language'
import { HtmlTool } from '../../common/tools/html-tool/html.tool'
import { EventType } from '../../data-core/enums/event-type.enum'
import { AIEventRuleDetailsSource } from './ai-event-rule-details.model'
import { AIEventRuleDetailsChartController } from './controller/chart/device-channel-calibration-chart.controller'
import { AIEventRuleDetailsInfoControllerFactory as Factory } from './controller/info/ai-event-rule-details-info.controller'

export class AIEventRuleDetailsHtmlController {
  constructor(private type: EventType) {
    this.regist()
  }

  private element = {
    input: {
      name: document.getElementById('text_name') as HTMLInputElement,
      type: document.getElementById('text_type') as HTMLInputElement,
    },
    select: {
      channel: document.getElementById('select_channel') as HTMLSelectElement,
      aimodel: document.getElementById('select_model') as HTMLSelectElement,
    },
    picture: document.getElementById('picture') as HTMLImageElement,
    button: {
      ok: document.getElementById('btn_ok') as HTMLButtonElement,
      cancel: document.getElementById('btn_cancel') as HTMLButtonElement,
    },
  }

  properties = {
    name: {
      get: () => {
        return this.element.input.name.value
      },
      set: (value: string) => {
        this.element.input.name.value = value
      },
    },
    channels: {
      get: () => {
        return this.element.select.channel.value
      },
      set: (value: string) => {
        this.element.select.channel.value = value
      },
    },
    picture: {
      set: (url: string) => {
        return new Promise<boolean>((resolve) => {
          this.element.picture.src = url
          this.element.picture.onload = () => {
            this.chart.init()
            resolve(true)
          }
          this.element.picture.onerror = () => {
            resolve(false)
          }
        })
      },
    },
  }

  chart = new AIEventRuleDetailsChartController()
  info = Factory.create(this.type)

  event: EventEmitter<AIEventRuleDetailsEvent> = new EventEmitter()

  private regist() {
    this.element.select.aimodel.addEventListener('change', () => {
      this.selectAIModel(this.element.select.aimodel.value)
    })
    this.element.select.channel.addEventListener('change', () => {
      this.selectChannel(this.element.select.channel.value)
    })
    this.element.button.ok.addEventListener('click', () => {
      this.event.emit('ok')
    })
    this.element.button.cancel.addEventListener('click', () => {
      this.event.emit('cancel')
    })
  }

  private selectAIModel(id: string) {
    this.event.emit('selectAIModel', id)
  }
  private selectChannel(id: string) {
    this.event.emit('selectChannel', id)
  }

  async init(source: AIEventRuleDetailsSource) {
    if (source.type) {
      this.element.input.type.value = await Language.EventType(source.type)
    }

    source.aimodels.then((aimodels) => {
      for (let i = 0; i < aimodels.length; i++) {
        let item: IIdNameModel = {
          Id: aimodels[i].Id,
          Name: aimodels[i].ModelName ?? aimodels[i].Id,
        }
        HtmlTool.select.append(item, this.element.select.aimodel)
      }
      if (this.element.select.aimodel.value) {
        this.selectAIModel(this.element.select.aimodel.value)
      }
    })
    source.channels.then((channels) => {
      for (let i = 0; i < channels.length; i++) {
        let item: IIdNameModel = {
          Id: channels[i].Id.toString(),
          Name: channels[i].Name,
        }
        HtmlTool.select.append(item, this.element.select.channel)
      }
      if (this.element.select.channel.value) {
        this.selectChannel(this.element.select.channel.value)
      }
    })
  }
}
