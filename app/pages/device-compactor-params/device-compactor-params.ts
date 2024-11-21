import { MessageBar } from '../../common/tools/controls/message-bar/message-bar'
import { LocationTool } from '../../common/tools/location.tool'
import { CompactorParams } from '../../data-core/models/compactor/compactor-params.model'

import { DeviceCompactorParamsBusiness } from './device-compactor-params.business'
import { DeviceCompactorParamsHtmlController } from './device-compactor-params.html.controller'
import { DeviceCompactorParamsMessage } from './device-compactor-params.message'
import { DeviceCompactorParamsWindow } from './device-compactor-params.window'

export namespace DeviceCompactorParams {
  class Controller {
    constructor() {
      this.regist()
      this.load()
    }
    private html = new DeviceCompactorParamsHtmlController()
    private business = new DeviceCompactorParamsBusiness()
    private message = new DeviceCompactorParamsMessage()
    private window = new DeviceCompactorParamsWindow()
    get id() {
      let querys = LocationTool.query.decode(location.search)
      return querys.id
    }

    data?: CompactorParams

    async load() {
      if (this.id) {
        this.data = await this.business.load(this.id)
        this.html.load(this.data)
      }
    }

    regist() {
      this.html.event.on('save', () => {
        this.window.confirm.message = '是否保存设备参数？'
        this.message.save_confirm(this.window.confirm)
      })
      this.message.event.on('save', () => {
        this.onsave()
      })
    }

    onsave() {
      if (this.data) {
        let data = this.html.get(this.data)
        this.business
          .update(this.id, data)
          .then((x) => {
            MessageBar.success('保存成功')
          })
          .catch((e) => {
            MessageBar.error('保存失败')
          })
      }
    }
  }

  const controller = new Controller()
}
