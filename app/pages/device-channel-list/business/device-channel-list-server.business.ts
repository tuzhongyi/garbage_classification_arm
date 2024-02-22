import { AnalysisServer } from '../../../data-core/models/arm/analysis/analysis-server.model'
import { HowellAuthHttp } from '../../../data-core/requests/auth/howell-auth-http'
import { ArmServerAnalysisRequestService } from '../../../data-core/requests/services/servers/server-analysis.service'

export class DeviceChannelListServerBusiness {
  constructor(http: HowellAuthHttp) {
    this.service = new ArmServerAnalysisRequestService(http)
  }
  private service: ArmServerAnalysisRequestService

  private _servers: AnalysisServer[] = []
  async get() {
    if (this._servers.length === 0) {
      this._servers = await this.service.array()
    }
    if (this._servers.length > 0) {
      return this._servers[0]
    }
    return undefined
  }

  sync() {
    return new Promise<boolean>((resolve) => {
      this.get()
        .then((x) => {
          if (x) {
            this.service.source
              .sync(x.Id)
              .then((x) => {
                console.log(x)
                resolve(true)
                return
              })
              .catch((e) => {
                resolve(false)
                return
              })
          } else {
            resolve(false)
          }
        })
        .catch((e) => {
          resolve(false)
        })
    })
  }
}
