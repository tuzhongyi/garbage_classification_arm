import { DayTimeSegment } from '../../data-core/models/arm/day-time-segment.model'
import { EventTrigger } from '../../data-core/models/arm/event-trigger.model'
import { IOOutputPort } from '../../data-core/models/arm/io/io-output-port.model'
import { IOOutputWorkSheet } from '../../data-core/models/arm/io/io-output-work-sheet.model'
import { TimeSegment } from '../../data-core/models/arm/time-segment.model'
import { WeekTimeSegment } from '../../data-core/models/arm/week-time-segment.model'
import { Time } from '../../data-core/models/common/time.model'

export class SystemIOOutputCreater {
  static IOOutputWorkSheet(source: IOOutputPort) {
    let item = new IOOutputWorkSheet()
    item.Id = source.Id
    item.Enabled = false
    item.State = source.State
    item.WorkSheet = this.WorkSheet()
    return item
  }
  static EventTrigger() {
    let data = new EventTrigger()
    data.Audio = false
    data.Picture = false
    data.UploadCenter = false
    return data
  }

  static WorkSheet() {
    let data = new WeekTimeSegment()
    data.Days = []
    for (let i = 0; i < 7; i++) {
      data.Days.push(this.DayTimeSegment(i))
    }
    return data
  }

  static DayTimeSegment(week: number) {
    let data = new DayTimeSegment()
    data.DayOfWeek = week
    data.Segments = []
    return data
  }

  static TimeSegment(
    start: Time = new Time(8, 0, 0),
    stop: Time = new Time(20, 0, 0)
  ) {
    let data = new TimeSegment()
    data.StartTime = start
    data.StopTime = stop
    return data
  }
}
