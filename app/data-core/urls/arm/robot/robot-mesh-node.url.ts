import { AbstractUrl } from '../../abstract.url'

export class RobotMeshNodeUrl extends AbstractUrl {
  constructor(base: string) {
    super(`${base}/MeshNodes`)
  }
}
