import { EventEmitter } from '../../../../common/event-emitter'
import { wait } from '../../../../common/tools/asyn'
import { MultiSelectControl } from '../../../../common/tools/controls/multi-select-control/multi-select-control'
import { HtmlTool } from '../../../../common/tools/html-tool/html.tool'
import { ModelLabel } from '../../../../data-core/models/arm/analysis/model-label.model'
import { MixedIntoRule } from '../../../../data-core/models/arm/analysis/rules/mixed-into-rule.model'
import { CameraAIModel } from '../../../../data-core/models/arm/camera-ai-model.model'
import { AIEventRuleDetailsInfoEvent } from '../../ai-event-rule-details.event'
import { IAIEventRuleController } from '../../ai-event-rule-details.model'

export class AIEventRuleDetailsMixedIntoController
  implements IAIEventRuleController<MixedIntoRule>
{
  event: EventEmitter<AIEventRuleDetailsInfoEvent> = new EventEmitter()

  constructor() {
    this._init()
    this.regist()
  }
  private element = {
    Duration: document.getElementById('Duration') as HTMLInputElement,
    Confidence: document.getElementById('Confidence') as HTMLInputElement,

    TrashCanRatio: document.getElementById('TrashCanRatio') as HTMLInputElement,
    TargetRatio: document.getElementById('TargetRatio') as HTMLInputElement,
    ObjectLabels: new MultiSelectControl(
      document.getElementById('ObjectLabels') as HTMLDivElement
    ),
    TrashCanLabels: new MultiSelectControl(
      document.getElementById('TrashCanLabels') as HTMLDivElement
    ),
  }
  private inited = false
  private source = {
    labels: [] as ModelLabel[],
    aimodels: [] as CameraAIModel[],
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
    HtmlTool.input.number.mousewheelchangevalue(this.element.TrashCanRatio)
  }

  init(labels: ModelLabel[]) {
    this.element.ObjectLabels.clear()
    this.element.TrashCanLabels.clear()
    this.source.labels = labels
    let datas = labels.map((x) => {
      return {
        Id: x.LabelId,
        Name: x.LabelName,
      }
    })
    this.element.ObjectLabels.load(datas)
    this.element.TrashCanLabels.load(datas)
    this.inited = true
  }

  load(info: MixedIntoRule) {
    this.element.Confidence.value = info.Confidence.toString()
    this.element.Duration.value = info.Duration.toString()
    this.element.TargetRatio.value = info.TargetRatio.toString()
    this.element.TrashCanRatio.value = info.TrashCanRatio.toString()
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

        labels = info.TrashCanLabels.map((label) => {
          return {
            Id: label.LabelId,
            Name: label.LabelName,
          }
        })
        this.element.TrashCanLabels.select(labels)
      }
    )
  }

  get(data = new MixedIntoRule()) {
    data.Confidence = parseInt(this.element.Confidence.value)
    data.Duration = parseInt(this.element.Duration.value)
    data.TargetRatio = parseInt(this.element.TargetRatio.value)
    data.TrashCanRatio = parseInt(this.element.TrashCanRatio.value)
    let labels = this.element.ObjectLabels.selecteds
    data.ObjectLabels = labels.map((x) => {
      return this.source.labels.find((y) => y.LabelId === x.Id)!
    })
    labels = this.element.TrashCanLabels.selecteds
    data.TrashCanLabels = labels.map((x) => {
      return this.source.labels.find((y) => y.LabelId === x.Id)!
    })
    return data
  }
}
