import { MajorType } from '../../data-core/enums/robot/major-type.enum'

export class DeviceTrashCanLogTableArgs {
  date = new Date()
  major?: MajorType
  minor?: string
}
