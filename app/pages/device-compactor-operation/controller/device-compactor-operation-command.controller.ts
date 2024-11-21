import { EventEmitter } from '../../../common/event-emitter'
import { HtmlTool } from '../../../common/tools/html-tool/html.tool'
import { CompactorCommandType } from '../../../data-core/enums/compactor/compactor-command-type.enum'
import { Manager } from '../../../data-core/requests/managers/manager'

interface DeviceCompactorOperationCommandEvent {
  command(value: CompactorCommandType): void
}

export class DeviceCompactorOperationCommandController {
  event = new EventEmitter<DeviceCompactorOperationCommandEvent>()

  constructor() {
    this.init()
    this.regist()
  }

  private element = {
    type: document.getElementById('command_type') as HTMLSelectElement,
    todo: document.getElementById('command_todo') as HTMLInputElement,
  }

  private init() {
    Manager.capability.compactor.then((x) => {
      if (x.CommandTypes) {
        x.CommandTypes.forEach((item) => {
          HtmlTool.select.append(item, this.element.type)
        })
      }
    })
  }

  private regist() {
    this.element.todo.addEventListener('click', () => {
      this.event.emit('command', this.element.type.value)
    })
  }
}
