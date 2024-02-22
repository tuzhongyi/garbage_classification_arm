import { AnalysisServer } from '../../data-core/models/arm/analysis/analysis-server.model'
import { HowellHttpClient } from '../../data-core/requests/http-client'
import { ArmServerAnalysisRequestService } from '../../data-core/requests/services/servers/server-analysis.service'

export class AIAnalysisServerSourceBusiness {
  private client = new HowellHttpClient.HttpClient()
  private service = new ArmServerAnalysisRequestService(this.client.http)

  private _servers: AnalysisServer[] = []
  async get() {
    if (this._servers.length === 0) {
      this._servers = await this.service.array()
    }
    if (this._servers.length > 0) {
      return this._servers[0]
    }
    throw new Error('智能分析服务器获取失败')
  }

  async load() {
    let server = await this.get()
    return this.service.source.array(server.Id)
  }
}
