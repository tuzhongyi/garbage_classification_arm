import { MessageBar } from '../../common/tools/message-bar/message-bar'
import { CalibrationAreaType } from '../../data-core/enums/calibration_area_type.enum'
import { LensType } from '../../data-core/enums/lens-type.enum'
import { MeshNodeType } from '../../data-core/enums/robot/mesh-node-type.model'
import { ChannelCalibrationArea } from '../../data-core/models/arm/analysis/channel-calibration-area.model'
import { ChannelCalibrationPoint } from '../../data-core/models/arm/analysis/channel-calibration-point.model'
import { Resolution } from '../../data-core/models/arm/analysis/resolution.model'
import { Polygon } from '../../data-core/models/arm/polygon.model'
import { MeshNodePosition } from '../../data-core/models/robot/mesh-node-position.model'
import { DeviceChannelCalibrationBusiness } from './business/device-channel-calibration.business'
import { DeviceChannelCalibrationConverter as Converter } from './device-channel-calibration.converter'
import { DeviceChannelCalibrationCreater as Creater } from './device-channel-calibration.creater'
import { DeviceChannelCalibrationHtmlController } from './device-channel-calibration.html.controller'
import {
  DeviceChannelCalibrationMode as CalibrationMode,
  DeviceChannelCalibrationModel,
} from './device-channel-calibration.model'

export namespace DeviceChannelCalibration {
  class ChartController {
    constructor(
      private html: DeviceChannelCalibrationHtmlController,
      private business: DeviceChannelCalibrationBusiness,
      private getModel: () => DeviceChannelCalibrationModel
    ) {
      this.regist()
    }

    get model() {
      return this.getModel()
    }

    regist() {
      this.html.details.chart.event.on('createPoint', (position) => {
        this.createPoint(position)
      })
      this.html.details.chart.event.on('createPolygon', (polygon) => {
        this.createPolygon(polygon)
      })
      this.html.details.chart.event.on('clear', () => {
        this.model.data.Areas = []
        this.model.data.Points = []
        this.clear()
      })
    }

    private clear() {
      this.html.details.table.clear()
    }

    private createPoint(position: MeshNodePosition) {
      if (!this.model.data.Points) {
        this.model.data.Points = []
      }
      let id = this.model.data.Points!.length + 1
      let type = this.html.properties.areaType.get()
      let _position = Converter.point.to(this.model.data.Resolution, position)
      let point = Creater.Point(id, type, _position)
      this.model.data.Points.push(point)

      this.html.details.chart.load(
        this.model.data.Areas?.map((x) =>
          Converter.polygon.from(this.model.data.Resolution, x.Polygon)
        ),
        this.model.data.Points?.map((x) =>
          Converter.point.from(this.model.data.Resolution, x.Coordinate)
        )
      )
      this.html.details.table.load(
        this.model.data.Areas,
        this.model.data.Points,
        this.model.data.Resolution
      )
      this.html.details.table.select(CalibrationMode.point, id)
    }
    private createPolygon(polygon: Polygon) {
      if (!this.model.data.Areas) {
        this.model.data.Areas = []
      }
      let id = this.model.data.Areas!.length + 1
      let type = this.html.properties.areaType.get()
      let _polygon = Converter.polygon.to(this.model.data.Resolution, polygon)
      let area = Creater.Area(id, type, _polygon)
      this.model.data.Areas.push(area)

      this.html.details.chart.load(
        this.model.data.Areas?.map((x) =>
          Converter.polygon.from(this.model.data.Resolution, x.Polygon)
        ),
        this.model.data.Points?.map((x) =>
          Converter.point.from(this.model.data.Resolution, x.Coordinate)
        )
      )
      this.html.details.table.load(
        this.model.data.Areas,
        this.model.data.Points,
        this.model.data.Resolution
      )
      this.html.details.table.select(CalibrationMode.polygon, id)
    }
  }
  class TableController {
    constructor(
      private html: DeviceChannelCalibrationHtmlController,
      private business: DeviceChannelCalibrationBusiness,
      private getModel: () => DeviceChannelCalibrationModel
    ) {
      this.regist()
    }

    get model() {
      return this.getModel()
    }

