import { MessageBar } from '../../common/tools/controls/message-bar/message-bar'
import { DropPortConfig } from '../../data-core/models/arm/io/drop-port-config.model'
import { DeviceDropPortListBusiness } from './business/device-drop-port-list.business'
import { DeviceDropPortListHtmlController } from './device-drop-port-list.html.controller'
import { DeviceDropPortListMessage } from './device-drop-port-list.message'
import {
  DeviceDropPortListWindow,
  DeviceDropPortModel,
} from './device-drop-port-list.model'

export namespace DeviceDropPortList {
  class Controller {
    constructor() {
      this.load()
      this.regist()
    }
    private html = new DeviceDropPortListHtmlController()
    private business = new DeviceDropPortListBusiness()
    private message = new DeviceDropPortListMessage()
    private window = new DeviceDropPortListWindow()
    datas: DeviceDropPortModel[] = []

    async load() {
      this.datas = await this.business.load()
      this.html.table.clear()
      this.html.table.load(this.datas)
    }

    regist() {
      this.html.table.event.on('delete', this.ondelete.bind(this))
      this.html.table.event.on('modify', this.onmodify.bind(this))
      this.html.event.on('create', this.oncreate.bind(this))
      this.message.event.on('load', this.load.bind(this))
      this.message.event.on('delete', this.todelete.bind(this))
    }

    oncreate() {
      this.window.details.query.id = undefined
      this.window.details.query.count = this.datas.length
      this.message.details(this.window.details)
    }

    onmodify(data: DropPortConfig) {
      this.window.details.query.id = data.Id
      this.message.details(this.window.details)
    }

    ondelete(data: DropPortConfig) {
      this.window.confirm.id = data.Id
      this.window.confirm.message = `确定要删除 ${data.Name} 吗？`
      this.message.delete(this.window.confirm)
    }
    todelete() {
      if (this.window.confirm.id) {
        this.business
          .delete(this.window.confirm.id)
          .then(() => {
            MessageBar.success('操作成功')
            this.load()
          })
          .catch((x) => {
            MessageBar.error('操作失败')
          })
      }
    }

    // async onpicture(data: DropPortConfig) {
    //   let channel = await this.business.channel.get(data.ChannelId)

    //   if (!channel) {
    //     return
    //   }
    //   this.window.picture.query.title = channel.Name
    //   this.window.picture.query.img = this.business.channel.picture(channel.Id)
    //   let params = new CavnasParams()
    //   params.area = data.TrashCanArea
    //   this.window.picture.query.areas = JSON.stringify([params])
    //   let width = window.innerWidth * 0.7
    //   let height = (width / 16) * 9 + 50
    //   this.window.picture.style.width = `${width}px`
    //   this.window.picture.style.height = `${height}px`

    //   this.message.picture(this.window.picture)
    // }
  }

  let controller = new Controller()
}
