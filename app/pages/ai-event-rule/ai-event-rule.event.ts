import { EventType } from '../../data-core/enums/event-type.enum'

export interface AIEventRuleTableEvent {
  modify: (id: string) => void
}
export interface AIEventRuleEvent {
  create(): void
  delete(ids: string[]): void
  search(text: string): void
  eventchange(type: EventType): void
}
