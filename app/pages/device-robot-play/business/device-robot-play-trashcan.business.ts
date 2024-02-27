import { HowellAuthHttp } from '../../../data-core/requests/auth/howell-auth-http'
import { ArmTrashCansRequestService } from '../../../data-core/requests/services/trash-cans/trash-cans.service'

export class DeviceRobotPlayTrashCanBusiness {
  constructor(http: HowellAuthHttp) {
    this.service = new ArmTrashCansRequestService(http)
  }
  private service: ArmTrashCansRequestService

  load() {
    return this.service.array().then((x) => {
      // if (x.length === 0) {
      //   let test1 = new RobotTrashCan()
      //   test1.CanType = CanType.Dry
      //   test1.NodeId = '6'
      //   test1.Position = { X: 8, Y: -169 }
      //   test1.Volume = 50
      //   test1.CoverState = CoverState.Opened

      //   let test2 = new RobotTrashCan()
      //   test2.CanType = CanType.Wet
      //   test2.NodeId = '10'
      //   test2.Position = { X: 85, Y: -169 }
      //   test2.Volume = 50
      //   test2.CoverState = CoverState.Opened

      //   let test3 = new RobotTrashCan()
      //   test3.CanType = CanType.Recycle
      //   test3.NodeId = '16'
      //   test3.Position = { X: 261, Y: -169 }
      //   test3.Volume = 50
      //   test3.CoverState = CoverState.Opened

      //   let test4 = new RobotTrashCan()
      //   test4.CanType = CanType.Hazard

      //   test4.Position = { X: 340, Y: -169 }
      //   test4.Volume = 50
      //   test4.CoverState = CoverState.Opened

      //   let result = [test1, test2, test3, test4]

      //   let types = [CanType.Dry, CanType.Wet, CanType.Recycle, CanType.Hazard]

      //   for (let i = 0; i < 50; i++) {
      //     let item = new RobotTrashCan()
      //     item.CanType = types[i % 4]
      //     item.Volume = 50
      //     test4.CoverState = CoverState.Opened
      //     result.push(item)
      //   }
      //   return result
      // }
      return x
    })
  }
}
