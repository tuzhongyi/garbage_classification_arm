import { LocaleCompare } from '../../common/tools/compare-tool/compare.tool'
import { MessageBar } from '../../common/tools/controls/message-bar/message-bar'
import { Sort } from '../../common/tools/html-tool/html-table-sort.tool'
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
    html = new DeviceChannelListHtmlController()
    business = new DeviceChannelListBusiness()
    message = new DeviceChannelListMessage()
    window = new DeviceChannelListWindow()
    datas: InputProxyChannel[] = []
    sort?: Sort
    async load() {
      this.datas = await this.business.load()
      if (this.sort) {
        this.tosort(this.sort)
      }
      this.html.element.table.load(this.datas)
    }

    regist() {
      this.html.element.table.event.on('modify', this.onmodify.bind(this))
      this.html.element.table.event.on('sort', this.onsort.bind(this))

      this.html.event.on('create', this.oncreate.bind(this))
      this.html.event.on('search', this.onsearch.bind(this))
      this.html.event.on('discover', this.ondiscover.bind(this))
      this.message.event.on('load', this.load.bind(this))

      this.html.event.on('delete', this.ondelete.bind(this))
      this.message.event.on('todelete', this.todelete.bind(this))

      this.html.event.on('sync', this.onsync.bind(this))
      this.message.event.on('tosync', this.tosync.bind(this))
    }
    tosort(sort: Sort) {
      this.datas = this.datas.sort((a: any, b: any) => {
        let _a = a
        let _b = b
        switch (sort.active) {
          case 'HostAddress':
          case 'PortNo':
          case 'ProtocolType':
          case 'DeviceModel':
          case 'SerialNumber':
            _a = a.SourceChannel
            _b = b.SourceChannel
            break
          default:
            break
        }
        return LocaleCompare.compare(
          _a[sort.active],
          _b[sort.active],
          sort.direction === 'asc'
        )
      })
    }
    onsort(sort: Sort) {
      this.sort = sort
      this.tosort(sort)
      this.html.element.table.load(this.datas)
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
