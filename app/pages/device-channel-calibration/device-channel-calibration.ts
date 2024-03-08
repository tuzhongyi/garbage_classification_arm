import { CheckTool } from '../../common/tools/check-tool/check.tool'
import { MessageBar } from '../../common/tools/controls/message-bar/message-bar'
import { CalibrationAreaType } from '../../data-core/enums/calibration_area_type.enum'
import { LensType } from '../../data-core/enums/lens-type.enum'
import { Resolution } from '../../data-core/models/arm/analysis/resolution.model'
import { ChannelCalibration } from '../../data-core/models/arm/channel-calibration.model'
import { DeviceChannelCalibrationBusiness } from './business/device-channel-calibration.business'
import { DeviceChannelCalibrationChart } from './controller/chart/device-channel-calibration-chart'
import { DeviceChannelCalibrationInfo } from './controller/info/device-channel-calibration-info'
import { DeviceChannelCalibrationTable } from './controller/table/device-channel-calibration-table'
import { DeviceChannelCalibrationCreater as Creater } from './device-channel-calibration.creater'
import { DeviceChannelCalibrationEvent } from './device-channel-calibration.event'
import { DeviceChannelCalibrationHtmlController } from './device-channel-calibration.html.controller'
import { DeviceChannelCalibrationMessage } from './device-channel-calibration.message'
import { DeviceChannelCalibrationModel } from './device-channel-calibration.model'

export namespace DeviceChannelCalibration {
  class Controller implements DeviceChannelCalibrationEvent {
    constructor() {
      this.regist()
      this.init()
    }
    private html = new DeviceChannelCalibrationHtmlController()
    private business = new DeviceChannelCalibrationBusiness()
    private message = new DeviceChannelCalibrationMessage()
    model = new DeviceChannelCalibrationModel()
    info = new DeviceChannelCalibrationInfo(
      this.html,
      () => {
        return this.model
      },
      this.business
    )
    table = new DeviceChannelCalibrationTable(
      this.html,
      () => {
        return this.model
      },
      this.business,
      this.info
    )
    chart = new DeviceChannelCalibrationChart(this.html, this.business, () => {
      return this.model
    })

    async init() {
      this.model = await this.business.source()
      this.html.init(this.model.robots, this.model.channels)
    }

    private load(channelId: number, resolution?: Resolution) {
      this.clear()
      this.business.channel.calibration
        .get(channelId)
        .then((x) => {
          // let robot = this.model.robots.find((robot) => robot.Id === x.RobotId)
          // if (!robot) {
          //   confirm('是否保存')
          // }

          this.model.data = x
          this.model.data.Resolution = resolution ?? this.model.data.Resolution
        })
        .catch((e) => {
          this.model.data = Creater.Calibration(resolution)
          this.model.data = this.html.get(this.model.data)
        })
        .finally(() => {
          this.html.load(this.model.data)
        })
    }

    private regist() {
      this.html.event.on('selectAreaType', this.selectAreaType.bind(this))
      this.html.event.on('selectLensType', this.selectLensType.bind(this))
      this.html.event.on('selectRobot', this.selectRobot.bind(this))
      this.html.event.on('selectChannel', this.selectChannel.bind(this))
      this.html.event.on('save', this.save.bind(this))
      this.message.event.on('save', this.confirmsave.bind(this))
    }

    private clear() {
      this.html.details.chart.clear({ data: true, current: true })
      this.html.details.table.clear()
    }

    private check(data: ChannelCalibration) {
      let args = CheckTool.ChannelCalibration(
        data,
        this.html.properties.areaType.get()
      )
      if (args.result) {
        return true
      }
      MessageBar.warning(args.message)
      return false
    }

    confirmsave() {
      if (this.model.robots && this.model.robots.length > 0) {
        this.model.data.RobotId = this.model.robots[0].Id
        this.html.load(this.model.data)
        this.save()
      } else {
        MessageBar.error('没找到机器人')
      }
    }

    save() {
      this.model.data = this.html.get(this.model.data)

      if (this.check(this.model.data)) {
        this.business.channel.calibration
          .set(this.model.data)
          .then((x) => {
            MessageBar.success('保存成功')
            this.load(x.ChannelId)
          })
          .catch((e) => {
            MessageBar.error('保存失败')
          })
      }
    }

    async selectRobot(id: string) {
      if (id) {
        let robot = await this.business.robot.get(id)
        if (robot) {
          this.model.data.RobotId = robot.Id
          this.model.data.RobotName = robot.Name
        }
      } else {
        this.message.save_confirm()
      }
    }
    async selectChannel(id: number) {
      let channel = await this.business.channel.get(id)
      if (channel) {
        this.model.data.ChannelId = channel.Id
      }
      let url = this.business.channel.picture(id)
      this.html
        .picture(url)
        .then((x) => {
          this.load(id, x)
        })
        .catch((e) => {
          this.load(id)
        })
    }

    selectAreaType(type: CalibrationAreaType) {
      this.html.details.chart.display(type)
    }
    selectLensType(type: LensType) {
      this.model.data.LensType = type
    }
  }

  const controller = new Controller()
}
