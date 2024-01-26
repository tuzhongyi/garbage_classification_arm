import { EventMessageClient } from '../../common/event-message/event-message.client'
import { MessageBar } from '../../common/tools/message-bar/message-bar'
import { InputProxyChannel } from '../../data-core/models/arm/input-proxy-channel.model'
import { DeviceChannelListBusiness } from './device-channel-list.business'
import { DeviceChannelListHtmlController } from './device-channel-list.html.controller'
import { DeviceChannelWindow } from './device-channel-list.model'

export namespace DeviceChannelList {
  class Controller {
    constructor() {
      this.init()
      this.regist()
    }
    html = new DeviceChannelListHtmlController()
    business = new DeviceChannelListBusiness()
    message = new EventMessageClient(['open'])
    window = new DeviceChannelWindow()
    datas: InputProxyChannel[] = []
    async init() {
      this.datas = await this.business.load()

      this.html.element.table.load(this.datas)
    }

    regist() {
      this.html.element.table.event.on('modify', (id: string) => {
        this.onmodify(id)
      })
      this.html.event.on('create', () => {
        this.oncreate()
      })
      this.html.event.on('delete', (ids) => {
        this.ondelete(ids)
      })
      this.html.event.on('search', (text) => {
        this.onsearch(text)
      })
      this.html.event.on('discover', () => {
        this.ondiscover()
      })
    }
    ondiscover() {
      this.message.sender.emit('open', this.window.discover)
    }
    oncreate() {
      this.window.details.clear()
      this.message.sender.emit('open', this.window.details)
    }
    onmodify(id: string) {
      console.log(`device-channel-list modify ${id}`)
      this.window.details.id = id
      this.message.sender.emit('open', this.window.details)
    }
    ondelete(ids: string[]) {
      this.business
        .delete(ids)
        .then((x) => {
          MessageBar.success('操作成功')
          this.init()
        })
        .catch((e) => {
          MessageBar.error('操作失败')
        })
    }

    onsearch(text: string) {
      if (text) {
        let datas = this.datas.filter((x) =>
          x.Name.toLowerCase().includes(text.toLowerCase())
        )
        this.html.element.table.load(datas)
      } else {
        this.html.element.table.load(this.datas)
      }
    }
  }

  let controller = new Controller()
}
