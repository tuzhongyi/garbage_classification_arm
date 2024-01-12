import { AbstractUrl } from '../../abstract.url'

export class RobotCommandUrl extends AbstractUrl {
  constructor(base: string) {
    super(`${base}/Commands`)
  }
  results() {
    return `${this.basic()}/Results`
  }
}
