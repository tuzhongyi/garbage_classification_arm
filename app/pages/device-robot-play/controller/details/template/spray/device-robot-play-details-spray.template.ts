import { EventEmitter } from '../../../../../../common/event-emitter'
import { HtmlTool } from '../../../../../../common/tools/html-tool/html.tool'
import { MeshNode } from '../../../../../../data-core/models/robot/mesh-node.model'
import {
  IDeviceRobotPlayHtmlTemplate,
  IDeviceRobotPlayHtmlTemplateEvent,
} from '../device-robot-play-template.interface'
import single from './device-robot-play-details-spray.html'

export class DeviceRobotPlayDetailsSprayTemplate
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
    // id: this.document.getElementById('node_id') as HTMLInputElement,
    // rfid: this.document.getElementById('node_rfid') as HTMLInputElement,
    // name: this.document.getElementById('node_name') as HTMLInputElement,
    // type: {
    //   node: this.document.getElementById('node_nodetype') as HTMLInputElement,
    // },
    times: this.document.getElementById('spray_times') as HTMLInputElement,
    button: {
      spray: this.document.getElementById(
        'btn_command_spray'
      ) as HTMLButtonElement,
    },
  }

  private init() {
    this.parent.appendChild(this.document.body.firstChild as HTMLElement)
  }
  private regist() {
    this.element.button.spray.addEventListener('click', () => {
      let times = parseInt(this.element.times.value)
      if (!Number.isFinite(times)) {
        times = 1
      }
      this.event.emit('spray', { times: times })
    })
    HtmlTool.input.number.mousewheelchangevalue(this.element.times)
  }

  async load(node: MeshNode): Promise<void> {
    // this.element.id.value = HtmlTool.set(node.Id)
    // this.element.rfid.value = HtmlTool.set(node.Rfid)
    // this.element.name.value = HtmlTool.set(node.Name)
    // this.element.type.node.value = await EnumTool.MeshNodeType(node.NodeType)
  }
  clear(): void {
    // this.element.id.value = ''
    // this.element.rfid.value = ''
    // this.element.name.value = ''
    // this.element.type.node.value = ''
    this.element.times.value = '1'
  }
}
