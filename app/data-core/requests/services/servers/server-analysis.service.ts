import { instanceToPlain } from 'class-transformer'
import { AnalysisServerCapability } from '../../../models/arm/analysis/analysis-server-capability.model'
import { AnalysisServer } from '../../../models/arm/analysis/analysis-server.model'
import { Analyzer } from '../../../models/arm/analysis/Analyzer.model'
import { AnalysisEventRecord } from '../../../models/arm/analysis/objects/analysis-event-record.model'
import { VideoSource } from '../../../models/arm/analysis/video-source.model'
import { HowellResponse } from '../../../models/response'
import { ArmServerUrl } from '../../../urls/arm/server/server.url'
import { HowellAuthHttp } from '../../auth/howell-auth-http'
import { HowellResponseProcess } from '../../service-process'

export class ArmServerAnalysisRequestService {
  constructor(private http: HowellAuthHttp) {}

  array() {
    let url = ArmServerUrl.analysis.basic()
    return this.http.get<HowellResponse<AnalysisServer[]>>(url).then((x) => {
      return HowellResponseProcess.array(x, AnalysisServer)
    })
  }
  create(data: AnalysisServer) {
    let url = ArmServerUrl.analysis.basic()
    let plain = instanceToPlain(data)
    return this.http
      .post<any, HowellResponse<AnalysisServer>>(url, plain)
      .then((x) => {
        return HowellResponseProcess.post(x, AnalysisServer)
      })
  }

  get(id: string) {
    let url = ArmServerUrl.analysis.item(id)
    return this.http.get<HowellResponse<AnalysisServer>>(url).then((x) => {
      return HowellResponseProcess.get(x, AnalysisServer)
    })
  }
  delete(id: string) {
    let url = ArmServerUrl.analysis.item(id)
    return this.http.delete<HowellResponse<AnalysisServer>>(url).then((x) => {
      return HowellResponseProcess.delete(x, AnalysisServer)
    })
  }
  update(data: AnalysisServer) {
    let url = ArmServerUrl.analysis.item(data.Id)
    let plain = instanceToPlain(data)
    return this.http
      .put<any, HowellResponse<AnalysisServer>>(url, plain)
      .then((x) => {
        return HowellResponseProcess.put(x, AnalysisServer)
      })
  }

  analyzers(serverId: string) {
    let url = ArmServerUrl.analysis.analyzer(serverId)
    return this.http.get<HowellResponse<Analyzer[]>>(url).then((x) => {
      return HowellResponseProcess.array(x, Analyzer)
    })
  }
  events() {
    let url = ArmServerUrl.analysis.event()
    return this.http
      .get<HowellResponse<AnalysisEventRecord[]>>(url)
      .then((x) => {
        return HowellResponseProcess.array(x, AnalysisEventRecord)
      })
  }

  capability() {
    let url = ArmServerUrl.analysis.capability()
    return this.http
      .get<HowellResponse<AnalysisServerCapability>>(url)
      .then((x) => {
        return HowellResponseProcess.get(x, AnalysisServerCapability)
      })
  }

  private _source?: ArmServerAnalysisSourceRequestService
  public get source(): ArmServerAnalysisSourceRequestService {
    if (!this._source) {
      this._source = new ArmServerAnalysisSourceRequestService(this.http)
    }
    return this._source
  }
}
class ArmServerAnalysisSourceRequestService {
  constructor(private http: HowellAuthHttp) {}

  array(serverId: string) {
    let url = ArmServerUrl.analysis.source(serverId).basic()
    return this.http.get<HowellResponse<VideoSource[]>>(url).then((x) => {
      return HowellResponseProcess.array(x, VideoSource)
    })
  }
  create(serverId: string, data: VideoSource) {
    let url = ArmServerUrl.analysis.source(serverId).basic()
    let plain = instanceToPlain(data)
    return this.http
      .post<any, HowellResponse<VideoSource>>(url, plain)
      .then((x) => {
        return HowellResponseProcess.post(x, VideoSource)
      })
  }

  get(serverId: string, id: string) {
    let url = ArmServerUrl.analysis.source(serverId).item(id)
    return this.http.get<HowellResponse<VideoSource>>(url).then((x) => {
      return HowellResponseProcess.get(x, VideoSource)
    })
  }
  delete(serverId: string, id: string) {
    let url = ArmServerUrl.analysis.source(serverId).item(id)
    return this.http.delete<HowellResponse<VideoSource>>(url).then((x) => {
      return HowellResponseProcess.delete(x, VideoSource)
    })
  }
  update(serverId: string, data: VideoSource) {
    let url = ArmServerUrl.analysis.source(serverId).item(data.Id)
    let plain = instanceToPlain(data)
    return this.http
      .put<any, HowellResponse<VideoSource>>(url, plain)
      .then((x) => {
        return HowellResponseProcess.put(x, VideoSource)
      })
  }
}
