import { LocalStorageService } from '../../common/local-storage/local-storage.service'
import { HtmlTool } from '../../common/tools/html-tool/html.tool'
import { DeviceRobotCapability } from '../device-robot/device-robot.capability'
import './device-robot-index.less'
import { DeviceRobotIndexMessage } from './device-robot-index.message'

export namespace DeviceRobotIndex {
  export class HtmlController {
    constructor() {
      this.regist()
      this.init()
    }
    capability = new DeviceRobotCapability()
    index = LocalStorageService.navigation.device.robot.get()

    element = {
      items: document.getElementsByClassName('menu-item'),
      iframe: document.querySelector('#iframe') as HTMLIFrameElement,
    }

    private message = new DeviceRobotIndexMessage(this.element.iframe)
    standby?: string

    init() {
      if (this.element.items && this.element.items.length > 0) {
        this.onselect(
          this.element.items.item(this.index.index) as HTMLDivElement,
          this.index.id
        )
      }
    }

    regist() {
      // 注册当前页面HTML事件
      if (this.element.items) {
        for (let i = 0; i < this.element.items.length; i++) {
          const item = this.element.items[i]

          item.addEventListener('click', (e: Event) => {
            let div = HtmlTool.element.findelement(
              e.target as HTMLElement,
              'menu-item'
            ) as HTMLDivElement
            this.onselect(div, this.index.id)
          })
        }
      }
      // 注册子页面触发事件
      this.message.event.on('info', (id) => {
        this.onselect(this.element.items[1] as HTMLDivElement, id)
      })
      this.message.event.on('calibration', (id) => {
        this.onselect(this.element.items[2] as HTMLDivElement, id)
      })
      this.message.event.on('play', (id) => {
        this.onselect(this.element.items[3] as HTMLDivElement, id)
      })
      this.message.event.on('log', (id) => {
        this.onselect(this.element.items[4] as HTMLDivElement, id)
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
        case 1:
          return `../device-robot-info/device-robot-info.html${params}`
        case 2:
          return `../device-robot-calibration/device-robot-calibration.html${params}`
        case 3:
          return `../device-robot-play/device-robot-play.html${params}`
        case 4:
          return `../device-robot-config/device-robot-config.html${params}`
        // case 4:
        //   return `../device-robot-log/device-robot-log.html${params}`
        default:
          return ''
      }
    }
  }

  const controller = new HtmlController()
}
