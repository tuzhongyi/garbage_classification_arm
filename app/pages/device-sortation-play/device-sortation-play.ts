import { CheckTool } from '../../common/tools/check-tool/check.tool'
import { MessageBar } from '../../common/tools/controls/message-bar/message-bar'
import { LocationTool } from '../../common/tools/location.tool'
import { SortationCalibration } from '../../data-core/models/sortation/sortation-calibration.model'
import { SortationDevice } from '../../data-core/models/sortation/sortation-device.model'
import { DeviceSortationPlayBusiness } from './business/device-sortation-play.business'
import { DeviceSortationPlayControlEvent } from './controller/controls/device-sortation-play-controls.event'
import { DeviceSortationPlayHtmlController } from './controller/device-sortation-play.html.controller'

import { DeviceSortationPlayMessage } from './device-sortation-play.message'

export namespace DeviceSortationPlay {
  class Controller implements DeviceSortationPlayControlEvent {
    constructor() {
      this.regist()
      this.load()
    }

    private html = new DeviceSortationPlayHtmlController()
    private business = new DeviceSortationPlayBusiness()
    private message = new DeviceSortationPlayMessage()
    private get id() {
      let querys = LocationTool.query.decode(location.search)
      return querys.id
    }

    source: {
      device?: SortationDevice
      calibration?: SortationCalibration
    } = {}

    private load() {
      if (this.id) {
        this.business.sortation.get(this.id).then((x) => {
          this.source.device = x
          this.html.status.load(x)
        })
        this.business.get(this.id).then((calibration) => {
          this.source.calibration = calibration
          this.html.load(calibration)
          this.onchannel(calibration.ChannelId)

          this.business.grid(calibration).then((x) => {
            this.html.canvas.load(x, calibration.Rotation)
            this.html.control.load(calibration.Rotation, x)
          })
        })
      }
    }

    private regist() {
      this.html.control.event.on('command', this.command.bind(this))
      this.html.control.event.on('stop', this.stop.bind(this))
      this.html.control.event.on('move1to8', this.move1to8.bind(this))
      this.html.control.event.on('move8to1', this.move8to1.bind(this))
      this.html.control.event.on('movea2h', this.movea2h.bind(this))
      this.html.control.event.on('moveh2a', this.moveh2a.bind(this))
      this.html.control.event.on('up', this.up.bind(this))
      this.html.control.event.on('down', this.down.bind(this))
      this.html.control.event.on('grab', this.grab.bind(this))
      this.html.event.on('picture', this.onpicture.bind(this))
    }

    private clear() {}

    onpicture() {
      if (this.source.calibration) {
        let calibration = this.source.calibration
        this.onchannel(calibration.ChannelId)
      }
    }

    onchannel(id: number): void {
      let url = this.business.channel.picture(id)
      this.html.picture(url)
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

    command(code: string): void {
      this.business
        .command(this.id, code)
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

    grab(grid: string): void {
      this.business
        .grab(this.id, grid)
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
