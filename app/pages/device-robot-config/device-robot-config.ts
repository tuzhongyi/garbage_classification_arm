import { MessageBar } from '../../common/tools/controls/message-bar/message-bar'
import { LocationTool } from '../../common/tools/location.tool'
import { DeviceRobotConfigBusiness } from './device-robot-config.business'
import { DeviceRobotConfigHtmlController } from './device-robot-config.html.controller'

export namespace DeviceRobotConfig {
  class Controller {
    constructor() {
      this.regist()
    }
    private html = new DeviceRobotConfigHtmlController()
    private business = new DeviceRobotConfigBusiness()
    get id() {
      let querys = LocationTool.query.decode(location.search)
      return querys.id
    }
    regist() {
      this.html.event.on('download', this.download.bind(this))
      this.html.event.on('upload', this.upload.bind(this))
    }

    download() {
      this.business.download(this.id)
    }
    upload(file: string) {
      this.business
        .upload(this.id, file)
        .then((x) => {
          MessageBar.success('上传成功！')
        })
        .catch((x) => {
          MessageBar.error('上传失败！')
        })
    }
  }

  const controller = new Controller()
}
