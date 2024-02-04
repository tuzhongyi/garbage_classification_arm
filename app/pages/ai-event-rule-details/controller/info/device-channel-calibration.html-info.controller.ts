import { EventEmitter } from '../../../../common/event-emitter'
import { ModelLabel } from '../../../../data-core/models/arm/analysis/model-label.model'
import { IllegalDropRule } from '../../../../data-core/models/arm/analysis/rules/illegal-drop-rule.model'
import { IIdNameModel } from '../../../../data-core/models/model.interface'
import { AIEventRuleDetailsInfoEvent } from '../../ai-event-rule-details.event'

export class AIEventRuleDetailsInfoController {
  constructor() {
    this.regist()
  }
  element = {
    Duration: document.getElementById('Duration') as HTMLInputElement,
    Confidence: document.getElementById('Confidence') as HTMLInputElement,
    ObjectLabels: document.getElementById('ObjectLabels') as HTMLSelectElement,
    TargetRatio: document.getElementById('TargetRatio') as HTMLInputElement,
    OverlapRatio: document.getElementById('OverlapRatio') as HTMLInputElement,
  }
  event: EventEmitter<AIEventRuleDetailsInfoEvent> = new EventEmitter()

  private data?: IllegalDropRule
  private source = {
    labels: [] as ModelLabel[],
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
    this.element.ObjectLabels.addEventListener('change', () => {})
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

  private appendOption(model: IIdNameModel, parent: HTMLSelectElement) {
    let option = document.createElement('option')
    option.innerHTML = model.Name
    option.value = model.Id
    parent.appendChild(option)
  }
  loadAIModels(labels: ModelLabel[], cannull = false) {
    this.element.ObjectLabels.innerHTML = ''
    this.source.labels = labels

    for (let i = 0; i < labels.length; i++) {
      let model: IIdNameModel = {
        Id: labels[i].LabelId,
        Name: labels[i].LabelName,
      }
      this.appendOption(model, this.element.ObjectLabels)
    }
  }

  load(info: IllegalDropRule) {
    this.data = info
    this.element.Confidence.value = info.Confidence.toString()
    this.element.Duration.value = info.Duration.toString()
    this.element.OverlapRatio.value = info.OverlapRatio.toString()
    this.element.TargetRatio.value = info.TargetRatio.toString()
  }
}
