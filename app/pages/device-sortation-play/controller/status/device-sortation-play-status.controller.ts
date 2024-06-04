import { Language } from '../../../../common/language'
import { HtmlTool } from '../../../../common/tools/html-tool/html.tool'
import { SortationDevice } from '../../../../data-core/models/sortation/sortation-device.model'

export class DeviceSortationPlayStatusController {
  private element = {
    Status: document.getElementById('Status') as HTMLSpanElement,
    DropPortStatus: document.getElementById(
      'DropPortStatus'
    ) as HTMLSpanElement,
    ConsoleOpenStatus: document.getElementById(
      'ConsoleOpenStatus'
    ) as HTMLSpanElement,
    AirPressure: document.getElementById('AirPressure') as HTMLSpanElement,
  }

  load(data: SortationDevice) {
    this.element.Status.innerText = HtmlTool.set(
      Language.OnlineStatus(data.Status),
      '-'
    )
    this.element.DropPortStatus.innerText = HtmlTool.set(
      Language.OpenOrClose(data.DropPortStatus),
      '-'
    )
    this.element.ConsoleOpenStatus.innerText = HtmlTool.set(
      Language.OpenOrClose(data.ConsoleOpenStatus),
      '-'
    )
    this.element.AirPressure.innerText = HtmlTool.set(
      Language.OpenOrClose(data.AirPressure),
      '-'
    )
  }
}
