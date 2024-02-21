import { EventEmitter } from '../../../common/event-emitter'
import { HtmlTool } from '../../../common/tools/html-tool/html.tool'
import { CameraAIModel } from '../../../data-core/models/arm/camera-ai-model.model'

interface AIModelDeploymentListEvent {
  select(id: string): void
}

export class AIModelDeploymentListController {
  event = new EventEmitter<AIModelDeploymentListEvent>()

  private parser: DOMParser = new DOMParser()
  private template = document.getElementById(
    'template-card'
  ) as HTMLTemplateElement
  private element = {
    list: document.getElementById('list') as HTMLDivElement,
  }
  private append(index: number, data: CameraAIModel) {
    let document = this.parser.parseFromString(
      this.template.innerHTML,
      'text/html'
    )
    let card = document.body.firstChild as HTMLElement
    let _index = document.querySelector('.card-index') as HTMLDivElement
    let name = document.querySelector('.card-name') as HTMLDivElement
    let tail = document.querySelector('.card-tail') as HTMLDivElement

    card.id = data.Id
    card.addEventListener('click', (e) => {
      let selected = this.element.list.querySelector('.selected')
      if (selected) {
        selected.classList.remove('selected')
      }
      let card = HtmlTool.element.findelement(
        e.target as HTMLElement,
        'card'
      ) as HTMLElement
      card.classList.add('selected')
      this.event.emit('select', card.id)
    })

    _index.innerHTML = index.toString()
    name.innerHTML = data.ModelName ?? ''
    tail.innerHTML = data.Version ?? ''

    this.element.list.appendChild(card)
  }

  load(datas: CameraAIModel[] = []) {
    for (let i = 0; i < datas.length; i++) {
      this.append(i + 1, datas[i])
    }
  }

  select(id: string) {
    let card = document.getElementById(id)
    if (card) {
      card.click()
    }
  }
}
