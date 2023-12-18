export class SystemStatusUrl {
  constructor(private base: string) {}
  get upgrade() {
    return `${this.base}/UpgradeStatus`
  }
  get running() {
    return `${this.base}/RunningStatus`
  }
}
