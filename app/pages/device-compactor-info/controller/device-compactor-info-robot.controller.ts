import { EventEmitter } from '../../../common/event-emitter'
import { HtmlTool } from '../../../common/tools/html-tool/html.tool'
import { MeshNode } from '../../../data-core/models/robot/mesh-node.model'
import { Robot } from '../../../data-core/models/robot/robot.model'

interface DeviceCompactorInfoNodeEvent {
  robot(id: string): void
  ok(value: string): void
}

export class DeviceCompactorInfoNodeController {
  event = new EventEmitter<DeviceCompactorInfoNodeEvent>()

  public get show(): boolean {
    return this.element.panel.style.display != 'none'
  }
  public set show(v: boolean) {
    this.element.panel.style.display = v ? '' : 'none'
  }

  constructor() {
    this.regist()
  }

  private element = {
    panel: document.getElementById('robot_panel') as HTMLDivElement,
    robot: document.getElementById('robot') as HTMLSelectElement,
    node: {
      id: document.getElementById('node_id') as HTMLInputElement,
      name: document.getElementById('node') as HTMLSelectElement,
    },
    button: {
      ok: document.getElementById('node_ok') as HTMLButtonElement,
      cancel: document.getElementById('node_cancel') as HTMLButtonElement,
    },
  }

  private regist() {
    this.element.panel.addEventListener('click', (e) => {
      e.stopImmediatePropagation()
    })
    this.element.robot.addEventListener('change', () => {
      this.event.emit('robot', this.element.robot.value)
    })
    this.element.button.cancel.addEventListener('click', () => {
      this.show = false
    })
    this.element.button.ok.addEventListener('click', () => {
      this.event.emit('ok', this.element.node.id.value)
      this.show = false
    })
  }

  init(datas: Robot[]) {
    datas.forEach((data) => {
      let model = {
        Id: data.Id,
        Name: data.Name ?? '',
      }
      HtmlTool.select.append(model, this.element.robot)
    })
    this.event.emit('robot', this.element.robot.value)
  }
  nodes(datas: MeshNode[]) {
    datas.forEach((data) => {
      HtmlTool.select.append(data, this.element.node.name)
    })
    this.element.node.id.value = this.element.node.name.value
  }
  load(data: string) {
    this.element.node.id.value = data
  }
}
