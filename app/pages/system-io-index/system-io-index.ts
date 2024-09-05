import { LocalStorageService } from '../../common/local-storage/local-storage.service'
import './system-io-index.less'
import { SystemIOIndexMessage } from './system-io-index.message'

export namespace SystemIOIndex {
  export class HtmlController {
    constructor() {
      this.regist()
      this.init()
    }

    index = LocalStorageService.navigation.system.io.get()

    element = {
      items: document.getElementsByClassName('menu-item'),
      iframe: document.querySelector('#iframe') as HTMLIFrameElement,
    }
    private message = new SystemIOIndexMessage(this.element.iframe)

    init() {
      if (this.element.items && this.element.items.length > 0) {
        this.onselect(this.element.items.item(this.index) as HTMLDivElement)
      }
    }

    regist() {
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
            LocalStorageService.navigation.system.io.save(this.index)
          }
        }
      }
    }

    private factory(index: number): string {
      switch (index) {
        case 0:
          return '../system-io-input/system-io-input.html'
        case 1:
          return '../system-io-output/system-io-output.html'
        default:
          return ''
      }
    }
  }

  const controller = new HtmlController()
}
