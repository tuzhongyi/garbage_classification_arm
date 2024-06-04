import { EventEmitter } from '../../common/event-emitter'
import { Language } from '../../common/language'
import { HtmlTool } from '../../common/tools/html-tool/html.tool'
import { SortationDevice } from '../../data-core/models/sortation/sortation-device.model'

import { DeviceSortationListEvent } from './device-sortation-list.event'
import './device-sortation-list.less'
export class DeviceSortationListHtmlController {
  element = {
    content: document.getElementById('content') as HTMLDivElement,
    template: document.getElementById('template') as HTMLElement,
    controls: {
      manual: document.getElementById('create-manual') as HTMLButtonElement,
    },
  }
  event: EventEmitter<DeviceSortationListEvent> = new EventEmitter()

  constructor() {
    this.regist()
  }

  private parser = new DOMParser()
  private cards: HTMLElement[] = []

  private regist() {
    this.element.controls.manual.addEventListener('click', () => {
      this.event.emit('create', false)
    })
  }

  private async append(sortation: SortationDevice) {
    let document = this.parser.parseFromString(
      this.element.template.innerHTML,
      'text/html'
    )
    let card = document.body.firstElementChild as HTMLElement
    let Name = document.querySelector('.Name') as HTMLDivElement
    let HostAddress = document.querySelector('.HostAddress') as HTMLDivElement
    let PortNo = document.querySelector('.PortNo') as HTMLDivElement
    let Status = document.querySelector('.Status') as HTMLDivElement
    let DropPortStatus = document.querySelector(
      '.DropPortStatus'
    ) as HTMLDivElement
    let ConsoleOpenStatus = document.querySelector(
      '.ConsoleOpenStatus'
    ) as HTMLDivElement
    let AirPressure = document.querySelector('.AirPressure') as HTMLDivElement
    card.id = sortation.Id
    Name.innerText = HtmlTool.set(sortation.Name, '-')
    HostAddress.innerText = HtmlTool.set(sortation.HostAddress, '-')
    PortNo.innerText = HtmlTool.set(sortation.PortNo, '-')
    Status.innerText = HtmlTool.set(
      Language.OnlineStatus(sortation.Status),
      '-'
    )
    DropPortStatus.innerText = HtmlTool.set(
      Language.OpenOrClose(sortation.DropPortStatus),
      '-'
    )
    ConsoleOpenStatus.innerText = HtmlTool.set(
      Language.OpenOrClose(sortation.ConsoleOpenStatus),
      '-'
    )
    AirPressure.innerText = HtmlTool.set(sortation.AirPressure, '-')

    let info = document.querySelector('.btn-info') as HTMLDivElement
    let calibration = document.querySelector(
      '.btn-calibration'
    ) as HTMLDivElement
    let play = document.querySelector('.btn-play') as HTMLDivElement
    let _delete = document.querySelector('.btn-delete') as HTMLDivElement

    info.addEventListener('click', (e) => {
      let card = HtmlTool.element.findelement(e.target as HTMLElement, 'card')
      if (card) {
        this.event.emit('info', card.id)
      }
    })
    calibration.addEventListener('click', (e) => {
      let card = HtmlTool.element.findelement(e.target as HTMLElement, 'card')
      if (card) {
        this.event.emit('calibration', card.id)
      }
    })
    play.addEventListener('click', (e) => {
      let card = HtmlTool.element.findelement(e.target as HTMLElement, 'card')
      if (card) {
        this.event.emit('play', card.id)
      }
    })
    _delete.addEventListener('click', (e) => {
      let card = HtmlTool.element.findelement(e.target as HTMLElement, 'card')
      if (card) {
        this.event.emit('delete', card.id)
      }
    })
    this.cards.push(card)
    this.element.content.appendChild(card)
  }

  clear() {
    this.cards = []
    this.element.content.innerHTML = ''
  }

  load(datas: SortationDevice[]) {
    for (let i = 0; i < datas.length; i++) {
      this.append(datas[i])
    }
  }
}
