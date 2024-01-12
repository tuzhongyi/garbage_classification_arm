import { LocationTool } from '../../common/tools/location.tool'
import { MeshNodeType } from '../../data-core/enums/robot/mesh-node-type.model'
import { MeshEdge } from '../../data-core/models/robot/mesh-edge.model'
import { MeshNodePosition } from '../../data-core/models/robot/mesh-node-position.model'
import { MeshNode } from '../../data-core/models/robot/mesh-node.model'
import { RobotCommandResult } from '../../data-core/models/robot/robot-command-result.model'
import { DeviceRobotConfigBusiness } from './device-robot-config.business'
import { DeviceRobotConfigHtmlController } from './device-robot-config.html.controller'
import { DeviceRobotConfigModel } from './device-robot-config.model'

export namespace DeviceRobotConfig {
  class Controller {
    constructor() {
      this.regist()
      this.load()
    }
    html = new DeviceRobotConfigHtmlController()
    business = new DeviceRobotConfigBusiness()

    model?: DeviceRobotConfigModel

    private command = 0

    get id() {
      let querys = LocationTool.querys(location.search)
      return querys.id
    }

    regist() {
      this.html.event.on('top', this.ontop.bind(this))
      this.html.event.on('down', this.ondown.bind(this))
      this.html.event.on('left', this.onleft.bind(this))
      this.html.event.on('right', this.onright.bind(this))
      this.html.event.on('start', this.onstart.bind(this))
      this.html.event.on('stop', this.onstop.bind(this))
      this.html.event.on('clear', this.onclear.bind(this))
    }

    async load() {
      this.model = await this.business.load(this.id)

      this.html.load(this.model)
      this.html.element.table.node.load(this.model.nodes)
    }

    getLast() {
      if (!this.model) throw new Error('model is null')
      if (this.model.nodes.length > 0) {
        return this.model.nodes[this.model.nodes.length - 1]
      }
      let node = new MeshNode()
      node.Id = '0'
      node.Name = '0'
      node.NodeType = MeshNodeType.ChargingPort
      node.Position = new MeshNodePosition()
      node.Position.X = 0
      node.Position.Y = 0
      return node
    }

    // runing(last: MeshNode, current: MeshNode) {
    //   if (!this.model) return

    //   this.model.nodes.push(current)

    //   let edge = new MeshEdge()
    //   edge.Start = new MeshDestination()
    //   edge.Start.Id = last.Id
    //   edge.Start.Position = {
    //     X: last.Position.X,
    //     Y: last.Position.Y,
    //   }
    //   edge.End = new MeshDestination()
    //   edge.End.Id = current.Id
    //   edge.End.Position = {
    //     X: current.Position.X,
    //     Y: current.Position.Y,
    //   }
    //   this.model.edges.push(edge)

    //   this.load()
    // }
    onclear() {
      if (!this.model) return
      this.business.deleteNode(
        this.id,
        this.model.nodes.map((x) => x.Id)
      )
      this.business.deleteEdge(
        this.id,
        this.model.edges.map((x) => x.Id!)
      )
    }
    ontop() {
      this.business.top(this.id)
    }
    ondown() {
      this.business.down(this.id)
    }
    onleft() {
      this.business.left(this.id)
    }
    onright() {
      this.business.right(this.id)
    }
    onstart() {
      this.business.stop(this.id)
      this.business.start(this.id).then((x) => {
        this.run()
      })
    }
    onstop() {
      this.business.stop(this.id)
    }

    run() {
      setTimeout(() => {
        this.runing()
        this.run()
      }, 1000)
    }
    async runing() {
      if (!this.model) return
      // let data = await this.business.result(this.id)
      // if (data instanceof RobotMeshStepCommandData) {
      //   if (data.Rfid) {
      //     let index = this.model.nodes.findIndex((x) => x.Rfid == data.Rfid)
      //     if (index < 0) {
      //       this.load()
      //     }
      //   }
      // }
      let last = this.getLast()
      let results = await this.business.result(this.id)
      let result = results.find((x) => !!x.Data.Rfid)
      if (result && !this.hasNode(result.Data.Rfid)) {
        let node = await this.createNode(
          this.model.nodes.length.toString(),
          result,
          last.Position,
          this.model.nodes.length == 0
        )
        if (this.model.nodes.length > 0) {
          this.createEdge(last, node, result)
        }
        await this.load()
      }
    }

    hasNode(rfid: string) {
      if (!this.model) throw new Error('model is null')
      let index = this.model.nodes.findIndex((x) => x.Rfid == rfid)
      return index >= 0
    }

    createNode(
      id: string,
      result: RobotCommandResult,
      last: MeshNodePosition,
      zero = false
    ) {
      let node = new MeshNode()
      node.Id = id
      node.Name = node.Id
      node.NodeType = zero
        ? MeshNodeType.ChargingPort
        : MeshNodeType.MagneticPin
      node.Rfid = result.Data.Rfid
      node.Position = new MeshNodePosition()
      if (zero) {
        node.Position.X = 0
        node.Position.Y = 0
      } else {
        switch (result.Data.Direction) {
          case 0: //上
            node.Position.X = last.X
            node.Position.Y = last.Y + (result.Data.Distance ?? 0)
            break
          case 180: //下
            node.Position.X = last.X
            node.Position.Y = last.Y - (result.Data.Distance ?? 0)
            break
          case 90: //右
            node.Position.X = last.X + (result.Data.Distance ?? 0)
            node.Position.Y = last.Y
            break
          case 270: //左
            node.Position.X = last.X - (result.Data.Distance ?? 0)
            node.Position.Y = last.Y
            break
          default:
            break
        }
      }
      return this.business.createNode(this.id, node)
    }
    createEdge(start: MeshNode, end: MeshNode, result: RobotCommandResult) {
      let edge = new MeshEdge()
      edge.Direction = result.Data.Direction
      edge.Distance = result.Data.Distance
      edge.Start = start
      edge.End = end
      return this.business.createEdge(this.id, edge)
    }
  }

  const controller = new Controller()
}
