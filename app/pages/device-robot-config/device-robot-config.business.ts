import * as fs from 'file-saver'
import { Robot } from '../../data-core/models/robot/robot.model'
import { HowellHttpClient } from '../../data-core/requests/http-client'
import { ArmRobotRequestService } from '../../data-core/requests/services/robot/robot.service'
export class DeviceRobotConfigBusiness {
  private client = new HowellHttpClient.HttpClient()
  private service = new ArmRobotRequestService(this.client.http)
  private _robot?: Robot
  private async robot(id: string) {
    if (!this._robot) {
      this._robot = await this.service.get(id)
    }
    return this._robot
  }

  download(id: string) {
    this.robot(id).then((robot) => {
      this.service.mesh.node.array(id).then((nodes) => {
        let data = JSON.stringify(nodes)
        let suffix = 'json'
        let filename = `${robot.Name ?? robot.HostAddress}.${suffix}`
        let blob = new Blob([data], {
          type: 'application/json',
        })
        fs.saveAs(blob, filename)
      })
    })
  }
  upload(file: ArrayBuffer): Promise<boolean> {
    throw new Error('Method not implemented.')
  }
}
