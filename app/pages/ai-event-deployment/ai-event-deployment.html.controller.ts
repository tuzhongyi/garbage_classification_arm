import { EventEmitter } from '../../common/event-emitter'
import { HtmlTool } from '../../common/tools/html-tool/html.tool'
import { EventType } from '../../data-core/enums/event-type.enum'
import { CameraAIEvent } from '../../data-core/models/arm/camera-ai-event.model'
import { IIdNameModel } from '../../data-core/models/model.interface'
import { Manager } from '../../data-core/requests/managers/manager'
import { AIEventDeploymentEvent } from './ai-event-deployment.event'

import { AIEventDeploymentTriggerController } from './controller/ai-event-deployment-trigger.controller'
import { AIEventDeploymentSheetController } from './controller/sheet/ai-event-deployment-sheet.controller'
import './less/ai-event-deployment.less'

declare const $: any

export class AIEventDeploymentHtmlController {
  event: EventEmitter<AIEventDeploymentEvent> = new EventEmitter()
  trigger = new AIEventDeploymentTriggerController()
  sheet = new AIEventDeploymentSheetController()
  property = {
    Name: {
      get: () => {
        return HtmlTool.get(this.element.Name.value)
      },
    },
  }

  constructor() {
    this.regist()
    this.init()
  }

  private source: CameraAIEvent[] = []
  private element = {
    Type: document.getElementById('Type') as HTMLSelectElement,
    Name: document.getElementById('Name') as HTMLInputElement,

    save: document.getElementById('save') as HTMLButtonElement,
  }

  private regist() {
    this.element.save.addEventListener('click', () => {
      this.event.emit('save')
    })
    this.element.Type.addEventListener('change', () => {
      this.selectType(this.element.Type.value)
    })
  }

  private selectType(type: string) {
    this.event.emit('typechange', parseInt(type) as EventType)
  }

  init() {
    Manager.capability.depolyment.then((x) => {
      if (x.EventTypes) {
        for (let i = 0; i < x.EventTypes.length; i++) {
          let item: IIdNameModel = {
            Id: x.EventTypes[i].Value,
            Name: x.EventTypes[i].Name,
          }
          HtmlTool.select.append(item, this.element.Type)
        }
        if (this.element.Type.value) {
          this.selectType(this.element.Type.value)
        }
      }
    })
  }

  load(event: CameraAIEvent) {
    this.element.Name.value = event.Name
  }
}
