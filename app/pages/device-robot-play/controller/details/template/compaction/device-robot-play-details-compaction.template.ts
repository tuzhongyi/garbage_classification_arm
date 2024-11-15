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
    params: {
      start: {
        can: this.document.getElementById('start_has_can') as HTMLInputElement,
        covered: this.document.getElementById(
          'start_covered'
        ) as HTMLInputElement,
      },
      end: {
        can: this.document.getElementById('dest_has_can') as HTMLInputElement,
      },
    },
    button: {
      compaction: this.document.getElementById(
        'btn_command_compaction'
      ) as HTMLButtonElement,
    },
  }

  private init() {
    this.parent.appendChild(this.document.body.firstChild as HTMLElement)
  }
  private regist() {
    this.element.button.compaction.addEventListener('click', () => {
      let args: IDeviceRobotPlayHtmlTemplateCompactionEventArgs = {
        startcan: this.element.params.start.can.checked
          ? this.element.params.start.can.checked
          : undefined,
        endcan: this.element.params.end.can.checked
          ? this.element.params.end.can.checked
          : undefined,
        covered: this.element.params.start.covered.checked
          ? this.element.params.start.covered.checked
          : undefined,
      }
      this.event.emit('compaction', args)
    })
  }

  async load(args: {
    drop?: MeshNode
    trashcans?: RobotTrashCan[]
  }): Promise<void> {
    if (args.drop) {
      this.element.drop.id.value = HtmlTool.set(args.drop.Id)
      this.element.drop.rfid.value = HtmlTool.set(args.drop.Rfid)
      this.element.drop.name.value = HtmlTool.set(args.drop.Name)
      this.element.drop.type.can.value = await EnumTool.CanType(
        args.drop.CanType,
        ''
      )
    }
    if (args.trashcans) {
      this.trashcans = args.trashcans
    }

    let index = this.trashcans.findIndex((x) => {
      return x.NodeId === this.element.drop.id.value
    })

    this.element.params.start.can.checked = index >= 0
  }
  clear(): void {
    this.element.drop.id.value = ''
    this.element.drop.rfid.value = ''
    this.element.drop.name.value = ''
    this.element.drop.type.can.value
  }
}
