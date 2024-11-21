import { MessageBar } from '../../common/tools/controls/message-bar/message-bar'
import { LocationTool } from '../../common/tools/location.tool'
import { Compactor } from '../../data-core/models/compactor/compactor.model'
import { DeviceCompactorInfoBusiness } from './business/device-compactor-info.business'
import { DeviceCompactorInfoHtmlController } from './device-compactor-info.html.controller'
import { DeviceCompactorInfoMessage } from './device-compactor-info.message'
import { DeviceCompactorInfoWindow } from './device-compactor-info.window'

export namespace DeviceCompactorInfo {
  class Controller {
    constructor() {
      this.regist()
      this.load()
    }
    private html = new DeviceCompactorInfoHtmlController()
    private business = new DeviceCompactorInfoBusiness()
    private message = new DeviceCompactorInfoMessage()
    private window = new DeviceCompactorInfoWindow()
    get id() {
      let querys = LocationTool.query.decode(location.search)
      return querys.id
    }

    data?: Compactor

    async load() {
      this.business.robot.load().then((x) => {
        this.html.node.init(x)
      })
      if (this.id) {
        this.business.load(this.id).then((x) => {
          this.data = x
          this.html.load(this.data)
        })
      }
    }

    regist() {
      this.html.event.on('save', this.onsave.bind(this))
      this.html.node.event.on('robot', (id) => {
        this.business.robot.nodes(id).then((x) => {
          this.html.node.nodes(x)
        })
      })
      this.message.event.on('save', () => {
        if (this.data) {
          this.onupdate(this.data)
        }
      })
    }

    onsave() {
      this.window.confirm.message = '是否保存设备信息参数？'
      this.message.save_confirm(this.window.confirm)
    }

    onupdate(data: Compactor) {
      data = this.html.get(data)
      this.business
        .update(data)
        .then((x) => {
          MessageBar.success('保存成功')
        })
        .catch((e) => {
          MessageBar.error('保存失败')
        })
    }
  }

  const controller = new Controller()
}
