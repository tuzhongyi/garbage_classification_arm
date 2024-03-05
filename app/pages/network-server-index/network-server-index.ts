import { LocalStorageService } from '../../common/local-storage/local-storage.service'
import { NetworkServerIndexCapability } from './network-server-index.capability'
import './network-server-index.less'
import { NetworkServerIndexMessage } from './network-server-index.message'

export namespace NetworkServerIndex {
  export class HtmlController {
    constructor() {
      this.regist()
      this.init()
    }

    capability = new NetworkServerIndexCapability()

    private index = LocalStorageService.navigation.network.server.get()

    private element = {
      items: document.getElementsByClassName('menu-item'),
      iframe: document.querySelector('#iframe') as HTMLIFrameElement,
    }

    message = new NetworkServerIndexMessage(this.element.iframe)

    private init() {
      if (this.element.items && this.element.items.length > 0) {
        this.onselect(this.element.items.item(this.index) as HTMLDivElement)
      }
    }

    private regist() {
      if (this.element.items) {
        for (let i = 0; i < this.element.items.length; i++) {
          const item = this.element.items[i]

          item.addEventListener('click', (e: Event) => {
            this.onselect(e.target as HTMLDivElement)
          })
        }
      }
    }

    onselect(current: HTMLDivElement) {
      let selected = document.querySelector('.selected') as HTMLDivElement
      if (selected) {
        selected.classList.remove('selected')
      }
      current.classList.add('selected')

      if (this.element.items) {
        let index = -1
        for (let i = 0; i < this.element.items.length; i++) {
          const item = this.element.items[i]
          if (item === current) {
            index = i
          }
        }
        if (index >= 0) {
          // this.event.emit('select', index)

          if (this.element.iframe) {
            this.element.iframe.src = this.factory(index)
            this.index = index
            LocalStorageService.navigation.network.server.save(this.index)
          }
        }
      }
    }

    private factory(index: number): string {
      switch (index) {
        case 0:
          return '../network-server-deployment/network-server-deployment.html'
        case 1:
          return '../network-server-platform/network-server-platform.html'
        default:
          return ''
      }
    }
  }

  const controller = new HtmlController()
}
