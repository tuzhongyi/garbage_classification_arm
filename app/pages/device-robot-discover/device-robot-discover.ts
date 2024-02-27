import { RobotSearchResult } from '../../data-core/models/robot/robot-search-result.model'
import { DeviceRobotDiscoverBusiness } from './device-robot-discover.business'
import { DeviceRobotDiscoverHtmlController } from './device-robot-discover.html.controller'
import { DeviceRobotDiscoverMessage } from './device-robot-discover.message'

export namespace DeviceRobotDiscover {
  class Controller {
    constructor() {
      this.regist()
      this.load()
    }
    html = new DeviceRobotDiscoverHtmlController()
    business = new DeviceRobotDiscoverBusiness()
    message = new DeviceRobotDiscoverMessage()
    datas: RobotSearchResult[] = []

    async load() {
      this.datas = await this.business.load()
      this.html.load(this.datas)
    }

    regist() {
      this.html.event.on('search', (text) => {
        this.onsearch(text)
      })
      this.html.event.on('refresh', () => {
        this.onrefresh()
      })
      this.html.event.on('ok', () => {
        this.onok()
      })
      this.html.event.on('cancel', () => {
        this.oncancel()
      })
    }

    onok() {
      if (this.html.selecteds.length > 0) {
        let datas: RobotSearchResult[] = []
        this.datas.forEach((x) => {
          if (this.html.selecteds.includes(x.HostAddress)) {
            datas.push(x)
          }
        })
        this.business
          .create(datas)
          .then((x) => {
            this.message.result({
              result: true,
            })
            this.message.close()
          })
          .catch((e) => {
            this.message.result({
              result: false,
            })
          })
      }
    }
    oncancel() {
      this.message.close()
    }
    onrefresh() {
      this.datas = []
      this.load()
    }

    onsearch(text: string) {
      if (text) {
        let datas = this.datas.filter((x) =>
          x.HostAddress.toLowerCase().includes(text.toLowerCase())
        )
        this.html.load(datas)
      } else {
        this.html.load(this.datas)
      }
    }
  }

  let controller = new Controller()
}
