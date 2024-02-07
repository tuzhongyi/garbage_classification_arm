import { EventEmitter } from '../../../../common/event-emitter'
import { MultiSelectControl } from '../../../../common/tools/controls/multi-select-control/multi-select-control'
import { ModelLabel } from '../../../../data-core/models/arm/analysis/model-label.model'
import { DropWarningRule } from '../../../../data-core/models/arm/analysis/rules/drop-warning-rule.model'
import { AIEventRuleDetailsInfoEvent } from '../../ai-event-rule-details.event'

export class AIEventRuleDetailsDropWarningController {
  constructor() {
    this._init()
    this.regist()
  }
  element = {
    Duration: document.getElementById('Duration') as HTMLInputElement,
    Confidence: document.getElementById('Confidence') as HTMLInputElement,

    TargetRatio: document.getElementById('TargetRatio') as HTMLInputElement,
    ObjectLabels: new MultiSelectControl(
      document.getElementById('ObjectLabels') as HTMLDivElement
    ),
  }
  event: EventEmitter<AIEventRuleDetailsInfoEvent> = new EventEmitter()

  private data?: DropWarningRule
  private source = {
    labels: [] as ModelLabel[],
  }
  private _init() {
    let element = this.element as any
    for (const key in element) {
      element[key].parentElement.parentElement.style.display = ''
    }
  }

  private regist() {
    this.element.Duration.addEventListener('input', () => {
      if (this.data) {
        this.data.Duration = parseInt(this.element.Duration.value)
      }
    })
    this.element.Confidence.addEventListener('input', () => {
      if (this.data) {
        this.data.Confidence = parseInt(this.element.Confidence.value)
      }
    })
    this.element.TargetRatio.addEventListener('input', () => {
      if (this.data) {
        this.data.TargetRatio = parseInt(this.element.TargetRatio.value)
      }
    })
    this.element.ObjectLabels.event.on('select', (items) => {
      if (this.data) {
        this.data.ObjectLabels = items.map((item) => {
          return this.source.labels.find(
            (label) => label.LabelId === item.Id
          ) as ModelLabel
        })
      }
    })
  }

  init(labels: ModelLabel[]) {
    this.element.ObjectLabels.clear()
    this.source.labels = labels
    let datas = labels.map((x) => {
      return {
        Id: x.LabelId,
        Name: x.LabelName,
      }
    })
    this.element.ObjectLabels.load(datas)
  }

  load(info: DropWarningRule) {
    this.data = info
    this.element.Confidence.value = info.Confidence.toString()
    this.element.Duration.value = info.Duration.toString()
    this.element.TargetRatio.value = info.TargetRatio.toString()
    let labels = info.ObjectLabels.map((label) => {
      return {
        Id: label.LabelId,
        Name: label.LabelName,
      }
    })
    this.element.ObjectLabels.select(labels)
  }
}
