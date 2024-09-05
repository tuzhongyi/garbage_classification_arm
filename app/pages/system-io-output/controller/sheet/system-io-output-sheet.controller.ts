import { EventEmitter } from '../../../../common/event-emitter'
import { Duration } from '../../../../common/tools/date-time-tool/duration.model'
import { IOState } from '../../../../data-core/enums/io/io-state.enum'
import { TimeSegment } from '../../../../data-core/models/arm/time-segment.model'
import { SystemIOOutputSheetEvent } from '../../system-io-output.event'
import { SystemIOOutputSheetCloneController } from './system-io-output-sheet-clone.controller'
import { SystemIOOutputSheetHtmlController } from './system-io-output-sheet.html.controller'

export class SystemIOOutputSheetController {
  event: EventEmitter<SystemIOOutputSheetEvent> = new EventEmitter()
  constructor() {
    this.regist()
  }

  private html = new SystemIOOutputSheetHtmlController()
  private clone = new SystemIOOutputSheetCloneController()

  private data: {
    times: TimeSegment[]
    enabled: boolean
    state: IOState
  } = { times: [], enabled: false, state: IOState.Low }

  private regist() {
    window.addEventListener('click', () => {
      this.clone.show = false
    })
    this.html.event.on('weekchange', (week) => {
      this.event.emit('week', week)
    })
    this.html.event.on('add', (week) => {
      this.event.emit('add', week)
    })
    this.html.event.on('remove', (index) => {
      this.onremove(index)
    })
    this.html.event.on('beginchange', (args) => {
      this.data.times[args.index].StartTime.hour = args.time.getHours()
      this.data.times[args.index].StartTime.minute = args.time.getMinutes()
      this.data.times[args.index].StartTime.second = args.time.getSeconds()
      this.event.emit('change', this.data.times)
    })
    this.html.event.on('endchange', (args) => {
      this.data.times[args.index].StopTime.hour = args.time.getHours()
      this.data.times[args.index].StopTime.minute = args.time.getMinutes()
      this.data.times[args.index].StopTime.second = args.time.getSeconds()
      this.event.emit('change', this.data.times)
    })
    this.html.event.on('copy', (week) => {
      this.clone.select(week)
      this.clone.show = true
    })
    this.html.event.on('enabled', (value) => {
      this.data.enabled = value
      this.event.emit('enabled', value)
    })
    this.html.event.on('state', (value) => {
      this.data.state = value
      this.event.emit('state', value)
    })
    this.clone.event.on('copy', (weeks) => {
      this.event.emit('copy', weeks)
    })
  }

  private onremove(index: number) {
    this.data.times.splice(index, 1)
    this.event.emit('change', this.data.times)
    this.reload()
  }

  private convert(time: TimeSegment) {
    let duration: Duration = {
      begin: time.StartTime.toDate(),
      end: time.StopTime.toDate(),
    }
    return duration
  }

  clear() {
    this.html.clear()
  }

  load(enabled: boolean, state: IOState, datas: TimeSegment[] = []) {
    this.data.enabled = enabled
    this.data.state = state
    this.data.times = datas

    this.html.load(
      enabled,
      state,
      datas.map((x) => this.convert(x))
    )
  }
  reload() {
    this.clear()
    this.load(this.data.enabled, this.data.state, this.data.times)
  }
}
