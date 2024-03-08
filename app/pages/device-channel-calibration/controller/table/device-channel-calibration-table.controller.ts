import { EventEmitter } from '../../../../common/event-emitter'

import { ChannelCalibrationArea } from '../../../../data-core/models/arm/analysis/channel-calibration-area.model'
import { ChannelCalibrationPoint } from '../../../../data-core/models/arm/analysis/channel-calibration-point.model'
import { Resolution } from '../../../../data-core/models/arm/analysis/resolution.model'
import { DeviceChannelCalibrationConverter as Converter } from '../../device-channel-calibration.converter'
import { DeviceChannelCalibrationMode as CalibrationMode } from '../../device-channel-calibration.model'
import { DeviceChannelCalibrationTableHtmlController } from './device-channel-calibration-table.html.controller'

export interface DeviceChannelCalibrationTableEvent {
  select(data: ChannelCalibrationArea | ChannelCalibrationPoint): void
  remove(point: ChannelCalibrationArea | ChannelCalibrationPoint): void
}

export class DeviceChannelCalibrationTableController {
  selected?: ChannelCalibrationArea | ChannelCalibrationPoint
  constructor() {
    this.regist()
  }

  private html = new DeviceChannelCalibrationTableHtmlController()

  event: EventEmitter<DeviceChannelCalibrationTableEvent> = new EventEmitter()
  data = {
    areas: [] as ChannelCalibrationArea[],
    points: [] as ChannelCalibrationPoint[],
  }

  private regist() {
    this.html.event.on('selectArea', (id) => {
      this.selected = this.data.areas.find((x) => x.No.toString() == id)
      this.event.emit('select', this.selected)
    })
    this.html.event.on('selectPoint', (id) => {
      this.selected = this.data.points.find((x) => x.No.toString() == id)
      this.event.emit('select', this.selected)
    })
    this.html.event.on('removeArea', (id) => {
      let item = this.data.areas.find((x) => x.No.toString() == id)
      this.event.emit('remove', item)
    })
    this.html.event.on('removePoint', (id) => {
      let item = this.data.points.find((x) => x.No.toString() == id)
      this.event.emit('remove', item)
    })
    this.html.event.on('sort', (sort) => {})
  }

  private getId(type: CalibrationMode, no: number) {
    switch (type) {
      case CalibrationMode.point:
        return `point${no}`
      case CalibrationMode.polygon:
        return `area${no}`
      default:
        return no.toString()
    }
  }

  onremove(tr: HTMLTableRowElement) {}

  clear() {
    this.html.clear()
    this.selected = undefined
  }

  select(type: CalibrationMode, no: number) {
    let id = this.getId(type, no)

    this.html.select(id)
  }

  load(
    areas: ChannelCalibrationArea[] = [],
    points: ChannelCalibrationPoint[] = [],
    resolution: Resolution
  ) {
    this.clear()
    this.data.areas = areas
    this.data.points = points
    for (let i = 0; i < areas.length; i++) {
      let values: string[] = ['区域', areas[i].Name]
      this.html.append(
        this.getId(CalibrationMode.polygon, areas[i].No),
        values,
        ''
      )
    }
    for (let i = 0; i < points.length; i++) {
      let values: string[] = ['点位', points[i].Name]
      let point = Converter.point.to(resolution, points[i].Coordinate)
      this.html.append(
        this.getId(CalibrationMode.point, points[i].No),
        values,
        `${point.X}, ${point.Y}`
      )
    }
    this.html.scrollTop = this.html.scrollTop
  }
}
