import { EventEmitter } from '../../common/event-emitter'
import { LocalStorageService } from '../../common/local-storage/local-storage.service'
import { ArmMainEventArgs } from './main.event'
import './main.less'
import { ArmPagePath } from './main.model'
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
  }

  event: EventEmitter<ArmMainEventArgs> = new EventEmitter()
  navigation = LocalStorageService.navigation.get()

  constructor() {
    this.init()
    this.load()
  }

  init() {
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
  create(id: string, inner: string, classname: string[], type: string) {
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

  load() {
    let main = document.getElementById(this.navigation.extend) as HTMLDivElement
    main.classList.add('extend')
    this.onextend(main)
    let sub = document.getElementById(
      this.navigation.selected
    ) as HTMLDivElement
    sub.classList.add('selected')
    this.onselect(sub, this.src)
  }

  onclick(e: Event) {
    let div = e.target as HTMLDivElement
    if (div.classList.contains('main')) {
      this.onmainclick(div)
    } else {
      this.onsubclick(div)
    }
  }

  onmainclick(div: HTMLDivElement) {
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
  onsubclick(div: HTMLDivElement) {
    this.navigation.selected = div.id
    this.onselect(div, this.src)
    LocalStorageService.navigation.save(this.navigation)
  }

  get src() {
    switch (this.navigation.selected) {
      case 'system_device':
        return ArmPagePath.system_device_index
      case 'system_status':
        return ArmPagePath.system_status_index
      case 'system_maintain':
        return ArmPagePath.system_maintain_index
      case 'network_config':
        return ArmPagePath.network_config_index
      case 'network_server':
        return ArmPagePath.network_server_index
      case 'device_channel':
        return ArmPagePath.device_channel_index
      case 'device_robot':
        return ArmPagePath.device_robot_index
      default:
        return ''
    }
  }

  onextend(current: HTMLDivElement) {
    let extend = document.querySelector('.extend') as HTMLDivElement
    extend.classList.remove('extend')
    current.classList.add('extend')
  }
  onselect(current: HTMLDivElement, path: string) {
    let selected = document.querySelector('.selected') as HTMLDivElement
    if (selected) {
      selected.classList.remove('selected')
    }
    current.classList.add('selected')
    if (this.element.iframe) {
      this.element.iframe.src = path
    }
  }
}
