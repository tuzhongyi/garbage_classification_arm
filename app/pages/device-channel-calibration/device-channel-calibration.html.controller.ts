import { EventEmitter } from '../../common/event-emitter'
import { Language } from '../../common/language'
import { CalibrationAreaType } from '../../data-core/enums/calibration_area_type.enum'
import { IIdNameModel } from '../../data-core/models/model.interface'
import { DeviceChannelCalibrationTableController } from './controller/table/device-channel-calibration-table.controller'
import { DeviceChannelCalibrationEvent } from './device-channel-calibration.event'

import '../../../assets/styles/table-sticky.less'
import { HtmlTool } from '../../common/tools/html-tool/html.tool'
import { LensType } from '../../data-core/enums/lens-type.enum'
import { Resolution } from '../../data-core/models/arm/analysis/resolution.model'
import { ChannelCalibration } from '../../data-core/models/arm/channel-calibration.model'
import { InputProxyChannel } from '../../data-core/models/arm/input-proxy-channel.model'
import { Robot } from '../../data-core/models/robot/robot.model'
import { DeviceChannelCalibrationChartController } from './controller/chart/device-channel-calibration-chart.controller'
import { DeviceChannelCalibrationHtmlInfoController } from './controller/info/device-channel-calibration.html-info.controller'
import './device-channel-calibration.less'
export class DeviceChannelCalibrationHtmlController {
  constructor() {
    this.init()
    this.regist()
  }

  private element = {
    select: {
      robot: document.getElementById('select_robot') as HTMLSelectElement,
      channel: document.getElementById('select_channel') as HTMLSelectElement,
      lens_type: document.getElementById(
        'select_lens_type'
      ) as HTMLSelectElement,
      area_type: document.getElementById(
        'select_area_type'
      ) as HTMLSelectElement,
    },
    chart: {
      picture: document.getElementById('picture') as HTMLImageElement,
    },
    save: document.getElementById('save') as HTMLButtonElement,
  }
  details = {
    table: new DeviceChannelCalibrationTableController(),
    chart: new DeviceChannelCalibrationChartController(),
    info: new DeviceChannelCalibrationHtmlInfoController(),
  }

  properties = {
    areaType: {
      get: () => {
        return this.element.select.area_type.value as CalibrationAreaType
      },
      set: (value: CalibrationAreaType) => {
        this.element.select.area_type.value = value
        this.selectAreaType(value)
      },
    },
  }

  event: EventEmitter<DeviceChannelCalibrationEvent> = new EventEmitter()

  private regist() {
    this.element.select.robot.addEventListener('change', () => {
      this.selectRobot(this.element.select.robot.value)
    })
    this.element.select.channel.addEventListener('change', () => {
      this.selectChannel(this.element.select.channel.value)
    })
    this.element.select.area_type.addEventListener('change', () => {
      this.selectAreaType(this.element.select.area_type.value)
    })
    this.element.select.lens_type.addEventListener('change', () => {
      this.selectLensType(this.element.select.lens_type.value)
    })
    this.element.save.addEventListener('click', () => {
      this.save()
    })
  }

  private save() {
    this.event.emit('save')
  }
  private selectRobot(id: string) {
    this.details.info.clear()
    this.event.emit('selectRobot', id)
  }
  private selectChannel(id: string) {
    this.details.info.clear()
    this.event.emit('selectChannel', HtmlTool.get(id, 'number'))
  }
  private selectAreaType(type: string) {
    this.details.info.clear()
    this.event.emit('selectAreaType', type)
  }
  private selectLensType(type: string) {
    this.event.emit('selectLensType', type)
  }

  private init() {
    this.initAreaType()
    this.initLensType()
  }

  private initAreaType() {
    let types = [CalibrationAreaType.DropPort, CalibrationAreaType.StorePort]

    for (let i = 0; i < types.length; i++) {
      HtmlTool.select.append(
        {
          Id: types[i],
          Name: Language.CalibrationAreaType(types[i]),
        },
        this.element.select.area_type
      )
    }
  }
  private initLensType() {
    let types = [LensType.M28, LensType.M40]
    for (let i = 0; i < types.length; i++) {
      HtmlTool.select.append(
        {
          Id: types[i],
          Name: Language.LensType(types[i]),
        },
        this.element.select.lens_type
      )
    }
  }

  clear() {
    this.element.select.area_type.innerHTML = ''
    this.element.select.lens_type.innerHTML = ''
    this.element.select.robot.innerHTML = ''
    this.element.select.channel.innerHTML = ''
  }

  load(robots: Robot[], channels: InputProxyChannel[]) {
    for (let i = 0; i < robots.length; i++) {
      let item: IIdNameModel = {
        Id: robots[i].Id,
        Name: robots[i].Name ?? robots[i].HostAddress,
      }
      HtmlTool.select.append(item, this.element.select.robot)
    }
    for (let i = 0; i < channels.length; i++) {
      let item: IIdNameModel = {
        Id: channels[i].Id.toString(),
        Name: channels[i].Name,
      }
      HtmlTool.select.append(item, this.element.select.channel)
    }

    if (this.element.select.channel.value) {
      this.selectChannel(this.element.select.channel.value)
    }

    if (this.element.select.robot.value) {
      this.selectRobot(this.element.select.robot.value)
    }
    if (this.element.select.area_type.value) {
      this.selectAreaType(this.element.select.area_type.value)
    }
    if (this.element.select.lens_type.value) {
      this.selectLensType(this.element.select.lens_type.value)
    }
  }

  set = {
    picture: (url: string) => {
      return new Promise<Resolution>((resolve, reject) => {
        this.element.chart.picture.src = url
        this.element.chart.picture.onload = () => {
          let r = new Resolution()
          r.Width = this.element.chart.picture.naturalWidth
          r.Height = this.element.chart.picture.naturalHeight
          resolve(r)
        }
        this.element.chart.picture.onerror = (e) => {
          reject(e)
        }
      })
    },
  }

  get(data: ChannelCalibration) {
    data.RobotId = this.element.select.robot.value
    data.RobotName =
      this.element.select.robot.options[
        this.element.select.robot.selectedIndex
      ].text
    data.ChannelId = parseInt(this.element.select.channel.value)
    data.LensType = this.element.select.lens_type.value
    return data
  }
}
