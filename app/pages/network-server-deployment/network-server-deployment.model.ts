import { Deployment } from '../../data-core/models/arm/deployment.model'
import { GarbageServer } from '../../data-core/models/arm/garbage-server.model'
import { ISUPServer } from '../../data-core/models/arm/isup-server.model'

export class NetworkServerDeploymentModel {
  deployment?: Deployment
  server: {
    garbage: GarbageServer[]
    isup: ISUPServer[]
  } = {
    garbage: [],
    isup: [],
  }
}
