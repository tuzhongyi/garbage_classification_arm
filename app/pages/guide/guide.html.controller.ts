import { EventEmitter } from '../../common/event-emitter'
import { HtmlTool } from '../../common/tools/html-tool/html.tool'
import { ArmGuideEvent } from './guide.event'
import Json from './guide.json'
import './less/guide.less'

interface IMenuItem {
  name: string
  url: string
  step: string
  nomessage?: boolean
}

export class ArmGuideHtmlController {
  json = Json as IMenuItem[]
  element = {
    menu: document.querySelector('.menu') as HTMLDivElement,
    back: document.querySelector('#back') as HTMLDivElement,
    iframe: document.querySelector('#iframe') as HTMLIFrameElement,
    username: document.getElementById('username') as HTMLElement,
    name: document.getElementById('name') as HTMLDivElement,
    prev: document.getElementById('menu_prev') as HTMLDivElement,
    next: document.getElementById('menu_next') as HTMLDivElement,
    content: document.querySelector(
      '.arm-guide-body-content'
    ) as HTMLDivElement,
  }

  event: EventEmitter<ArmGuideEvent> = new EventEmitter()

  constructor() {
    this.init()
    this.regist()
  }

  private regist() {
    this.element.back.addEventListener('click', () => {
      this.event.emit('back')
    })
    this.element.menu.querySelectorAll('.menu-item').forEach((item) => {
      item.addEventListener('click', (e) => {
        this.onclick(e)
      })
    })
    this.element.prev.addEventListener('click', () => {
      if (this.index > 0) {
        this.index--
      }
    })
    this.element.next.addEventListener('click', () => {
      if (this.index < this.json.length - 1) {
        this.index++
      }
    })
  }

  private init() {
    for (let i = 0; i < this.json.length; i++) {
      this.append(i, this.json[i])
    }
  }

  private append(index: number, item: IMenuItem) {
    let div = document.createElement('div')
    div.classList.add('menu-item')
    if (index === 0) {
      div.classList.add('selected')
    }
    div.setAttribute('index', index.toString())
    div.innerText = `${item.step}：${item.name}`
    div.addEventListener('click', (e) => {
      this.onclick(e)
    })
    this.element.menu.appendChild(div)
  }

  private onclick(e: Event) {
    let item = HtmlTool.element.findelement(
      e.target as HTMLElement,
      'menu-item'
    ) as HTMLElement

    let index = parseInt(item.getAttribute('index')!)
    this.index = index
  }

  private select(index: number) {
    this.clear()
    let item = this.element.menu.querySelector(
      `[index="${index}"]`
    ) as HTMLDivElement

    item.classList.add('selected')
    this.event.emit('select', index)
  }

  private clear() {
    let selected = this.element.menu.querySelector('.selected')
    if (selected) {
      selected.classList.remove('selected')
    }
  }

  private _index: number = 0
  private get index(): number {
    return this._index
  }
  private set index(v: number) {
    this._index = v
    this.select(this.index)
  }

  load(index: number = 0) {
    let item = this.json[index]
    this.element.name.innerHTML = item.name
    if (item.nomessage) {
      this.element.content.classList.add('nomessage')
    } else {
      this.element.content.classList.remove('nomessage')
    }

    this.element.iframe.src = item.url
  }
}
