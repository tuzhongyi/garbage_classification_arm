import { EventEmitter } from '../../../../../../common/event-emitter'
import { EnumTool } from '../../../../../../common/tools/enum-tool/enum.tool'
import { HtmlTool } from '../../../../../../common/tools/html-tool/html.tool'
import { MeshNode } from '../../../../../../data-core/models/robot/mesh-node.model'
import { RobotTrashCan } from '../../../../../../data-core/models/robot/robot-trash-can.model'
import {
  IDeviceRobotPlayHtmlTemplate,
  IDeviceRobotPlayHtmlTemplateEvent,
} from '../device-robot-play-template.interface'
import html from './device-robot-play-details-compaction.html'
import { IDeviceRobotPlayHtmlTemplateCompactionEventArgs } from './device-robot-play-details-compaction.model'

export class DeviceRobotPlayDetailsCompactionTemplate
  implements IDeviceRobotPlayHtmlTemplate
{
  event = new EventEmitter<IDeviceRobotPlayHtmlTemplateEvent>()
  constructor(private parent: HTMLElement) {
    this.init()
    this.regist()
  }

  private parser = new DOMParser()

  private document = this.parser.parseFromString(html, 'text/html')
  trashcans: RobotTrashCan[] = []

  element = {
    start: {
      id: this.document.getElementById('node_start_id') as HTMLInputElement,
      rfid: this.document.getElementById('node_start_rfid') as HTMLInputElement,
      name: this.document.getElementById('node_start_name') as HTMLInputElement,
      can: {
        type: this.document.getElementById(
          'node_start_cantype'
        ) as HTMLInputElement,
        has: this.document.getElementById('start_has_can') as HTMLInputElement,
      },
      covered: this.document.getElementById(
        'start_covered'
      ) as HTMLInputElement,
    },
    end: {
      id: this.document.getElementById('node_end_id') as HTMLInputElement,
      rfid: this.document.getElementById('node_end_rfid') as HTMLInputElement,
      name: this.document.getElementById('node_end_name') as HTMLInputElement,
      can: {
        type: this.document.getElementById(
          'node_end_cantype'
        ) as HTMLInputElement,
        has: this.document.getElementById('end_has_can') as HTMLInputElement,
      },
    },
    button: {
      reset: this.document.getElementById('btn_reset') as HTMLButtonElement,
      compaction: this.document.getElementById(
        'btn_command_compaction'
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
    this.element.button.compaction.addEventListener('click', () => {
      let args: IDeviceRobotPlayHtmlTemplateCompactionEventArgs = {
        startcan: HtmlTool.undefined(this.element.start.can.has.checked),
        endcan: HtmlTool.undefined(this.element.end.can.has.checked),
        covered: HtmlTool.undefined(this.element.start.covered.checked),
      }
      this.event.emit('compaction', args)
    })
  }

  async load(args: {
    start?: { node: MeshNode; trashcans?: RobotTrashCan[] }
    end?: { node: MeshNode }
  }) {
    if (args.start) {
      this.start(args.start)
    }
    if (args.end) {
      this.end(args.end)
    }
  }

  private async start(args: {
    node: MeshNode
    trashcans?: RobotTrashCan[]
  }): Promise<void> {
    this.element.start.id.value = HtmlTool.set(args.node.Id)
    this.element.start.rfid.value = HtmlTool.set(args.node.Rfid)
    this.element.start.name.value = HtmlTool.set(args.node.Name)
    this.element.start.can.type.value = await EnumTool.trashcan.CanType(
      args.node.CanType,
      ''
    )
  }
  private async end(args: { node: MeshNode }) {
    this.element.end.id.value = HtmlTool.set(args.node.Id)
    this.element.end.rfid.value = HtmlTool.set(args.node.Rfid)
    this.element.end.name.value = HtmlTool.set(args.node.Name)
    this.element.end.can.type.value = await EnumTool.trashcan.CanType(
      args.node.CanType,
      ''
    )
  }
  clear(): void {
    this.element.start.id.value = ''
    this.element.start.rfid.value = ''
    this.element.start.name.value = ''
    this.element.start.can.type.value = ''
    this.element.start.can.has.checked = false
    this.element.start.covered.checked = false
    this.element.end.id.value = ''
    this.element.end.rfid.value = ''
    this.element.end.name.value = ''
    this.element.end.can.type.value = ''
    this.element.end.can.has.checked = false
  }
}
