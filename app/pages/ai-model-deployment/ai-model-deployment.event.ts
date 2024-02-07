export interface AIModelDeploymentTableEvent {
  modify: (id: string) => void
}
export interface AIModelDeploymentEvent {
  create(): void
  delete(ids: string[]): void
  discover(): void
  search(text: string): void
}
