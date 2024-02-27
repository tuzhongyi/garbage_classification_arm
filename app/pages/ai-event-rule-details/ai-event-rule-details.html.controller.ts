import '../window/window.less'
import './ai-event-rule-details.less'

import { EventEmitter } from '../../common/event-emitter'
import { IIdNameModel } from '../../data-core/models/model.interface'
import { AIEventRuleDetailsEvent } from './ai-event-rule-details.event'

import { EnumTool } from '../../common/tools/enum-tool/enum.tool'
import { HtmlTool } from '../../common/tools/html-tool/html.tool'
import { wait } from '../../common/tools/wait'
import { EventType } from '../../data-core/enums/event-type.enum'
import { CameraAIEventRule } from '../../data-core/models/arm/analysis/rules/camera-ai-event-rule.model'
import { CameraAIModel } from '../../data-core/models/arm/camera-ai-model.model'
import { InputProxyChannel } from '../../data-core/models/arm/input-proxy-channel.model'
import { AIEventRuleDetailsChartController } from './controller/chart/device-channel-calibration-chart.controller'
import { AIEventRuleDetailsInfoControllerFactory as Factory } from './controller/info/ai-event-rule-details-info.controller'

export class AIEventRuleDetailsHtmlController {
  chart = new AIEventRuleDetailsChartController()
  info = Factory.create(this.type)

  event: EventEmitter<AIEventRuleDetailsEvent> = new EventEmitter()
  constructor(private type: EventType) {
    this.init(type)
    this.regist()
  }
  private inited = {
    channel: false,
    aimodel: false,
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
    channel: {
      get: (): IIdNameModel => {
        return {
          Id: this.element.select.channel.value,
          Name: this.element.select.channel.options[
            this.element.select.channel.selectedIndex
          ].innerHTML,
        }
      },
      set: (value: number) => {
        this.element.select.channel.value = value.toString()
      },
    },
    aimodel: {
      get: (): IIdNameModel => {
        return {
          Id: this.element.select.aimodel.value,
          Name: this.element.select.aimodel.options[
            this.element.select.aimodel.selectedIndex
          ].innerHTML,
        }
      },
      set: (value: string) => {
        this.element.select.aimodel.value = value
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

  private async init(type: EventType) {
    this.element.input.type.value = await EnumTool.EventType(type)
  }
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

  initChannels(source: Promise<InputProxyChannel[]>) {
    this.element.select.channel.innerHTML = ''
    source.then((channels) => {
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
      this.inited.channel = true
    })
  }
  initAIModels(source: Promise<CameraAIModel[]>) {
    this.element.select.aimodel.innerHTML = ''
    source.then((aimodels) => {
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
      this.inited.aimodel = true
    })
  }

  load(data: CameraAIEventRule) {
    this.element.input.name.value = data.RuleName

    wait(
      () => {
        return this.inited.channel
      },
      () => {
        if (this.element.select.channel.value != data.ChannelId.toString()) {
          this.element.select.channel.value = data.ChannelId.toString()
          this.selectChannel(data.ChannelId.toString())
        }
      }
    )
    wait(
      () => {
        return this.inited.aimodel
      },
      () => {
        if (this.element.select.aimodel.value != data.ModelId) {
          this.element.select.aimodel.value = data.ModelId
          this.selectAIModel(data.ModelId)
        }
      }
    )
  }
}
