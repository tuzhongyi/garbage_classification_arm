import { EventEmitter } from '../../../../common/event-emitter'
import { wait } from '../../../../common/tools/asyn'
import { HtmlTool } from '../../../../common/tools/html-tool/html.tool'
import { EnumNameValue } from '../../../../data-core/models/capabilities/enum-name-value.model'
import { SortationCalibration } from '../../../../data-core/models/sortation/sortation-calibration.model'
import { Manager } from '../../../../data-core/requests/managers/manager'

interface DeviceSortationCalibrationInfoEvent {
  rotation(value: string): void
}

export class DeviceSortationCalibrationInfoController {
  event = new EventEmitter<DeviceSortationCalibrationInfoEvent>()
  constructor() {
    this.regist()
    this.init()
  }
  private element = {
    Rotation: document.getElementById('Rotation') as HTMLSelectElement,
    Rows: document.getElementById('Rows') as HTMLSelectElement,
    Columns: document.getElementById('Columns') as HTMLSelectElement,
    ApertureDelay: document.getElementById('ApertureDelay') as HTMLInputElement,
    CompletedDelay: document.getElementById(
      'CompletedDelay'
    ) as HTMLInputElement,
  }
  private inited = false

  private regist() {
    this.element.Rotation.addEventListener('change', (e) => {
      this.event.emit('rotation', this.element.Rotation.value)
    })
    HtmlTool.input.number.mousewheelchangevalue(
      this.element.ApertureDelay,
      (value) => {
        this.element.ApertureDelay.value = value.toString()
      }
    )
    HtmlTool.input.number.mousewheelchangevalue(
      this.element.CompletedDelay,
      (value) => {
        this.element.CompletedDelay.value = value.toString()
      }
    )
  }

  private init() {
    Manager.capability.sortation
      .then((capability) => {
        if (capability.Rotations) {
          this.initRotation(capability.Rotations)
        }
        this.inited = true
      })
      .catch(() => {
        this.inited = true
      })
  }
  private initRotation(datas: EnumNameValue[]) {
    datas.forEach((data) => {
      let item = {
        Id: data.Value,
        Name: data.Name,
      }
      HtmlTool.select.append(item, this.element.Rotation)
    })
  }

  private _load(data: SortationCalibration) {
    this.element.Rotation.value = HtmlTool.set(data.Rotation)
    this.element.Rows.value = HtmlTool.set(data.Rows)
    this.element.Columns.value = HtmlTool.set(data.Columns)
    this.element.ApertureDelay.value = HtmlTool.set(data.ApertureDelay)
    this.element.CompletedDelay.value = HtmlTool.set(data.CompletedDelay)
  }

  load(data: SortationCalibration) {
    wait(
      () => this.inited,
      () => this._load(data)
    )
  }

  get(data: SortationCalibration) {
    data.Rotation = HtmlTool.get(this.element.Rotation.value)
    data.Rows = HtmlTool.get(this.element.Rows.value, 'number')
    data.Columns = HtmlTool.get(this.element.Columns.value, 'number')
    data.ApertureDelay = HtmlTool.get(
      this.element.ApertureDelay.value,
      'number'
    )
    data.CompletedDelay = HtmlTool.get(
      this.element.CompletedDelay.value,
      'number'
    )
    return data
  }
}
