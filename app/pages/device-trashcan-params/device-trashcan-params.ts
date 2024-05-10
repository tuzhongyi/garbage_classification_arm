import { CheckTool } from '../../common/tools/check-tool/check.tool'
import { MessageBar } from '../../common/tools/controls/message-bar/message-bar'
import { TrashCanWarningParams } from '../../data-core/models/arm/analysis/trash-can-warning-params.model'
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
    private data?: TrashCanWarningParams

    private async load() {
      try {
        this.data = await this.business.load()
        this.html.clear()
        this.html.load(this.data)
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

    private check(data: TrashCanWarningParams): boolean {
      let result = CheckTool.TrashCanWarningParams(data)
      if (!result.result && result.inner) {
        MessageBar.warning(result.message ?? '操作失败')
      }
      return result.result
    }

    private save() {
      this.data = this.html.get(this.data)
      if (this.check(this.data)) {
        this.business
          .update(this.data)
          .then((x) => {
            MessageBar.success('保存成功')
            this.load()
          })
          .catch((e) => {
            MessageBar.error('保存失败')
          })
      }
    }
  }

  const controller = new Controller()
}
