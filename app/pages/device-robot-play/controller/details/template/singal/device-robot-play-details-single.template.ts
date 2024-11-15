import { EventEmitter } from '../../../../../../common/event-emitter'
import { EnumTool } from '../../../../../../common/tools/enum-tool/enum.tool'
import { HtmlTool } from '../../../../../../common/tools/html-tool/html.tool'
import { MeshNode } from '../../../../../../data-core/models/robot/mesh-node.model'
import {
  IDeviceRobotPlayHtmlTemplate,
  IDeviceRobotPlayHtmlTemplateEvent,
} from '../device-robot-play-template.interface'
import single from './device-robot-play-details-single.html'

export class DeviceRobotPlayDetailsSingleTemplate
  implements IDeviceRobotPlayHtmlTemplate
{
  event = new EventEmitter<IDeviceRobotPlayHtmlTemplateEvent>()
  constructor(private parent: HTMLElement) {
    this.init()
    this.regist()
  }

  private parser = new DOMParser()

  private document = this.parser.parseFromString(single, 'text/html')

  element = {
    id: this.document.getElementById('node_id') as HTMLInputElement,
    rfid: this.document.getElementById('node_rfid') as HTMLInputElement,
    name: this.document.getElementById('node_name') as HTMLInputElement,
    type: {
      node: this.document.getElementById('node_nodetype') as HTMLInputElement,
      can: this.document.getElementById('node_cantype') as HTMLInputElement,
    },
    button: {
      move: this.document.getElementById(
        'btn_command_move'
      ) as HTMLButtonElement,
      weigh: this.document.getElementById(
        'btn_command_weigh'
      ) as HTMLButtonElement,
    },
  }

  private init() {
    this.parent.appendChild(this.document.body.firstChild as HTMLElement)
  }
  private regist() {
    this.element.button.move.addEventListener('click', () => {
      this.event.emit('move')
    })
    this.element.button.weigh.addEventListener('click', () => {
      this.event.emit('weigh')
    })
  }

  async load(node: MeshNode): Promise<void> {
    this.element.id.value = HtmlTool.set(node.Id)
    this.element.rfid.value = HtmlTool.set(node.Rfid)
    this.element.name.value = HtmlTool.set(node.Name)
    this.element.type.node.value = await EnumTool.MeshNodeType(node.NodeType)
    this.element.type.can.value = await EnumTool.CanType(node.CanType, '')
  }
  clear(): void {
    this.element.id.value = ''
    this.element.rfid.value = ''
    this.element.name.value = ''
    this.element.type.node.value = ''
    this.element.type.can.value
  }
}
