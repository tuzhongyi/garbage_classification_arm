import { MeshNodePosition } from '../../../../data-core/models/robot/mesh-node-position.model'

class Equals {
  position(a: MeshNodePosition, b: MeshNodePosition) {
    return a.X === b.X && a.Y === b.Y
  }
}

export class MeshNodeHelpler {
  static equals = new Equals()
}