    regist() {
      this.html.details.table.event.on('select', (data) => {
        let robotId = this.model.data.RobotId
        let type = this.html.properties.areaType.get()
        let isdrop = type === CalibrationAreaType.DropPort
        if (isdrop) {
          this.html.details.info.loadAreaType([CalibrationAreaType.DropPort])
        } else {
          this.html.details.info.loadAreaType([
            CalibrationAreaType.StorePort,
            CalibrationAreaType.Ground,
          ])
        }

        this.business.robot.nodes(robotId, isdrop).then((nodes) => {
          this.html.details.info.loadNode(nodes, !isdrop)
          this.html.details.info.load(data)
        })

        if (data instanceof ChannelCalibrationPoint) {
          this.html.details.chart.selectPoint({
            point: Converter.point.from(
              this.model.data.Resolution,
              data.Coordinate
            ),
            text: `(${data.Coordinate.X},${data.Coordinate.Y})`,
          })
          this.html.details.chart.reload()
        } else if (data instanceof ChannelCalibrationArea) {
          this.html.details.chart.selectPolygon(
            Converter.polygon.from(this.model.data.Resolution, data.Polygon)
          )
          this.html.details.chart.reload()
        }
      })
      this.html.details.table.event.on('remove', (data) => {
        let index = -1
        if (data instanceof ChannelCalibrationPoint && this.model.data.Points) {
          index = this.model.data.Points.findIndex(
            (item) => item.No === data.No
          )
          this.model.data.Points.splice(index, 1)
        }
        if (data instanceof ChannelCalibrationArea && this.model.data.Areas) {
          index = this.model.data.Areas.findIndex((item) => item.No === data.No)
          this.model.data.Areas.splice(index, 1)
        }

        if (index >= 0) {
          this.html.details.chart.load(
            this.model.data.Areas?.map((x) =>
              Converter.polygon.from(this.model.data.Resolution, x.Polygon)
            ),
            this.model.data.Points?.map((x) =>
              Converter.point.from(this.model.data.Resolution, x.Coordinate)
            )
          )
        }
      })
    }
  }
  class InfoController {
    constructor(
      private html: DeviceChannelCalibrationHtmlController,
      private business: DeviceChannelCalibrationBusiness,
      private getModel: () => DeviceChannelCalibrationModel
    ) {
      this.regist()
    }

    get model() {
      return this.getModel()
    }

    private regist() {
      this.html.details.info.event.on('selectNode', (node) => {})
    }
  }

  class Controller {
    constructor() {
      this.regist()
      this.init()
    }
    html = new DeviceChannelCalibrationHtmlController()
    business = new DeviceChannelCalibrationBusiness()
    model = new DeviceChannelCalibrationModel()
    chart = new ChartController(this.html, this.business, () => {
      return this.model
    })
    table = new TableController(this.html, this.business, () => {
      return this.model
    })
    info = new InfoController(this.html, this.business, () => {
      return this.model
    })

    async init() {
      this.model = await this.business.source()
      this.html.load(this.model.robots, this.model.channels)
    }

    load(channelId: string, resolution?: Resolution) {
      this.business.channel.calibration
        .get(channelId)
        .then((x) => {
          this.model.data = x
          if (resolution) {
            this.model.data.Resolution = resolution
          }

          this.html.details.chart.load(
            this.model.data.Areas?.map((x) =>
              Converter.polygon.from(this.model.data.Resolution, x.Polygon)
            ),
            this.model.data.Points?.map((x) =>
              Converter.point.from(this.model.data.Resolution, x.Coordinate)
            )
          )
          this.html.details.table.load(
            this.model.data.Areas,
            this.model.data.Points,
            this.model.data.Resolution
          )

          this.loadAreaType()
        })
        .catch((e) => {
          this.html.details.chart.clear()
          this.html.details.table.clear()
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

    selectRobot(id: string) {
      let robot = this.model.robots.find((x) => x.Id == id)
      if (robot) {
        this.model.data.RobotId = robot.Id
        this.model.data.RobotName = robot.Name
      }
    }
    selectChannel(id: string) {
      let channel = this.model.channels.find((x) => x.Id.toString() == id)
      if (channel) {
        this.model.data.ChannelId = channel.Id
      }
      let url = this.business.channel.picture(id)
      this.html.set.picture(url).then((x) => {
        this.load(id, x)
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

    save() {
      this.business.channel.calibration
        .set(this.model.data)
        .then((x) => {
          MessageBar.success('保存成功')
          this.load(x.ChannelId.toString())
        })
        .catch((e) => {
          MessageBar.error('保存失败')
        })
    }
  }

  const controller = new Controller()
}
