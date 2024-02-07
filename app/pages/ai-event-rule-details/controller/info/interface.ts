export abstract class AIEventRuleDetailsInfoAbstractController<T> {
  constructor() {
    this.regist()
  }
  abstract load(info: T): void
  protected data?: T
  protected abstract regist(): void
}