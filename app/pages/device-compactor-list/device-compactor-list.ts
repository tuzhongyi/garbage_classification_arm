import { MessageBar } from '../../common/tools/controls/message-bar/message-bar'
import { Compactor } from '../../data-core/models/compactor/compactor.model'

import { DeviceCompactorListBusiness } from './device-compactor-list.business'
import { DeviceCompactorListHtmlController } from './device-compactor-list.html.controller'
import { DeviceCompactorListMessage } from './device-compactor-list.message'
import { DeviceCompactorWindow } from './device-compactor-list.model'

export namespace DeviceCompactorList {
  export class Controller {
    private html = new DeviceCompactorListHtmlController()
    private business = new DeviceCompactorListBusiness()
    private message = new DeviceCompactorListMessage()
    private window = new DeviceCompactorWindow()

    constructor() {
      this.regist()
      this.load()
    }

    datas: Compactor[] = []

    async load() {
      this.datas = (await this.business.load()) ?? []
      this.html.load(this.datas)
    }

    regist() {
      this.html.event.on('info', (id) => {
        this.message.info(id)
      })
      this.html.event.on('params', (id) => {
        this.message.params(id)
      })
      this.html.event.on('network', (id) => {
        this.message.network(id)
      })
      this.html.event.on('operation', (id) => {
        this.message.operation(id)
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
        this.window.confirm.message = `是否删除设备 ${
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
