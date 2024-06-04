import { EventEmitter } from '../../common/event-emitter'
import { LocalStorageService } from '../../common/local-storage/local-storage.service'
import { ArmMainEventArgs } from './main.event'
import './main.less'
import navigation from './main.navigation.json'

interface IEnumItem {
  id: string
  name: string
  children?: IEnumItem[]
}

export class ArmMainHtmlController {
  element = {
    menu: document.querySelector('.menu') as HTMLDivElement,
    logout: document.querySelector('#logout') as HTMLDivElement,
    iframe: document.querySelector('#iframe') as HTMLIFrameElement,
    username: document.getElementById('username') as HTMLElement,
    guide: document.getElementById('guide') as HTMLElement,
    help: document.getElementById('help') as HTMLElement,
  }

  event: EventEmitter<ArmMainEventArgs> = new EventEmitter()
  navigation = LocalStorageService.navigation.get()

  constructor() {
    this.init()
    this.regist()
    this._load()
  }

  private regist() {
    this.element.logout.addEventListener('click', () => {
      this.event.emit('logout')
    })
    this.element.guide.addEventListener('click', () => {
      location.href = '../guide/guide.html'
    })
    this.element.help.addEventListener('click', () => {
      window.open('../help/help.html', '_blank')
    })
  }

  private init() {
    let json = navigation as unknown as { [key: string]: IEnumItem }
    let index = 0
    for (const key in json) {
      let classname = ['menu-item', 'main']
      let item = json[key]
      let div = this.create(item.id, item.name, classname, key)
      this.element.menu.appendChild(div)

      if (item.children) {
        for (let i = 0; i < item.children.length; i++) {
          const child = item.children[i]
          let classname = ['menu-item', 'sub']

          let div = this.create(child.id, child.name, classname, key)
          this.element.menu.appendChild(div)
        }
      }
      index++
    }
  }
  private create(id: string, inner: string, classname: string[], type: string) {
    let div = document.createElement('div')
    div.className = `menu-item ${classname.join(' ')}`
    div.innerHTML = inner
    div.setAttribute('type', type)
    div.id = id
    div.addEventListener('click', (e: Event) => {
      this.onclick(e)
    })
    return div
  }

  private _load() {
    let main = document.getElementById(this.navigation.extend) as HTMLDivElement
    main.classList.add('extend')
    this.onextend(main)
    let sub = document.getElementById(
      this.navigation.selected
    ) as HTMLDivElement
    sub.classList.add('selected')
    this.onselect(sub, this.src)
  }

  private onclick(e: Event) {
    let div = e.target as HTMLDivElement
    if (div.classList.contains('main')) {
      this.onmainclick(div)
    } else {
      this.onsubclick(div)
    }
  }

  private onmainclick(div: HTMLDivElement) {
    if (this.navigation.extend !== div.id) {
      this.onextend(div)
      this.navigation.extend = div.id
      let json = navigation as unknown as { [key: string]: IEnumItem }
      let children = json[div.id].children
      if (children && children.length > 0) {
        this.navigation.selected = children[0].id
      }
      let sub = document.getElementById(
        this.navigation.selected
      ) as HTMLDivElement
      this.onselect(sub, this.src)
    }
    LocalStorageService.navigation.save(this.navigation)
  }
  private onsubclick(div: HTMLDivElement) {
    this.navigation.selected = div.id
    this.onselect(div, this.src)
    LocalStorageService.navigation.save(this.navigation)
  }

  private get src() {
    switch (this.navigation.selected) {
      case 'system_device':
        return '../system-device-index/system-device-index.html'
      case 'system_status':
        return '../system-status-index/system-status-index.html'
      case 'system_maintain':
        return '../system-maintain-index/system-maintain-index.html'
      case 'network_config':
        return '../network-config-index/network-config-index.html'
      case 'network_server':
        return '../network-server-index/network-server-index.html'
      case 'device_channel':
        return '../device-channel-index/device-channel-index.html'
      case 'device_robot':
        return '../device-robot-index/device-robot-index.html'
      case 'device_sortation':
        return '../device-sortation-index/device-sortation-index.html'
      case 'device_trashcan':
        return '../device-trashcan-index/device-trashcan-index.html'
      case 'ai_model':
        return '../ai-model-index/ai-model-index.html'
      case 'ai_event':
        return '../ai-event-index/ai-event-index.html'
      case 'ai_server':
        return '../ai-analysis-server-index/ai-analysis-server-index.html'
      case 'event_record':
        return '../event-record-index/event-record-index.html'
      default:
        return ''
    }
  }

  private onextend(current: HTMLDivElement) {
    let extend = document.querySelector('.extend') as HTMLDivElement
    extend.classList.remove('extend')
    current.classList.add('extend')
  }
  private onselect(current: HTMLDivElement, path: string) {
    let selected = document.querySelector('.selected') as HTMLDivElement
    if (selected) {
      selected.classList.remove('selected')
      if (
        (selected.id === 'device_robot' && current.id !== 'device_robot') ||
        (selected.id === 'device_sortation' &&
          current.id !== 'device_sortation')
      ) {
        LocalStorageService.navigation.device.robot.clear()
        LocalStorageService.navigation.device.sortation.clear()
      }
    }
    current.classList.add('selected')
    if (this.element.iframe) {
      this.element.iframe.src = path
    }
  }
  load(username: string) {
    this.element.username.innerHTML = username
  }
}
