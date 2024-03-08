import { GarbageServer } from '../../data-core/models/arm/garbage-server.model'
import { ISUPServer } from '../../data-core/models/arm/isup-server.model'

export interface NetworkServerDeploymentSource {
  garbage: Promise<GarbageServer[]>
  isup: Promise<ISUPServer[]>
}
