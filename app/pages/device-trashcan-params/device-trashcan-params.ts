import { MessageBar } from '../../common/tools/controls/message-bar/message-bar'
import { DeviceTrashCanParamsBusiness } from './device-trashcan-params.business'
import { DeviceTrashCanParamsHtmlController } from './device-trashcan-params.html.controller'
import { DeviceTrashCanParamsMessage } from './device-trashcan-params.message'
import { DeviceTrashCanParamsWindow } from './device-trashcan-params.window'

export namespace DeviceTrashCanParams {
  class Controller {
    constructor() {
      this.regist()
      this.load()
    }
    private html = new DeviceTrashCanParamsHtmlController()
    private business = new DeviceTrashCanParamsBusiness()
    private message = new DeviceTrashCanParamsMessage()
    private window = new DeviceTrashCanParamsWindow()

    private async load() {
      try {
        let data = await this.business.load()
        this.html.clear()
        this.html.load(data)
      } catch (error) {
        MessageBar.error('垃圾桶参数获取失败')
      }
    }

    private regist() {
      this.html.event.on('save', () => {
        this.window.confirm.message = '是否保存参数修改?'
        this.message.confirm(this.window.confirm)
      })
      this.message.event.on('save', this.save.bind(this))
    }

    private save() {
      let data = this.html.get()
      this.business
        .update(data)
        .then((x) => {
          MessageBar.success('保存成功')
          this.load()
        })
        .catch((e) => {
          MessageBar.error('保存失败')
        })
    }
  }

  const controller = new Controller()
}
