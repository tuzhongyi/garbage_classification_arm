import { DropPortConfig } from '../../data-core/models/arm/io/drop-port-config.model'
import { CavnasParams } from '../window-picture/window-picture.model'
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
      this.datas = await this.business.test()
      this.html.table.clear()
      this.html.table.load(this.datas)
    }

    regist() {
      this.html.table.event.on('picture', this.onpicture.bind(this))
    }

    async onpicture(data: DropPortConfig) {
      let channel = await this.business.channel.get(data.ChannelId)

      if (!channel) {
        return
      }
      this.window.picture.query.title = channel.Name
      this.window.picture.query.img = this.business.channel.picture(channel.Id)
      let params = new CavnasParams()
      params.area = data.TrashCanArea
      this.window.picture.query.areas = JSON.stringify([params])
      let width = window.innerWidth * 0.7
      let height = (width / 16) * 9 + 50
      this.window.picture.style.width = `${width}px`
      this.window.picture.style.height = `${height}px`

      this.message.picture(this.window.picture)
    }
  }

  let controller = new Controller()
}
