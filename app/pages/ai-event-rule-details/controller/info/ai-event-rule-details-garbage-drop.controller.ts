import { EventEmitter } from '../../../../common/event-emitter'
import { MultiSelectControl } from '../../../../common/tools/controls/multi-select-control/multi-select-control'
import { HtmlTool } from '../../../../common/tools/html-tool/html.tool'
import { wait } from '../../../../common/tools/wait'
import { ModelLabel } from '../../../../data-core/models/arm/analysis/model-label.model'
import { GarbageDropRule } from '../../../../data-core/models/arm/analysis/rules/garbage-drop-rule.model'
import { AIEventRuleDetailsInfoEvent } from '../../ai-event-rule-details.event'
import { IAIEventRuleController } from '../../ai-event-rule-details.model'

export class AIEventRuleDetailsGarbageDropController
  implements IAIEventRuleController<GarbageDropRule>
{
  event: EventEmitter<AIEventRuleDetailsInfoEvent> = new EventEmitter()

  constructor() {
    this._init()
    this.regist()
  }
  private element = {
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
    HtmlTool.input.number.mousewheelchangevalue(this.element.Confidence)
    HtmlTool.input.number.mousewheelchangevalue(this.element.TargetRatio)
    HtmlTool.input.number.mousewheelchangevalue(this.element.MinTargetNumber)
    HtmlTool.input.number.mousewheelchangevalue(this.element.CountInterval)
    HtmlTool.input.number.mousewheelchangevalue(this.element.TimeoutInterval)
    HtmlTool.input.number.mousewheelchangevalue(
      this.element.SuperTimeoutInterval
    )
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

  load(info: GarbageDropRule) {
    this.element.Confidence.value = info.Confidence.toString()
    this.element.TargetRatio.value = info.TargetRatio.toString()
    this.element.MinTargetNumber.value = info.MinTargetNumber.toString()
    this.element.CountInterval.value = info.CountInterval.toString()
    this.element.TimeoutInterval.value = info.TimeoutInterval.toString()
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
  get(data = new GarbageDropRule()) {
    data.Confidence = parseInt(this.element.Confidence.value)
    data.CountInterval = parseInt(this.element.CountInterval.value)
    data.MinTargetNumber = parseInt(this.element.MinTargetNumber.value)
    data.SuperTimeoutInterval = parseInt(
      this.element.SuperTimeoutInterval.value
    )
    data.TargetRatio = parseInt(this.element.TargetRatio.value)
    data.TimeoutInterval = parseInt(this.element.TimeoutInterval.value)
    let labels = this.element.ObjectLabels.selecteds
    data.ObjectLabels = labels.map((x) => {
      return this.source.labels.find((y) => y.LabelId === x.Id)!
    })
    return data
  }
}
