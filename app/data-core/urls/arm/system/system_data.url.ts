export class SystemDataUrl {
  constructor(private base: string) {}
  get log() {
    return `${this.base}/LogData`
  }
  get configuration() {
    return `${this.base}/ConfigurationData`
  }
}
