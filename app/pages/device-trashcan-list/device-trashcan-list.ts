import { DeviceTrashCanListBusiness } from './business/device-trashcan-list.business'
import { DeviceTrashCanListHtmlController } from './device-trashcan-list.html.controller'
import { DeviceTrashCanListMessage } from './device-trashcan-list.message'
import {
  DeviceTrashCanListWindow,
  DeviceTrashCanModel,
} from './device-trashcan-list.model'

export namespace DeviceTrashCanList {
  class Controller {
    constructor() {
      this.load()
      this.regist()
    }
    private html = new DeviceTrashCanListHtmlController()
    private business = new DeviceTrashCanListBusiness()
    private message = new DeviceTrashCanListMessage()
    private window = new DeviceTrashCanListWindow()
    datas: DeviceTrashCanModel[] = []

    async load() {
      this.datas = await this.business.load()
      this.html.table.clear()
      this.html.table.load(this.datas)
    }

    regist() {
      this.html.table.event.on('picture', this.onpicture.bind(this))
    }

    async onpicture(id: string) {
      let channel = await this.business.channel.get(id)

      if (!channel) {
        return
      }
      this.window.picture.query.title = channel.Name
      this.window.picture.query.img = this.business.channel.picture(channel.Id)
      let width = window.innerWidth * 0.7
      let height = (width / 16) * 9 + 50
      this.window.picture.style.width = `${width}px`
      this.window.picture.style.height = `${height}px`
      this.message.picture(this.window.picture)
    }
  }

  let controller = new Controller()
}
