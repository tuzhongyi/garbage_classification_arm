import { VideoSourceIasParams } from '../../data-core/models/arm/analysis/video-source-las-params.model'
import { Point } from '../../data-core/models/arm/point.model'
import { Polygon } from '../../data-core/models/arm/polygon.model'
import { HowellHttpClient } from '../../data-core/requests/http-client'
import { ArmServerAnalysisRequestService } from '../../data-core/requests/services/servers/server-analysis.service'
import { IasParamsWindowQuery } from './ai-analysis-server-source-params.model'

export class AIAnalysisServerSourceParamsBusiness {
  private client = new HowellHttpClient.HttpClient()
  private service = new ArmServerAnalysisRequestService(this.client.http)

  load(query: IasParamsWindowQuery) {
    return this.service.source.ias.params
      .get(query.serverId, query.sourceId)
      .then((x) => {
        if (
          x.Region &&
          x.Region.Coordinates &&
          x.Region.Coordinates.length > 0
        ) {
          if (
            !Point.equals(
              x.Region.Coordinates[0],
              x.Region.Coordinates[x.Region.Coordinates.length - 1]
            )
          ) {
            x.Region.Coordinates.push(x.Region.Coordinates[0]) // close the polygon
          }
          return x.Region
        }
        throw new Error('No region found')
      })
  }

  set(query: IasParamsWindowQuery, polygon: Polygon) {
    let data = new VideoSourceIasParams()
    data.Id = query.sourceId
    data.Region = polygon
    return this.service.source.ias.params.set(query.serverId, data)
  }
}
