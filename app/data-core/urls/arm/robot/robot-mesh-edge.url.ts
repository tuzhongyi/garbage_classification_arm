import { AbstractUrl } from '../../abstract.url'

export class RobotMeshEdgesUrl extends AbstractUrl {
  constructor(base: string) {
    super(`${base}/MeshEdges`)
  }
}
