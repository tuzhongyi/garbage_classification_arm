import { CheckTool } from '../../common/tools/check-tool/check.tool'
import { MessageBar } from '../../common/tools/controls/message-bar/message-bar'
import { CalibrationAreaType } from '../../data-core/enums/calibration_area_type.enum'
import { LensType } from '../../data-core/enums/lens-type.enum'
import { MeshNodeType } from '../../data-core/enums/robot/mesh-node-type.model'
import { Resolution } from '../../data-core/models/arm/analysis/resolution.model'
import { ChannelCalibration } from '../../data-core/models/arm/channel-calibration.model'
import { DeviceChannelCalibrationBusiness } from './business/device-channel-calibration.business'
import { DeviceChannelCalibrationChart } from './controller/chart/device-channel-calibration-chart'
import { DeviceChannelCalibrationInfo } from './controller/info/device-channel-calibration-info'
import { DeviceChannelCalibrationTable } from './controller/table/device-channel-calibration-table'
import { DeviceChannelCalibrationCreater as Creater } from './device-channel-calibration.creater'
import { DeviceChannelCalibrationHtmlController } from './device-channel-calibration.html.controller'
import { DeviceChannelCalibrationModel } from './device-channel-calibration.model'

export namespace DeviceChannelCalibration {
  class Controller {
    constructor() {
      this.regist()
      this.init()
    }
    private html = new DeviceChannelCalibrationHtmlController()
    private business = new DeviceChannelCalibrationBusiness()
    model = new DeviceChannelCalibrationModel()
    chart = new DeviceChannelCalibrationChart(this.html, this.business, () => {
      return this.model
    })
    table = new DeviceChannelCalibrationTable(this.html, this.business, () => {
      return this.model
    })
    info = new DeviceChannelCalibrationInfo(this.html, this.business, () => {
      return this.model
    })

    async init() {
      this.model = await this.business.source()
      this.html.load(this.model.robots, this.model.channels)
    }

    load(channelId: number, resolution?: Resolution) {
      this.clear()
      this.business.channel.calibration
        .get(channelId)
        .then((x) => {
          this.model.data = x
          this.model.data.Resolution = resolution ?? this.model.data.Resolution

          this.html.details.chart.load(
            this.model.data.Resolution,
            this.model.data.Areas?.map((x) => x.Polygon),
            this.model.data.Points?.map((x) => x.Coordinate)
          )
          this.html.details.table.load(
            this.model.data.Areas,
            this.model.data.Points,
            this.model.data.Resolution
          )

          this.loadAreaType()
        })
        .catch((e) => {
          this.model.data = Creater.Calibration(resolution)
          this.model.data = this.html.get(this.model.data)
        })
    }

    regist() {
      this.html.event.on('selectAreaType', (type) => {
        this.selectAreaType(type)
      })
      this.html.event.on('selectLensType', (type) => {
        this.selectLensType(type)
      })
      this.html.event.on('selectRobot', (id) => {
        this.selectRobot(id)
      })
      this.html.event.on('selectChannel', (id) => {
        this.selectChannel(id)
      })
      this.html.event.on('save', () => {
        this.save()
      })
    }

    async selectRobot(id: string) {
      let robot = await this.business.robot.get(id)
      if (robot) {
        this.model.data.RobotId = robot.Id
        this.model.data.RobotName = robot.Name
      }
    }
    async selectChannel(id: number) {
      let channel = await this.business.channel.get(id)
      if (channel) {
        this.model.data.ChannelId = channel.Id
      }
      let url = this.business.channel.picture(id)
      this.html.set
        .picture(url)
        .then((x) => {
          this.load(id, x)
        })
        .catch((e) => {
          this.load(id)
        })
    }

    loadAreaType() {
      if (this.model.data.Areas) {
        for (let i = 0; i < this.model.data.Areas.length; i++) {
          const area = this.model.data.Areas[i]

          if (area.AreaType === CalibrationAreaType.DropPort) {
            this.html.properties.areaType.set(CalibrationAreaType.DropPort)
          } else {
            this.html.properties.areaType.set(CalibrationAreaType.StorePort)
          }
          return
        }
      }
      if (this.model.data.Points) {
        for (let i = 0; i < this.model.data.Points.length; i++) {
          const point = this.model.data.Points[i]
          if (point.NodeType === MeshNodeType.DropPort) {
            this.html.properties.areaType.set(CalibrationAreaType.DropPort)
          } else {
            this.html.properties.areaType.set(CalibrationAreaType.StorePort)
          }
          return
        }
      }
    }

    selectAreaType(type: CalibrationAreaType) {
      this.html.details.chart.display(type)
    }
    selectLensType(type: LensType) {
      this.model.data.LensType = type
    }

    clear() {
      this.html.details.chart.clear({ data: true, current: true })
      this.html.details.table.clear()
    }

    check(data: ChannelCalibration) {
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
  }

  const controller = new Controller()
}
