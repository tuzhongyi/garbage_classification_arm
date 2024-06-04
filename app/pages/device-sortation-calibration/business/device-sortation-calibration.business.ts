import { SortationCommandType } from '../../../data-core/enums/sortation/sortation-command-type.enum'
import { SortationCalibration } from '../../../data-core/models/sortation/sortation-calibration.model'
import { SortationCommand } from '../../../data-core/models/sortation/sortation-command.model'
import { HowellHttpClient } from '../../../data-core/requests/http-client'
import { GetSortationGridsParams } from '../../../data-core/requests/services/sortation/sortation.params'
import { ArmSortationRequestService } from '../../../data-core/requests/services/sortation/sortation.service'
import { DeviceSortationCalibrationSource } from '../device-sortation-calibration.model'
import { DeviceSortationCalibrationChannelBusiness } from './device-sortation-calibration-channel.business'
import { DeviceSortationCalibrationRobotBusiness } from './device-sortation-calibration-device.business'

export class DeviceSortationCalibrationBusiness {
  private client = new HowellHttpClient.HttpClient()
  private service = new ArmSortationRequestService(this.client.http)
  channel = new DeviceSortationCalibrationChannelBusiness()
  sortation = new DeviceSortationCalibrationRobotBusiness()
  async source() {
    let model = new DeviceSortationCalibrationSource()
    model.channels = await this.channel.load()
    return model
  }

  get(id: string) {
    return this.service.device.calibration.get(id)
  }
  update(data: SortationCalibration) {
    return this.service.device.calibration.update(data)
  }
  grid(data: SortationCalibration) {
    let params = new GetSortationGridsParams()
    params.Columns = data.Columns
    params.Rows = data.Rows
    params.Rotation = data.Rotation
    params.ConsoleArea = data.ConsoleArea
    return this.service.device.calibration.grid(params)
  }

  moveh2a(id: string) {
    return this.command(id, SortationCommandType.MoveXNegative)
  }
  movea2h(id: string) {
    return this.command(id, SortationCommandType.MoveXPostive)
  }
  move1to8(id: string) {
    return this.command(id, SortationCommandType.MoveYPostive)
  }
  move8to1(id: string) {
    return this.command(id, SortationCommandType.MoveYNegative)
  }

  stop(id: string) {
    return this.command(id, SortationCommandType.Stop)
  }

  up(id: string) {
    return this.command(id, SortationCommandType.TongUp)
  }
  down(id: string) {
    return this.command(id, SortationCommandType.TongDown)
  }

  command(id: string, cmd: string) {
    let command = new SortationCommand()
    command.CommandType = cmd as SortationCommandType
    return this.service.device.command(id, command)
  }
}
