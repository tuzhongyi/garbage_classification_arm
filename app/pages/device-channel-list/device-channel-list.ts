import { MessageBar } from '../../common/tools/controls/message-bar/message-bar'
import { InputProxyChannel } from '../../data-core/models/arm/input-proxy-channel.model'
import { DeviceChannelListBusiness } from './device-channel-list.business'
import { DeviceChannelListHtmlController } from './device-channel-list.html.controller'
import { DeviceChannelListMessage } from './device-channel-list.message'
import { DeviceChannelListWindow } from './device-channel-list.model'

export namespace DeviceChannelList {
  class Controller {
    constructor() {
      this.load()
      this.regist()
    }
    html = new DeviceChannelListHtmlController()
    business = new DeviceChannelListBusiness()
    message = new DeviceChannelListMessage()
    window = new DeviceChannelListWindow()
    datas: InputProxyChannel[] = []
    async load() {
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
      this.message.event.on('load', () => {
        this.load()
      })
      this.message.event.on('todelete', () => {
        this.todelete()
      })
    }
    ondiscover() {
      this.message.discover(this.window.discover)
    }
    oncreate() {
      this.window.details.clear()
      this.message.create(this.window.details)
    }
    onmodify(id: string) {
      this.window.details.query.id = id
      this.message.modify(this.window.details)
    }
    ondelete(ids: string[]) {
      this.window.confirm.ids = ids
      this.window.confirm.message = `确定要删除这 ${ids.length} 条记录吗?`
      this.message.confirm(this.window.confirm)
    }
    todelete() {
      if (this.window.confirm.ids.length > 0) {
        this.business
          .delete(this.window.confirm.ids)
          .then((x) => {
            MessageBar.success('操作成功')
            this.load()
          })
          .catch((e) => {
            MessageBar.error('操作失败')
          })
      }
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
