import { EventEmitter } from '../../common/event-emitter'
import { EnumTool } from '../../common/tools/enum-tool/enum.tool'
import { HtmlTool } from '../../common/tools/html-tool/html.tool'
import { Compactor } from '../../data-core/models/compactor/compactor.model'

import { DeviceCompactorListEvent } from './device-compactor-list.event'
import './device-compactor-list.less'
export class DeviceCompactorListHtmlController {
  element = {
    content: document.getElementById('content') as HTMLDivElement,
    template: document.getElementById('template') as HTMLElement,
    controls: {
      manual: document.getElementById('create-manual') as HTMLButtonElement,
    },
  }
  event: EventEmitter<DeviceCompactorListEvent> = new EventEmitter()

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

  private async append(data: Compactor) {
    let document = this.parser.parseFromString(
      this.element.template.innerHTML,
      'text/html'
    )
    let card = document.body.firstElementChild as HTMLElement
    let Name = document.querySelector('.Name') as HTMLDivElement
    let HostAddress = document.querySelector('.HostAddress') as HTMLDivElement
    let PortNo = document.querySelector('.PortNo') as HTMLDivElement
    let CompactorState = document.querySelector(
      '.CompactorState'
    ) as HTMLDivElement
    let Model = document.querySelector('.Model') as HTMLDivElement
    let DeviceType = document.querySelector('.DeviceType') as HTMLDivElement
    let ProtocolType = document.querySelector('.ProtocolType') as HTMLDivElement
    card.id = data.Id
    Name.innerText = HtmlTool.set(data.Name, '-')
    HostAddress.innerText = HtmlTool.set(data.HostAddress, '-')
    PortNo.innerText = HtmlTool.set(data.PortNo, '-')
    CompactorState.innerText = await EnumTool.compactor.CompactorState(
      data.CompactorState,
      '-'
    )
    Model.innerText = HtmlTool.set(data.Model, '-')
    DeviceType.innerText = await EnumTool.compactor.DeviceType(
      data.DeviceType,
      '-'
    )
    ProtocolType.innerText = await EnumTool.compactor.ProtocolType(
      data.ProtocolType,
      '-'
    )

    let info = document.querySelector('.btn-info') as HTMLDivElement
    let params = document.querySelector('.btn-params') as HTMLDivElement
    let network = document.querySelector('.btn-network') as HTMLDivElement
    let operation = document.querySelector('.btn-operation') as HTMLDivElement
    let _delete = document.querySelector('.btn-delete') as HTMLDivElement

    info.addEventListener('click', (e) => {
      let card = HtmlTool.element.findelement(e.target as HTMLElement, 'card')
      if (card) {
        this.event.emit('info', card.id)
      }
    })
    params.addEventListener('click', (e) => {
      let card = HtmlTool.element.findelement(e.target as HTMLElement, 'card')
      if (card) {
        this.event.emit('params', card.id)
      }
    })
    network.addEventListener('click', (e) => {
      let card = HtmlTool.element.findelement(e.target as HTMLElement, 'card')
      if (card) {
        this.event.emit('network', card.id)
      }
    })
    operation.addEventListener('click', (e) => {
      let card = HtmlTool.element.findelement(e.target as HTMLElement, 'card')
      if (card) {
        this.event.emit('operation', card.id)
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

  load(datas: Compactor[]) {
    for (let i = 0; i < datas.length; i++) {
      this.append(datas[i])
    }
  }
}
