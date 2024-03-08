import { TrashCanWarningParams } from '../../data-core/models/arm/analysis/trash-can-warning-params.model'

export class DeviceTrashCanParamsCreater {
  static TrashCanWarningParams() {
    let data = new TrashCanWarningParams()
    data.CanThresholds = []
    data.TrashCanTimeout = 120
    data.NoReplacementTimeout = 120
    return data
  }
}
