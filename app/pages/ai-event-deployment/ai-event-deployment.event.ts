import { EventType } from '../../data-core/enums/event-type.enum'
import { TimeSegment } from '../../data-core/models/arm/time-segment.model'

export interface AIEventDeploymentEvent {
  typechange(type: EventType): void
  save(): void
}

export interface AIEventDeploymentSheetEvent {
  weekchange(week: number): void
  sheetadd(week: number): void
  sheetcopy(week: number[]): void
  sheetchange(datas: TimeSegment[]): void
}
