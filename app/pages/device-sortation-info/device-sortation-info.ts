import { MessageBar } from '../../common/tools/controls/message-bar/message-bar'
import { Guid } from '../../common/tools/guid/guid'
import { LocationTool } from '../../common/tools/location.tool'
import { SortationDevice } from '../../data-core/models/sortation/sortation-device.model'
import { DeviceSortationInfoBusiness } from './device-sortation-info.business'
import { DeviceSortationInfoHtmlController } from './device-sortation-info.html.controller'

export namespace DeviceSortationInfo {
  class Controller {
    constructor() {
      this.regist()
      this.load()
    }
    private html = new DeviceSortationInfoHtmlController()
    private business = new DeviceSortationInfoBusiness()
    get id() {
      let querys = LocationTool.query.decode(location.search)
      return querys.id
    }

    data?: SortationDevice

    async load() {
      if (this.id) {
        this.data = await this.business.load(this.id)
        this.html.load(this.data)
      }
    }

    regist() {
      this.html.event.on('save', this.onsave.bind(this))
      this.html.event.on('test', this.ontest.bind(this))
    }

    onsave() {
      if (this.data) {
        this.onupdate(this.data)
      } else {
        this.oncreate()
      }
    }
    ontest() {
      this.business.load(this.id).then((data) => {
        let current = new SortationDevice()
        current = this.html.get(current)
        if (this.html.equals(data, current)) {
          this.business
            .test(this.id)
            .then((x) => {
              MessageBar.success('测试成功')
            })
            .catch((x) => {
              MessageBar.error('测试失败')
            })
        } else {
          MessageBar.confirm('是否保存设备信息？', (params: any) => {
            console.log(params)
          })
          MessageBar.warning('设备信息已修改，请先保存')
        }
      })
    }

    onupdate(data: SortationDevice) {
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
    oncreate() {
      let data = new SortationDevice()
      data.Id = Guid.NewGuid().ToString('N')
      data = this.html.get(data)
      this.business
        .create(data)
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
