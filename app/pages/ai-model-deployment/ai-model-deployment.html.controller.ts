import '../../../assets/styles/table-sticky.less'
import { EventEmitter } from '../../common/event-emitter'
import { AIModelDeploymentEvent } from './ai-model-deployment.event'

import './ai-model-deployment.less'
export class AIModelDeploymentHtmlController {
  element = {
    search: {
      text: document.getElementById('search_text') as HTMLInputElement,
      button: document.getElementById('search_button') as HTMLButtonElement,
    },
    button: {
      create: document.getElementById('btn_create') as HTMLButtonElement,
      delete: document.getElementById('btn_delete') as HTMLButtonElement,
      discover: document.getElementById('btn_discover') as HTMLButtonElement,
    },
  }

  event: EventEmitter<AIModelDeploymentEvent> = new EventEmitter()

  constructor() {
    this.init()
    this.regist()
  }

  init() {}

  regist() {}
}
