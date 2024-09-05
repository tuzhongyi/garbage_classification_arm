import { SystemIOInputsUrl } from './system-io-inputs.url'
import { SystemIOOutputsUrl } from './system-io-outputs.url'

export class SystemIOUrl {
  constructor(private base: string) {}

  private basic() {
    return `${this.base}/IO`
  }

  get input() {
    return new SystemIOInputsUrl(this.basic())
  }
  get output() {
    return new SystemIOOutputsUrl(this.basic())
  }
}
