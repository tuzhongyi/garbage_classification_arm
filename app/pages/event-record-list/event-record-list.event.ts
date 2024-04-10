import { EventType } from '../../data-core/enums/event-type.enum'

export interface EventRecordListEvent {
  search(): void

  begin(time: Date): void
  end(time: Date): void
  type(type?: EventType): void
  uploaded(is?: boolean): void
}
export interface EventRecordListHtmlTableEvent {
  page(index: number): void
  picture(id: string): void
  resources(id: string): void
}
