import { MessageBar } from '../../common/tools/controls/message-bar/message-bar'
import { NetworkFrpListBusiness } from './business/network-frp-list.business'
import { NetworkFrpListHtmlController } from './network-frp-list.html.controller'
import { NetworkFrpListMessage } from './network-frp-list.message'
import { NetworkFrpListWindow } from './network-frp-list.model'

export namespace NetworkFrpList {
  class Controller {
    constructor() {
      this.load()
      this.regist()
    }
    private html = new NetworkFrpListHtmlController()
    private business = new NetworkFrpListBusiness()
    private message = new NetworkFrpListMessage()
    private window = new NetworkFrpListWindow()

    async load() {
      this.html.table.clear()
      let datas = await this.business.load()
      this.html.table.load(datas)
    }

    regist() {
      this.html.event.on('create', this.oncreate.bind(this))
      this.html.table.event.on('delete', this.ondelete.bind(this))
      this.message.event.on('todelete', () => {
        if (this.window.confirm.id) {
          this.todelete(this.window.confirm.id)
        }
      })
      this.message.event.on('load', this.load.bind(this))
    }

    oncreate() {
      this.message.open(this.window.details)
    }

    ondelete(id: string) {
      this.window.confirm.id = id
      this.window.confirm.message = '确定要删除这个映射吗?'
      this.message.delete_confirm(this.window.confirm)
    }

    todelete(id: string) {
      this.business
        .delete(id)
        .then((x) => {
          MessageBar.success('操作成功')
          this.load()
        })
        .catch((e) => {
          MessageBar.error('操作失败')
          console.error(e)
        })
    }
  }

  let controller = new Controller()
}
