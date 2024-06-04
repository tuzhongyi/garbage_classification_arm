import { MessageBar } from '../../common/tools/controls/message-bar/message-bar'
import { SortationDevice } from '../../data-core/models/sortation/sortation-device.model'

import { DeviceSortationListBusiness } from './device-sortation-list.business'
import { DeviceSortationListHtmlController } from './device-sortation-list.html.controller'
import { DeviceSortationListMessage } from './device-sortation-list.message'
import { DeviceSortationWindow } from './device-sortation-list.model'

export namespace DeviceSortationList {
  export class Controller {
    private html = new DeviceSortationListHtmlController()
    private business = new DeviceSortationListBusiness()
    private message = new DeviceSortationListMessage()
    private window = new DeviceSortationWindow()

    constructor() {
      this.regist()
      this.load()
    }

    datas: SortationDevice[] = []

    async load() {
      this.datas = (await this.business.load()) ?? []
      this.html.load(this.datas)
    }

    regist() {
      this.html.event.on('info', (id) => {
        this.message.info(id)
      })
      this.html.event.on('calibration', (id) => {
        this.message.calibration(id)
      })
      this.html.event.on('play', (id) => {
        this.message.play(id)
      })
      this.html.event.on('create', (auto) => {
        if (auto) {
          this.message.open(this.window.discover)
        } else {
          this.message.open(this.window.details)
        }
      })
      this.html.event.on('delete', (id) => {
        let data = this.datas.find((data) => data.Id === id)
        if (!data) return
        this.window.confirm.id = id
        this.window.confirm.message = `是否删除机器人 ${
          data.Name ?? data.HostAddress
        }`
        this.message.delete_confirm(this.window.confirm)
      })
      this.message.event.on('load', () => {
        this.html.clear()
        this.load()
      })
      this.message.event.on('todelete', () => {
        if (this.window.confirm.id) {
          this.todelete(this.window.confirm.id)
        }
      })
    }

    todelete(id: string) {
      this.business
        .delete(id)
        .then((x) => {
          MessageBar.success('操作成功')
          this.html.clear()
          this.load()
        })
        .catch((e) => {
          MessageBar.error('操作失败')
        })
    }
  }

  const controller = new Controller()
}
