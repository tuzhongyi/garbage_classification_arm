import { IOState } from '../../data-core/enums/io/io-state.enum'
import { IOOutputPort } from '../../data-core/models/arm/io/io-output-port.model'
import { TimeSegment } from '../../data-core/models/arm/time-segment.model'

export interface SystemIOOutputEvent {
  select(index: IOOutputPort): void
  save(data: IOOutputPort): void
  manual(data: IOOutputPort): void
  copy(): void
}

export interface SystemIOOutputSheetEvent {
  enabled(value: boolean): void
  state(value: IOState): void
  week(week: number): void
  add(week: number): void
  copy(week: number[]): void
  change(datas: TimeSegment[]): void
}
