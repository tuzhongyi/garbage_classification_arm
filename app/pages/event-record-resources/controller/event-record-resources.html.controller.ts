import { EventEmitter } from '../../../common/event-emitter'
import { IPictureWindowQuery } from '../../window-picture/window-picture.model'

import '../../window/window.less'
import { EventRecordResourcesEvent } from '../event-record-resources.event'
import '../event-record-resources.less'
import { EventRecordResourcesCanvasController } from './event-record-resources-canvas.controller'

export class EventRecordResourcesHtmlController {
  constructor() {
    this.init()
    this.regist()
  }

  event: EventEmitter<EventRecordResourcesEvent> = new EventEmitter()
  canvas = new EventRecordResourcesCanvasController()

  private element = {
    title: document.getElementById('title') as HTMLDivElement,
    content: document.getElementById('content') as HTMLDivElement,
    nodata: document.getElementById('nodata') as HTMLDivElement,

    buttons: {
      close: document.getElementById('close') as HTMLButtonElement,
      prev: document.getElementById('prev') as HTMLDivElement,
      next: document.getElementById('next') as HTMLDivElement,
    },
  }

  init() {
    this.canvas.init().then((x) => {
      this.event.emit('inited', x)
    })
  }

  regist() {
    this.element.buttons.close.addEventListener('click', () => {
      this.event.emit('close')
    })
    this.element.buttons.prev.addEventListener('click', () => {
      this.event.emit('prev')
    })
    this.element.buttons.next.addEventListener('click', () => {
      this.event.emit('next')
    })
  }

  load(query: IPictureWindowQuery, has: { next: boolean; prev: boolean }) {
    this.element.buttons.prev.style.display = has.prev ? '' : 'none'
    this.element.buttons.next.style.display = has.next ? '' : 'none'
    this.element.title.innerHTML = query.title

    if (query.img) {
      this.element.nodata.style.display = 'none'
      this.element.content.style.backgroundImage = `url(${query.img})`
    } else {
      this.element.nodata.style.display = ''
    }
  }
}
