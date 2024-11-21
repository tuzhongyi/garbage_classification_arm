import { DeviceCompactorOperationCommandController } from './controller/device-compactor-operation-command.controller'
import { DeviceCompactorOperationCompressionController } from './controller/device-compactor-operation-compression.controller'

import './device-compactor-operation.less'

export class DeviceCompactorOperationHtmlController {
  compression = new DeviceCompactorOperationCompressionController()
  command = new DeviceCompactorOperationCommandController()
}
