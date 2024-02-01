import { VideoSourceDescriptor } from '../../data-core/models/arm/video-source-descriptor.model'
import { DeviceChannelDiscoverBusiness } from './device-channel-discover.business'
import { DeviceChannelDiscoverHtmlController } from './device-channel-discover.html.controller'
import { DeviceChannelDiscoverMessage } from './device-channel-discover.message'
import { DeviceChannelWindow } from './device-channel-discover.model'

export namespace DeviceChannelDiscover {
  class Controller {
    constructor() {
      this.regist()
      this.load()
    }
    html = new DeviceChannelDiscoverHtmlController()
    business = new DeviceChannelDiscoverBusiness()
    message = new DeviceChannelDiscoverMessage()
    window = new DeviceChannelWindow()
    datas: VideoSourceDescriptor[] = []
    timeout = 10

    async load(index = 0) {
      if (index === this.timeout) return
      let has = await this.loading()
      index = has ? 0 : ++index
      setTimeout(() => {
        this.load(index)
      }, 1000)
    }

    async loading() {
      let datas = await this.business.load()
      let noincludes = []
      for (let i = 0; i < datas.length; i++) {
        const data = datas[i]
        let index = this.datas.findIndex(
          (x) => x.HostAddress == data.HostAddress
        )
        if (index < 0) {
          noincludes.push(data)
        }
      }
      this.html.element.table.load(noincludes)
      this.datas.push(...noincludes)
      return noincludes.length > 0
    }

    regist() {
      this.html.event.on('search', (text) => {
        this.onsearch(text)
      })
      this.html.event.on('refresh', () => {
        this.onrefresh()
      })
      this.html.event.on('password', () => {
        this.onpassword()
      })
      this.html.event.on('ok', () => {
        this.onok()
      })
      this.html.event.on('cancel', () => {
        this.oncancel()
      })
    }

    onok() {
      if (this.html.element.table.selecteds.length > 0) {
        let datas = this.datas.filter((x) =>
          this.html.element.table.selecteds.includes(x.Id.toString())
        )
        this.business
          .create(datas)
          .then((x) => {
            this.message.result({
              result: true,
            })
            this.message.close()
          })
          .catch((e) => {
            this.message.result({ result: false })
          })
      }
    }
    oncancel() {
      this.message.close()
    }
    onrefresh() {
      this.html.element.table.clear()
      this.datas = []
      this.load()
    }
    onpassword() {}

    onsearch(text: string) {
      this.html.element.table.clear()
      if (text) {
        let datas = this.datas.filter((x) =>
          x.HostAddress.toLowerCase().includes(text.toLowerCase())
        )
        this.html.element.table.load(datas)
      } else {
        this.html.element.table.load(this.datas)
      }
    }
  }

  let controller = new Controller()
}
