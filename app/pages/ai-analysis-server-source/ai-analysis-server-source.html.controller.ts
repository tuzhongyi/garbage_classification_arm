import '../../../assets/styles/table-sticky.less'
import { AIAnalysisServerSourceHtmlTable } from './ai-analysis-server-source.html.table'
import './ai-analysis-server-source.less'
export class AIAnalysisServerSourceHtmlController {
  constructor() {
    this.init()
  }

  element = {
    table: new AIAnalysisServerSourceHtmlTable(),
  }
  //   <colgroup>
  //   <col [ngStyle]="{ width: width }" *ngFor="let width of widths" />
  // </colgroup>
  init() {}
}
