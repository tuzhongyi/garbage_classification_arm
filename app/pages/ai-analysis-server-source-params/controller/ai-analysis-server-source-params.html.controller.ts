import { EventEmitter } from '../../../common/event-emitter'

import '../../window/window.less'
import { AIAnalysisServerSourceParamsEvent } from '../ai-analysis-server-source-params.event'
import '../ai-analysis-server-source-params.less'
import { IasParamsWindowQuery } from '../ai-analysis-server-source-params.model'
import { AIAnalysisServerSourceParamsCanvasController } from './canvas/ai-analysis-server-source-params-canvas.controller'

export class AIAnalysisServerSourceParamsHtmlController {
  constructor() {
    this.init()
    this.regist()
  }

  event: EventEmitter<AIAnalysisServerSourceParamsEvent> = new EventEmitter()
  canvas = new AIAnalysisServerSourceParamsCanvasController()

  private element = {
    title: document.getElementById('title') as HTMLDivElement,
    picture: document.getElementById('picture') as HTMLDivElement,

    buttons: {
      close: document.getElementById('close') as HTMLButtonElement,
      ok: document.getElementById('btn_ok') as HTMLButtonElement,
      cancel: document.getElementById('btn_cancel') as HTMLButtonElement,
    },
  }

  init() {}

  regist() {
    this.element.buttons.close.addEventListener('click', () => {
      this.event.emit('close')
    })
    this.element.buttons.cancel.addEventListener('click', () => {
      this.event.emit('close')
    })
    this.element.buttons.ok.addEventListener('click', () => {
      this.event.emit('ok')
    })
  }

  load(query: IasParamsWindowQuery) {
    this.element.title.innerHTML = query.title
    this.element.picture.style.backgroundImage = `url(${query.img})`
  }
}
