import { DateTimeTool } from '../../common/tools/date-time-tool/datetime.tool'
import { Duration } from '../../common/tools/date-time-tool/duration.model'
import { MajorType } from '../../data-core/enums/robot/major-type.enum'

export class DeviceRobotLogTableArgs {
  duration: Duration = DateTimeTool.allDay(new Date())
  major?: MajorType
  minor?: string
}
