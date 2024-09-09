import { CheckTool } from '../../common/tools/check-tool/check.tool'
import { LocationTool } from '../../common/tools/location.tool'
import { DropPortConfig } from '../../data-core/models/arm/io/drop-port-config.model'
import { ResultArgs } from '../main/main.event'
import { DeviceDropPortDetailsBusiness } from './business/device-drop-port-details.business'
import { DeviceDropPortDetailsCreater as Creater } from './device-drop-port-details.creater'
import { DeviceDropPortDetailsHtmlController } from './device-drop-port-details.html.controller'
import { DeviceDropPortDetailsMessage } from './device-drop-port-details.message'

export namespace DeviceDropPortDetails {
  class Controller {
    constructor() {
      this.regist()
      this.init().then((x) => {
        this.load()
      })
    }

    private business = new DeviceDropPortDetailsBusiness()
    private message = new DeviceDropPortDetailsMessage()
    private html = new DeviceDropPortDetailsHtmlController()

    private data?: DropPortConfig

    private get id() {
      let querys = LocationTool.query.decode(location.search)
      return parseInt(querys.id)
    }
    private get count() {
      let querys = LocationTool.query.decode(location.search)
      return parseInt(querys.count)
    }

    private regist() {
      this.html.event.on('cancel', this.cancel.bind(this))
      this.html.event.on('ok', this.ok.bind(this))

      this.html.info.event.on('channel', this.onpicture.bind(this))
      this.html.chart.event.on('polygon', (polygon) => {
        if (this.data) {
          this.data.TrashCanArea = polygon
          this.html.chart.load(polygon)
        }
      })
    }

    private async init() {
      let channels = await this.business.channel.load()
      let outputs = await this.business.output.load()
      this.html.info.init(channels, outputs)
    }

    private async load() {
      this.data = await new Promise<DropPortConfig>((resolve) => {
        if (this.id) {
          this.business.get(this.id).then((data) => {
            resolve(data)
          })
        } else {
          let channelId = this.html.info.channel()
          let data = Creater.DropPortConfig(channelId)
          resolve(data)
        }
      })
      this.html.load(this.data)
    }

    private onpicture<T = string>(channelId: T) {
      this.business.picture(channelId).then((x) => {
        this.html.picture(x)
      })
    }

    ok() {
      let data = this.html.get(this.data)
      if (this.check(data)) {
        if (this.id) {
          this.update(data)
        } else {
          this.create(data)
        }
      }
    }
    cancel() {
      this.message.close()
    }

    check(data: DropPortConfig) {
      let result = CheckTool.DropPortConfig(data)
      if (!result.result && result.inner) {
        this.message.result(result)
      }
      return result.result
    }

    create(data: DropPortConfig) {
      data.Id = this.count + 1
      this.business
        .create(data)
        .then((x) => {
          let args: ResultArgs = {
            result: true,
          }
          this.message.result(args)
          this.message.close()
        })
        .catch((x) => {
          let args: ResultArgs = {
            result: false,
            message: `添加失败:<br/>${x.message}`,
          }
          this.message.result(args)
        })
    }
    update(data: DropPortConfig) {
      this.business
        .update(data)
        .then((x) => {
          let args: ResultArgs = {
            result: true,
          }
          this.message.result(args)
          this.message.close()
        })
        .catch((x) => {
          let args: ResultArgs = {
            result: false,
            message: `修改失败:<br/>${x.message}`,
          }
          this.message.result(args)
        })
    }
  }

  const controller = new Controller()
}
