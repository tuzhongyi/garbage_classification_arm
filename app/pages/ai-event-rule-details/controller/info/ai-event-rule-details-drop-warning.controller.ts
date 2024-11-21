import { EventEmitter } from '../../../../common/event-emitter'
import { wait } from '../../../../common/tools/asyn'
import { MultiSelectControl } from '../../../../common/tools/controls/multi-select-control/multi-select-control'
import { HtmlTool } from '../../../../common/tools/html-tool/html.tool'
import { ModelLabel } from '../../../../data-core/models/arm/analysis/model-label.model'
import { DropWarningRule } from '../../../../data-core/models/arm/analysis/rules/drop-warning-rule.model'
import { AIEventRuleDetailsInfoEvent } from '../../ai-event-rule-details.event'
import { IAIEventRuleController } from '../../ai-event-rule-details.model'

export class AIEventRuleDetailsDropWarningController
  implements IAIEventRuleController<DropWarningRule>
{
  event: EventEmitter<AIEventRuleDetailsInfoEvent> = new EventEmitter()

  constructor() {
    this._init()
    this.regist()
  }
  private element = {
    Duration: document.getElementById('Duration') as HTMLInputElement,
    Confidence: document.getElementById('Confidence') as HTMLInputElement,

    TargetRatio: document.getElementById('TargetRatio') as HTMLInputElement,
    ObjectLabels: new MultiSelectControl(
      document.getElementById('ObjectLabels') as HTMLDivElement
    ),
  }
  private inited = false
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
    HtmlTool.input.number.mousewheelchangevalue(this.element.Duration)
    HtmlTool.input.number.mousewheelchangevalue(this.element.Confidence)
    HtmlTool.input.number.mousewheelchangevalue(this.element.TargetRatio)
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
    this.inited = true
  }

  load(info: DropWarningRule) {
    this.element.Confidence.value = info.Confidence.toString()
    this.element.Duration.value = info.Duration.toString()
    this.element.TargetRatio.value = info.TargetRatio.toString()
    wait(
      () => {
        return this.inited
      },
      () => {
        let labels = info.ObjectLabels.map((label) => {
          return {
            Id: label.LabelId,
            Name: label.LabelName,
          }
        })
        this.element.ObjectLabels.select(labels)
      }
    )
  }

  get(data = new DropWarningRule()) {
    data.Confidence = parseInt(this.element.Confidence.value)
    data.Duration = parseInt(this.element.Duration.value)
    data.TargetRatio = parseInt(this.element.TargetRatio.value)
    let labels = this.element.ObjectLabels.selecteds
    data.ObjectLabels = labels.map((x) => {
      return this.source.labels.find((y) => y.LabelId === x.Id)!
    })
    return data
  }
}
