import { EnumTool } from '../../../../common/tools/enum-tool/enum.tool'
import { MeshNodeType } from '../../../../data-core/enums/robot/mesh-node-type.model'

export class DeviceRobotPlayStateChartController {
  constructor() {
    this.init()
  }

  private element = {
    state: document.querySelector('.state.chart ') as HTMLDivElement,
  }

  async append(type: MeshNodeType) {
    let item = document.createElement('div')
    item.className = 'state-item'
    let color = document.createElement('div')
    color.className = `state-item-${type}`
    item.appendChild(color)
    let text = document.createElement('div')
    text.innerText = await EnumTool.MeshNodeType(type)
    item.appendChild(text)
    this.element.state.appendChild(item)
  }

  async init() {
    this.element.state.innerHTML = ''
    let types = [
      MeshNodeType.MagneticPin,
      MeshNodeType.ChargingPort,
      MeshNodeType.DropPort,
      MeshNodeType.StorePort,

      MeshNodeType.Compactor,
      MeshNodeType.SterilizedPort,
    ]
    for (let i = 0; i < types.length; i++) {
      await this.append(types[i])
    }
  }
}
