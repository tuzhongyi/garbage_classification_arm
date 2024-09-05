import { HowellAuthHttp } from '../../../auth/howell-auth-http'
import { SystemIOInputRequestService } from './system-io-input.service'
import { SystemIOOutputRequestService } from './system-io-output.service'

export class SystemIORequestService {
  constructor(private http: HowellAuthHttp) {}

  private _input?: SystemIOInputRequestService
  public get input(): SystemIOInputRequestService {
    if (!this._input) {
      this._input = new SystemIOInputRequestService(this.http)
    }
    return this._input
  }

  private _output?: SystemIOOutputRequestService
  public get output(): SystemIOOutputRequestService {
    if (!this._output) {
      this._output = new SystemIOOutputRequestService(this.http)
    }
    return this._output
  }
}
