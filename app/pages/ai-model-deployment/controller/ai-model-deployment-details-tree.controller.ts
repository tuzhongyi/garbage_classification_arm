import { HtmlTool } from '../../../common/tools/html-tool/html.tool'
import { CameraAIModelDTOLabel } from '../../../data-core/models/arm/camera-ai-model-dto-label.model'

declare const $: any
export class AIModelDeploymentDetailsTreeController {
  constructor() {}
  private element = document.getElementById('tree') as HTMLUListElement
  private init() {
    $(function () {
      $('#tree').treeview({
        collapsed: false,
        animated: 'medium',
        persist: 'location',
      })
    })
  }
  private append(data: CameraAIModelDTOLabel, parent: HTMLElement) {
    let li = document.createElement('li')

    let content = document.createElement('div')
    content.className = 'json-tree-content'
    content.addEventListener('click', (e) => {
      let li = HtmlTool.element.findelement(
        e.target as HTMLElement,
        HTMLLIElement
      ) as HTMLElement
      let hitarea = li.querySelector('.hitarea') as HTMLElement
      hitarea.click()
    })
    content.addEventListener('mouseover', (e) => {
      let li = HtmlTool.element.findelement(
        e.target as HTMLElement,
        HTMLLIElement
      ) as HTMLElement
      let hitarea = li.querySelector('.hitarea')
      if (hitarea) {
        if (!hitarea.classList.contains('hitarea-hover')) {
          hitarea.classList.add('hitarea-hover')
        }
      } else {
        if (!li.classList.contains('hitarea-hover')) {
          li.classList.add('hitarea-hover')
        }
      }
    })
    content.addEventListener('mouseout', (e) => {
      let li = HtmlTool.element.findelement(
        e.target as HTMLElement,
        HTMLLIElement
      ) as HTMLElement
      let hitarea = li.querySelector('.hitarea')
      if (hitarea) {
        if (hitarea.classList.contains('hitarea-hover')) {
          hitarea.classList.remove('hitarea-hover')
        }
      } else {
        if (li.classList.contains('hitarea-hover')) {
          li.classList.remove('hitarea-hover')
        }
      }
    })

    let text = document.createElement('div')
    text.innerHTML = data.LabelName
    content.appendChild(text)

    if (data.IsLeaf) {
      let value = document.createElement('div')
      value.innerHTML = data.LabelValue

      content.appendChild(value)
    }

    li.appendChild(content)

    if (data.Labels && data.Labels.length > 0) {
      let ul = document.createElement('ul')
      for (let i = 0; i < data.Labels.length; i++) {
        this.append(data.Labels[i], ul)
      }
      li.appendChild(ul)
    }

    parent.appendChild(li)
  }

  clear() {
    this.element.innerHTML = ''
  }

  load(datas: CameraAIModelDTOLabel[] = []) {
    this.clear()
    for (let i = 0; i < datas.length; i++) {
      this.append(datas[i], this.element)
    }
    this.init()
  }
}
