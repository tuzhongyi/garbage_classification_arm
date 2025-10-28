import { EventEmitter } from '../../common/event-emitter'
import { HtmlTool } from '../../common/tools/html-tool/html.tool'
import { RobotBattery } from '../../data-core/models/robot/robot-battery.model'
import { Robot } from '../../data-core/models/robot/robot.model'
import { DeviceRobotListEvent } from './device-robot-list.event'
import './device-robot-list.less'
export class DeviceRobotListHtmlController {
  element = {
    content: document.getElementById('content') as HTMLDivElement,
    template: document.getElementById('template') as HTMLElement,
    controls: {
      manual: document.getElementById('create-manual') as HTMLButtonElement,
      auto: document.getElementById('create-auto') as HTMLButtonElement,
    },
  }
  event: EventEmitter<DeviceRobotListEvent> = new EventEmitter()

  constructor() {
    this.regist()
  }

  private parser = new DOMParser()
  private cards: HTMLElement[] = []

  private regist() {
    this.element.controls.manual.addEventListener('click', () => {
      this.event.emit('create', false)
    })
    this.element.controls.auto.addEventListener('click', () => {
      this.event.emit('create', true)
    })
  }

  private append(robot: Robot, battery?: RobotBattery) {
    let document = this.parser.parseFromString(
      this.element.template.innerHTML,
      'text/html'
    )
    let card = document.body.firstElementChild as HTMLElement
    let Name = document.querySelector('.Name') as HTMLDivElement
    let Model = document.querySelector('.Model') as HTMLDivElement
    let SerialNumber = document.querySelector('.SerialNumber') as HTMLDivElement
    let DeviceType = document.querySelector('.DeviceType') as HTMLDivElement
    let ProtocolType = document.querySelector('.ProtocolType') as HTMLDivElement
    let HostAddress = document.querySelector('.HostAddress') as HTMLDivElement
    let PortNo = document.querySelector('.PortNo') as HTMLDivElement
    let OnlineState = document.querySelector('.OnlineState') as HTMLDivElement
    card.id = robot.Id
    Name.innerText = robot.Name ?? '-'
    Model.innerText = robot.Model ?? '-'
    SerialNumber.innerText = robot.SerialNumber ?? '-'
    DeviceType.innerText = robot.DeviceType ?? '-'
    ProtocolType.innerText = robot.ProtocolType ?? '-'
    HostAddress.innerText = robot.HostAddress ?? '-'
    PortNo.innerText = robot.PortNo.toString() ?? '-'
    if (!battery) {
      OnlineState.classList.add('offline')
    }

    let info = document.querySelector('.btn-info') as HTMLDivElement
    let calibration = document.querySelector(
      '.btn-calibration'
    ) as HTMLDivElement
    let play = document.querySelector('.btn-play') as HTMLDivElement
    let log = document.querySelector('.btn-log') as HTMLDivElement
    let config = document.querySelector('.btn-config') as HTMLDivElement
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
    config.addEventListener('click', (e) => {
      let card = HtmlTool.element.findelement(e.target as HTMLElement, 'card')
      if (card) {
        this.event.emit('config', card.id)
      }
    })
    log.addEventListener('click', (e) => {
      let card = HtmlTool.element.findelement(e.target as HTMLElement, 'card')
      if (card) {
        this.event.emit('log', card.id)
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

  async load(
    datas: Robot[],
    get: (id: string) => Promise<RobotBattery | undefined>
  ) {
    for (let i = 0; i < datas.length; i++) {
      let item = datas[i]
      let battery = await get(item.Id)
      this.append(datas[i], battery)
    }
  }
}
