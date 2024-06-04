export interface DeviceSortationPlayControlEvent {
  command(code: string): void
  grab(grid: string): void
  stop(): void
  moveh2a(): void
  movea2h(): void
  move1to8(): void
  move8to1(): void
  up(): void
  down(): void
}
