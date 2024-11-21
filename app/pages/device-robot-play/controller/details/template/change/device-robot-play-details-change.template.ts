import { EventEmitter } from '../../../../../../common/event-emitter'
import { EnumTool } from '../../../../../../common/tools/enum-tool/enum.tool'
import { HtmlTool } from '../../../../../../common/tools/html-tool/html.tool'
import { MeshNode } from '../../../../../../data-core/models/robot/mesh-node.model'
import {
  IDeviceRobotPlayHtmlTemplate,
  IDeviceRobotPlayHtmlTemplateEvent,
} from '../device-robot-play-template.interface'
import html from './device-robot-play-details-change.html'

export class DeviceRobotPlayDetailsChangeTemplate
  implements IDeviceRobotPlayHtmlTemplate
{
  event = new EventEmitter<IDeviceRobotPlayHtmlTemplateEvent>()
  constructor(private parent: HTMLElement) {
    this.init()
    this.regist()
  }

  private parser = new DOMParser()

  private document = this.parser.parseFromString(html, 'text/html')

  element = {
    store: {
      id: this.document.getElementById('node_store_id') as HTMLInputElement,
      rfid: this.document.getElementById('node_store_rfid') as HTMLInputElement,
      name: this.document.getElementById('node_store_name') as HTMLInputElement,
      type: {
        can: this.document.getElementById(
          'node_store_cantype'
        ) as HTMLInputElement,
      },
    },
    drop: {
      id: this.document.getElementById('node_drop_id') as HTMLInputElement,
      rfid: this.document.getElementById('node_drop_rfid') as HTMLInputElement,
      name: this.document.getElementById('node_drop_name') as HTMLInputElement,
      type: {
        can: this.document.getElementById(
          'node_drop_cantype'
        ) as HTMLInputElement,
      },
    },
    button: {
      reset: this.document.getElementById('btn_reset') as HTMLButtonElement,
      change: this.document.getElementById(
        'btn_command_change'
      ) as HTMLButtonElement,
    },
  }

  private init() {
    this.parent.appendChild(this.document.body.firstChild as HTMLElement)
  }
  private regist() {
    this.element.button.reset.addEventListener('click', () => {
      this.event.emit('reset')
    })
    this.element.button.change.addEventListener('click', () => {
      this.event.emit('change')
    })
  }

  async load(node: { store?: MeshNode; drop?: MeshNode }): Promise<void> {
    if (node.store) {
      this.element.store.id.value = HtmlTool.set(node.store.Id)
      this.element.store.rfid.value = HtmlTool.set(node.store.Rfid)
      this.element.store.name.value = HtmlTool.set(node.store.Name)
      this.element.store.type.can.value = await EnumTool.input.trashcan.CanType(
        node.store.CanType,
        ''
      )
    }
    if (node.drop) {
      this.element.drop.id.value = HtmlTool.set(node.drop.Id)
      this.element.drop.rfid.value = HtmlTool.set(node.drop.Rfid)
      this.element.drop.name.value = HtmlTool.set(node.drop.Name)
      this.element.drop.type.can.value = await EnumTool.input.trashcan.CanType(
        node.drop.CanType,
        ''
      )
    }
  }
  clear(): void {
    this.element.store.id.value = ''
    this.element.store.rfid.value = ''
    this.element.store.name.value = ''
    this.element.store.type.can.value = ''
    this.element.drop.id.value = ''
    this.element.drop.rfid.value = ''
    this.element.drop.name.value = ''
    this.element.drop.type.can.value
  }
}
