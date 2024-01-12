export class SystemDataUrl {
  constructor(private base: string) {}
  log() {
    return `${this.base}/LogData`
  }
  configuration() {
    return `${this.base}/ConfigurationData`
  }
}
