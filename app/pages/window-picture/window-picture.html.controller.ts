import { EventEmitter } from '../../common/event-emitter'
import '../window/window.less'
import { PictureWindowEvent } from './window-picture.event'
import './window-picture.less'
import { IPictureWindowQuery } from './window-picture.model'

export class PictureWindowHtmlController {
  constructor() {
    this.regist()
  }

  event: EventEmitter<PictureWindowEvent> = new EventEmitter()

  element = {
    title: document.getElementById('title') as HTMLDivElement,
    content: document.getElementById('content') as HTMLDivElement,

    buttons: {
      close: document.getElementById('close') as HTMLButtonElement,
    },
  }

  regist() {
    this.element.buttons.close.addEventListener('click', () => {
      this.event.emit('close')
    })
  }

  load(query: IPictureWindowQuery) {
    this.element.title.innerHTML = query.title
    this.element.content.style.backgroundImage = `url(${query.img})`
  }
}
