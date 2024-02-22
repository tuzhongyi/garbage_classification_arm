import { HtmlTool } from '../../common/tools/html-tool/html.tool'
import { AnalysisServer } from '../../data-core/models/arm/analysis/analysis-server.model'

import './ai-analysis-server-info.less'

export class AIAnalysisServerInfoHtmlController {
  constructor() {}
  private element = {
    Name: document.getElementById('Name') as HTMLInputElement,
    IPAddress: document.getElementById('IPAddress') as HTMLInputElement,
    Port: document.getElementById('Port') as HTMLInputElement,
    Username: document.getElementById('Username') as HTMLInputElement,
    Password: document.getElementById('Password') as HTMLInputElement,
    ProtocolType: document.getElementById('ProtocolType') as HTMLSelectElement,
    Interval: document.getElementById('Interval') as HTMLInputElement,
    Status: document.getElementById('Status') as HTMLInputElement,
    EventDest: document.getElementById('EventDest') as HTMLInputElement,
  }

  load(data: AnalysisServer) {
    this.element.Name.value = HtmlTool.set(data.Name)
    this.element.IPAddress.value = HtmlTool.set(data.IPAddress)
    this.element.Port.value = HtmlTool.set(data.Port)
    this.element.Username.value = HtmlTool.set(data.Username)
    this.element.Password.value = HtmlTool.set(data.Password)
    this.element.ProtocolType.value = HtmlTool.set(data.ProtocolType)
    this.element.Interval.value = HtmlTool.set(data.Interval)
    this.element.Status.value = data.Status === 0 ? '正常' : '离线'
    this.element.EventDest.value = HtmlTool.set(data.EventDest)
  }
}
