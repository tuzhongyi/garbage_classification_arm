import { AnalysisServer } from '../../data-core/models/arm/analysis/analysis-server.model'
import { HowellHttpClient } from '../../data-core/requests/http-client'
import { ArmServerAnalysisRequestService } from '../../data-core/requests/services/servers/server-analysis.service'
import { AIAnalysisServerSourceChannelBusiness } from './business/ai-analysis-server-source-channel.business'

export class AIAnalysisServerSourceBusiness {
  private client = new HowellHttpClient.HttpClient()
  private service = new ArmServerAnalysisRequestService(this.client.http)

  private _servers: AnalysisServer[] = []

  channel = new AIAnalysisServerSourceChannelBusiness()

  async server() {
    if (this._servers.length === 0) {
      this._servers = await this.service.array()
    }
    if (this._servers.length > 0) {
      return this._servers[0]
    }
    throw new Error('智能分析服务器获取失败')
  }

  async load() {
    let server = await this.server()
    return this.service.source.array(server.Id)
  }

  async delete(id: string) {
    let server = await this.server()
    return this.service.source.delete(server.Id, id)
  }
}
