import { EventEmitter } from '../../../../common/event-emitter'
import { MultiSelectControl } from '../../../../common/tools/controls/multi-select-control/multi-select-control'
import { ModelLabel } from '../../../../data-core/models/arm/analysis/model-label.model'
import { GarbageDropRule } from '../../../../data-core/models/arm/analysis/rules/garbage-drop-rule.model'
import { AIEventRuleDetailsInfoEvent } from '../../ai-event-rule-details.event'

export class AIEventRuleDetailsGarbageDropController {
  constructor() {
    this._init()
    this.regist()
  }
  element = {
    Confidence: document.getElementById('Confidence') as HTMLInputElement,
    TargetRatio: document.getElementById('TargetRatio') as HTMLInputElement,
    MinTargetNumber: document.getElementById(
      'MinTargetNumber'
    ) as HTMLInputElement,
    CountInterval: document.getElementById('CountInterval') as HTMLInputElement,
    TimeoutInterval: document.getElementById(
      'TimeoutInterval'
    ) as HTMLInputElement,
    SuperTimeoutInterval: document.getElementById(
      'SuperTimeoutInterval'
    ) as HTMLInputElement,
    ObjectLabels: new MultiSelectControl(
      document.getElementById('ObjectLabels') as HTMLDivElement
    ),
  }
  event: EventEmitter<AIEventRuleDetailsInfoEvent> = new EventEmitter()

  private data?: GarbageDropRule
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
    this.element.MinTargetNumber.addEventListener('input', () => {
      if (this.data) {
        this.data.MinTargetNumber = parseInt(this.element.MinTargetNumber.value)
      }
    })
    this.element.CountInterval.addEventListener('input', () => {
      if (this.data) {
        this.data.CountInterval = parseInt(this.element.CountInterval.value)
      }
    })
    this.element.TimeoutInterval.addEventListener('input', () => {
      if (this.data) {
        this.data.TimeoutInterval = parseInt(this.element.TimeoutInterval.value)
      }
    })
    this.element.SuperTimeoutInterval.addEventListener('input', () => {
      if (this.data) {
        this.data.SuperTimeoutInterval = parseInt(
          this.element.SuperTimeoutInterval.value
        )
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

  load(info: GarbageDropRule) {
    this.data = info
    this.element.Confidence.value = info.Confidence.toString()
    this.element.TargetRatio.value = info.TargetRatio.toString()
    this.element.MinTargetNumber.value = info.MinTargetNumber.toString()
    this.element.CountInterval.value = info.CountInterval.toString()
    this.element.TimeoutInterval.value = info.TimeoutInterval.toString()
    this.element.SuperTimeoutInterval.value =
      info.SuperTimeoutInterval.toString()
    let labels = info.ObjectLabels.map((label) => {
      return {
        Id: label.LabelId,
        Name: label.LabelName,
      }
    })
    this.element.ObjectLabels.select(labels)
  }
}
