import { CheckTool } from '../../common/tools/check-tool/check.tool'
import { MessageBar } from '../../common/tools/controls/message-bar/message-bar'
import { LocationTool } from '../../common/tools/location.tool'
import { Rectangle } from '../../data-core/models/arm/rectangle.model'
import { SortationCalibration } from '../../data-core/models/sortation/sortation-calibration.model'
import { SortationDevice } from '../../data-core/models/sortation/sortation-device.model'
import { DeviceSortationCalibrationBusiness } from './business/device-sortation-calibration.business'
import { DeviceSortationCalibrationControlEvent } from './controller/controls/device-sortation-calibration-controls.event'
import { DeviceSortationCalibrationHtmlController } from './controller/device-sortation-calibration.html.controller'
import { DeviceSortationCalibrationEvent } from './controller/device-sortation-calibration.html.event'
import { DeviceSortationCalibrationMessage } from './device-sortation-calibration.message'

export namespace DeviceSortationCalibration {
  class Controller
    implements
      DeviceSortationCalibrationEvent,
      DeviceSortationCalibrationControlEvent
  {
    constructor() {
      this.regist()
      this.init().then(() => {
        this.load()
      })
    }

    private html = new DeviceSortationCalibrationHtmlController()
    private business = new DeviceSortationCalibrationBusiness()
    private message = new DeviceSortationCalibrationMessage()
    private get id() {
      let querys = LocationTool.query.decode(location.search)
      return querys.id
    }

    source: {
      device?: SortationDevice
      calibration?: SortationCalibration
    } = {}

    async init() {
      return new Promise<void>((resolve) => {
        this.business.source().then((x) => {
          this.html.init(x)
          resolve()
        })
      })
    }

    private load() {
      if (this.id) {
        this.business.sortation.get(this.id).then((x) => {
          this.source.device = x
          this.html.status.load(x)
        })
        this.business.get(this.id).then((calibration) => {
          this.source.calibration = calibration
          this.html.load(calibration)
          this.draw(calibration.ConsoleArea)
        })
      }
    }

    private regist() {
      this.html.event.on('onchannel', this.onchannel.bind(this))
      this.html.event.on('draw', this.draw.bind(this))
      this.html.event.on('rotation', this.rotation.bind(this))
      this.html.event.on('save', this.save.bind(this))
      this.html.control.event.on('calibrate', this.calibrate.bind(this))
      this.html.control.event.on('stop', this.stop.bind(this))
      this.html.control.event.on('move1to8', this.move1to8.bind(this))
      this.html.control.event.on('move8to1', this.move8to1.bind(this))
      this.html.control.event.on('movea2h', this.movea2h.bind(this))
      this.html.control.event.on('moveh2a', this.moveh2a.bind(this))
      this.html.control.event.on('up', this.up.bind(this))
      this.html.control.event.on('down', this.down.bind(this))
    }

    private clear() {}

    onchannel(id: number): void {
      let url = this.business.channel.picture(id)
      this.html.picture(url)
    }

    draw(rectangle: Rectangle): void {
      let data = new SortationCalibration()
      data = this.html.info.get(data)
      data.ConsoleArea = rectangle
      this.business.grid(data).then((x) => {
        this.html.canvas.load(x, data.Rotation)
        this.html.control.load(data.Rotation)
      })
    }
    rotation(value: string): void {
      let area = this.html.canvas.get()
      if (!area) return

      let data = new SortationCalibration()
      data.ConsoleArea = area
      data = this.html.info.get(data)
      this.html.control.load(value)
      this.business.grid(data).then((x) => {
        this.html.canvas.load(x, value)
      })
    }

    confirmsave() {}

    check(data: SortationCalibration) {
      let result = CheckTool.SortationCalibration(data)
      if (!result.result) {
        MessageBar.warning(result.message)
        return false
      }
      return true
    }

    save() {
      let area = this.html.canvas.get()
      if (!area) {
        MessageBar.warning('请先绘制标定区域')
        return false
      }
      if (this.source.device) {
        let data = new SortationCalibration()
        data = this.html.get(data)
        data = this.html.info.get(data)
        data.ConsoleArea = area
        data.DeviceId = this.source.device.Id
        data.DeviceName = this.source.device.Name
        if (this.check(data)) {
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
    }

    calibrate(cmd: string): void {
      this.business
        .command(this.id, cmd)
        .then((x) => {
          MessageBar.success('操作成功')
        })
        .catch((x) => {
          MessageBar.error('操作失败')
        })
    }
    stop(): void {
      this.business
        .stop(this.id)
        .then((x) => {
          MessageBar.success('操作成功')
        })
        .catch((x) => {
          MessageBar.error('操作失败')
        })
    }
    moveh2a(): void {
      this.business
        .moveh2a(this.id)
        .then((x) => {
          MessageBar.success('操作成功')
        })
        .catch((x) => {
          MessageBar.error('操作失败')
        })
    }
    movea2h(): void {
      this.business
        .movea2h(this.id)
        .then((x) => {
          MessageBar.success('操作成功')
        })
        .catch((x) => {
          MessageBar.error('操作失败')
        })
    }
    move1to8(): void {
      this.business
        .move1to8(this.id)
        .then((x) => {
          MessageBar.success('操作成功')
        })
        .catch((x) => {
          MessageBar.error('操作失败')
        })
    }
    move8to1(): void {
      this.business
        .move8to1(this.id)
        .then((x) => {
          MessageBar.success('操作成功')
        })
        .catch((x) => {
          MessageBar.error('操作失败')
        })
    }
    up(): void {
      this.business
        .up(this.id)
        .then((x) => {
          MessageBar.success('操作成功')
        })
        .catch((x) => {
          MessageBar.error('操作失败')
        })
    }
    down(): void {
      this.business
        .down(this.id)
        .then((x) => {
          MessageBar.success('操作成功')
        })
        .catch((x) => {
          MessageBar.error('操作失败')
        })
    }
  }

  const controller = new Controller()
}
