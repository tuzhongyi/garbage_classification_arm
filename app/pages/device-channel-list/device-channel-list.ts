import { MessageBar } from '../../common/tools/controls/message-bar/message-bar'
import { InputProxyChannel } from '../../data-core/models/arm/input-proxy-channel.model'
import { DeviceChannelListBusiness } from './business/device-channel-list.business'
import { DeviceChannelListHtmlController } from './device-channel-list.html.controller'
import { DeviceChannelListMessage } from './device-channel-list.message'
import { DeviceChannelListWindow } from './device-channel-list.model'

export namespace DeviceChannelList {
  class Controller {
    constructor() {
      this.load()
      this.regist()
    }
    private html = new DeviceChannelListHtmlController()
    private business = new DeviceChannelListBusiness()
    private message = new DeviceChannelListMessage()
    private window = new DeviceChannelListWindow()
    datas: InputProxyChannel[] = []

    async load() {
      this.datas = await this.business.load()
      this.html.table.clear()
      this.html.table.load(this.datas)
    }

    regist() {
      this.html.table.event.on('modify', this.onmodify.bind(this))
      this.html.table.event.on('picture', this.onpicture.bind(this))

      this.html.event.on('create', this.oncreate.bind(this))
      this.html.event.on('search', this.onsearch.bind(this))
      this.html.event.on('discover', this.ondiscover.bind(this))
      this.message.event.on('load', this.load.bind(this))

      this.html.event.on('delete', this.ondelete.bind(this))
      this.message.event.on('todelete', this.todelete.bind(this))

      this.html.event.on('sync', this.onsync.bind(this))
      this.message.event.on('tosync', this.tosync.bind(this))
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
    onsync() {
      this.window.confirm.clear()
      this.window.confirm.message = '确定要同步吗?'
      this.message.sync_confirm(this.window.confirm)
    }
    tosync() {
      this.business.server.sync().then((x) => {
        if (x) {
          MessageBar.success('同步成功')
        } else {
          MessageBar.error('同步失败')
        }
      })
    }

    onpicture(id: string) {
      let channel = this.datas.find((x) => x.Id.toString() === id)
      if (channel) {
        this.window.picture.query.title = channel.Name
      }
      this.window.picture.query.img = this.business.picture(id)
      let width = window.innerWidth * 0.7
      let height = (width / 16) * 9 + 50
      this.window.picture.style.width = `${width}px`
      this.window.picture.style.height = `${height}px`
      this.message.picture(this.window.picture)
    }
    ondelete(ids: string[]) {
      this.window.confirm.ids = ids
      this.window.confirm.message = `确定要删除这 ${ids.length} 条记录吗?`
      this.message.delete_confirm(this.window.confirm)
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
      this.html.table.clear()
      if (text) {
        let datas = this.datas.filter((x) =>
          x.Name.toLowerCase().includes(text.toLowerCase())
        )
        this.html.table.load(datas)
      } else {
        this.html.table.load(this.datas)
      }
    }
  }

  let controller = new Controller()
}
