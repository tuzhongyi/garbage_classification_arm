export interface EventRecordResourcesEvent {
  close(): void
  next(): void
  prev(): void
  inited(): void
}
