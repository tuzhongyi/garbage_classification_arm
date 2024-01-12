import { EventMessageProxy } from '../../common/event-message/event-message.proxy'
import { LocalStorageService } from '../../common/local-storage/local-storage.service'
import { DeviceRobotIndexEvent } from './device-robot-index.event'
import './device-robot-index.less'

export namespace DeviceRobotIndex {
  export class HtmlController {
    constructor() {
      this.regist()
      this.init()
    }

    index = LocalStorageService.navigation.device.robot.get()

    element = {
      items: document.getElementsByClassName('menu-item'),
      iframe: document.querySelector('#iframe') as HTMLIFrameElement,
    }

    message = new EventMessageProxy<DeviceRobotIndexEvent>(this.element.iframe)

    init() {
      if (this.element.items && this.element.items.length > 0) {
        this.onselect(
          this.element.items.item(this.index.index) as HTMLDivElement,
          this.index.id
        )
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

      this.message.event.on('config', (id) => {
        this.onselect(this.element.items[2] as HTMLDivElement, id)
      })
    }

    onselect(current: HTMLDivElement, id?: string) {
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
            this.element.iframe.src = this.factory(index, id)
            this.index = {
              index: index,
              id: id,
            }
            LocalStorageService.navigation.device.robot.save(this.index)
          }
        }
      }
    }

    private factory(index: number, id?: string): string {
      let params = ''
      if (id) {
        params = `?id=${id}`
      }

      switch (index) {
        case 0:
          return '../device-robot-list/device-robot-list.html'
        case 2:
          return `../device-robot-config/device-robot-config.html${params}`
        default:
          return ''
      }
    }
  }

  const controller = new HtmlController()
}
