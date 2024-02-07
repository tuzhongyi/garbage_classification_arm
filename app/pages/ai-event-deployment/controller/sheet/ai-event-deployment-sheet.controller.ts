import { EventEmitter } from '../../../../common/event-emitter'
import { Duration } from '../../../../common/tools/date-time-tool/duration.model'
import { TimeSegment } from '../../../../data-core/models/arm/time-segment.model'
import { AIEventDeploymentSheetEvent } from '../../ai-event-deployment.event'
import { AIEventDeploymentSheetCloneController } from './ai-event-deployment-sheet-clone.controller'
import { AIEventDeploymentSheetHtmlController } from './ai-event-deployment-sheet.html.controller'

export class AIEventDeploymentSheetController {
  event: EventEmitter<AIEventDeploymentSheetEvent> = new EventEmitter()
  constructor() {
    this.regist()
  }
  private datas: TimeSegment[] = []
  private html = new AIEventDeploymentSheetHtmlController()
  private clone = new AIEventDeploymentSheetCloneController()

  private regist() {
    window.addEventListener('click', () => {
      this.clone.show = false
    })
    this.html.event.on('weekchange', (week) => {
      this.event.emit('weekchange', week)
    })
    this.html.event.on('add', (week) => {
      this.event.emit('sheetadd', week)
    })
    this.html.event.on('remove', (index) => {
      this.onremove(index)
    })
    this.html.event.on('beginchange', (args) => {
      this.datas[args.index].StartTime.hour = args.time.getHours()
      this.datas[args.index].StartTime.minute = args.time.getMinutes()
      this.datas[args.index].StartTime.second = args.time.getSeconds()
      this.event.emit('sheetchange', this.datas)
    })
    this.html.event.on('endchange', (args) => {
      this.datas[args.index].StopTime.hour = args.time.getHours()
      this.datas[args.index].StopTime.minute = args.time.getMinutes()
      this.datas[args.index].StopTime.second = args.time.getSeconds()
      this.event.emit('sheetchange', this.datas)
    })
    this.html.event.on('copy', (week) => {
      this.clone.select(week)
      this.clone.show = true
    })
    this.clone.event.on('copy', (weeks) => {
      this.event.emit('sheetcopy', weeks)
    })
  }

  private onremove(index: number) {
    this.datas.splice(index, 1)
    this.event.emit('sheetchange', this.datas)
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

  load(datas: TimeSegment[] = []) {
    this.datas = datas
    this.html.load(datas.map((x) => this.convert(x)))
  }
  reload() {
    this.clear()
    this.load(this.datas)
  }
}
