export abstract class AbstractUrl {
  constructor(private base: string) {}
  get basic(): string {
    return this.base
  }
  item<T = string>(id: T) {
    return `${this.basic}/${id}`
  }
  get list() {
    return `${this.basic}/List`
  }
}
