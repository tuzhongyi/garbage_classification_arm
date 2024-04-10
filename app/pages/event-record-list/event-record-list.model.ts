import { DateTimeTool } from '../../common/tools/date-time-tool/datetime.tool'
import { EventType } from '../../data-core/enums/event-type.enum'
import { PictureWindowModel } from '../window-picture/window-picture.model'
import { IWindowQuery, WindowModel } from '../window/window.model'

export class EventRecordListTableArgs {
  duration = DateTimeTool.allDay(new Date())
  type?: EventType
  uploaded?: boolean
}

export class EventRecordListWindow {
  picture = new PictureWindow()
  resources = new ResourcesWindow()
}

class PictureWindow extends PictureWindowModel {
  style = {
    width: '50%',
    height: '50%',
  }
  url: string = '../window-picture/window-picture.html'
}
class ResourcesWindow extends WindowModel<ResourcesWindowQuery> {
  style = {
    width: '50%',
    height: '50%',
  }
  url: string = '../event-record-resources/event-record-resources.html'
}

export interface ResourcesWindowQuery extends IWindowQuery {
  id: string
}
