export interface AIAnalysisServerSourceParamsEvent {
  ok(): void
  close(): void
  next(): void
  prev(): void
}
