import { EventEmitter } from '../../../../common/event-emitter'
import { MultiSelectControl } from '../../../../common/tools/controls/multi-select-control/multi-select-control'
import { ModelLabel } from '../../../../data-core/models/arm/analysis/model-label.model'
import { IllegalDropRule } from '../../../../data-core/models/arm/analysis/rules/illegal-drop-rule.model'
import { AIEventRuleDetailsInfoEvent } from '../../ai-event-rule-details.event'

export class AIEventRuleDetailsIllegalDropController {
  constructor() {
    this._init()
    this.regist()
  }
  element = {
    Duration: document.getElementById('Duration') as HTMLInputElement,
    Confidence: document.getElementById('Confidence') as HTMLInputElement,
    TargetRatio: document.getElementById('TargetRatio') as HTMLInputElement,
    OverlapRatio: document.getElementById('OverlapRatio') as HTMLInputElement,
    ObjectLabels: new MultiSelectControl(
      document.getElementById('ObjectLabels') as HTMLDivElement
    ),
  }
  event: EventEmitter<AIEventRuleDetailsInfoEvent> = new EventEmitter()
  private data?: IllegalDropRule
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
    this.element.OverlapRatio.addEventListener('input', () => {
      if (this.data) {
        this.data.OverlapRatio = parseInt(this.element.OverlapRatio.value)
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

  load(info: IllegalDropRule) {
    this.data = info
    this.element.Confidence.value = info.Confidence.toString()
    this.element.Duration.value = info.Duration.toString()
    this.element.OverlapRatio.value = info.OverlapRatio.toString()
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
