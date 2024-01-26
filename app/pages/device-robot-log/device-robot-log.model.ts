import { DateTimeTool } from '../../common/tools/date-time-tool/datetime.tool'
import { Duration } from '../../common/tools/date-time-tool/duration.model'
import { MeshNodeType } from '../../data-core/enums/robot/mesh-node-type.model'
import { CanType } from '../../data-core/enums/robot/robot-can-type.model'

export class DeviceRobotLogTableArgs {
  duration: Duration = DateTimeTool.allDay(new Date())
  nodeType?: MeshNodeType
  canType?: CanType
}
