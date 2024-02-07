import { MeshNode } from '../../data-core/models/robot/mesh-node.model'

export interface AIEventRuleDetailsEvent {
  ok(): void
  cancel(): void
  selectAIModel(id: string): void
  selectChannel(id: string): void
}

export interface AIEventRuleDetailsInfoEvent {
  selectNode(node?: MeshNode): void
}
