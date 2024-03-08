export interface NetworkServerDeploymentEvent {
  test(): void
  save(): void
  inited(): void
  isupserverchange(id: string): void
}
