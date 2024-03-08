import { LocationTool } from '../../common/tools/location.tool'
import { MeshNodeType } from '../../data-core/enums/robot/mesh-node-type.model'
import { CanType } from '../../data-core/enums/robot/robot-can-type.model'
import { MeshEdge } from '../../data-core/models/robot/mesh-edge.model'
import { MeshNodePosition } from '../../data-core/models/robot/mesh-node-position.model'
import { MeshNode } from '../../data-core/models/robot/mesh-node.model'
import { RobotCommandResult } from '../../data-core/models/robot/robot-command-result.model'
import { DeviceRobotModel } from '../device-robot/device-robot.model'
import { DeviceRobotCalibrationBusiness } from './device-robot-calibration.business'
import { DeviceRobotCalibrationHtmlController } from './device-robot-calibration.html.controller'
import { DeviceRobotCalibrationMessage } from './device-robot-calibration.message'
import { DeviceRobotCalibrationWindow } from './device-robot-calibration.model'

export namespace DeviceRobotCalibration {
  class Controller {
    constructor() {
      this.regist()
      this.load()
    }
    private html = new DeviceRobotCalibrationHtmlController()
    private business = new DeviceRobotCalibrationBusiness()
    private message = new DeviceRobotCalibrationMessage()
    private window = new DeviceRobotCalibrationWindow()
    model?: DeviceRobotModel

    selected: {
      node?: MeshNode
      edge?: MeshEdge
    } = {}

    private _isruning: boolean = false
    public get isruning(): boolean {
      return this._isruning
    }
    public set isruning(v: boolean) {
      this._isruning = v
      this.html.echart.disable(this.isruning)
      this.html.table.node.disable(this.isruning)
      this.html.disable(!this.isruning)
    }

    private _saving: boolean = false
    public get saving(): boolean {
      return this._saving
    }
    public set saving(v: boolean) {
      this._saving = v
      this.html.disable(this.saving)
      this.html.message.className = ''
      this.html.message.innerHTML = '← 请保存并继续'
    }

    command = -1

    get id() {
      let querys = LocationTool.query.decode(location.search)
      return querys.id
    }

    //#region regist
    private regist() {
      window.addEventListener('beforeunload', () => {
        this.onstop()
      })
      this.registDirection()
      this.registCalibration()
      this.registEChart()
      this.registTable()
      this.registDetails()

      this.html.event.on('clear', this.onclear.bind(this))
    }
    private registDirection() {
      this.html.event.on('top', this.ontop.bind(this))
      this.html.event.on('down', this.ondown.bind(this))
      this.html.event.on('left', this.onleft.bind(this))
      this.html.event.on('right', this.onright.bind(this))
    }
    private registCalibration() {
      this.html.event.on('stop', this.onstop.bind(this))
      this.html.event.on('start', this.onstart.bind(this))
      this.message.event.on('tostart', this.tostart.bind(this))
    }
    private registEChart() {
      this.html.echart.event.on('select', (data) => {
        this.onnodeselect(data.Id)
      })
    }
    private registTable() {
      this.html.table.node.event.on('select', (id) => {
        this.onnodeselect(id)
      })
    }
    private registDetails() {
      this.html.details.event.on('nodetypechange', (type) => {
        this.onnodetypechange(type)
      })
      this.html.details.event.on('cantypechange', (type) => {
        this.oncantypechange(type)
      })
      this.html.details.event.on('nodexchange', () => {})
      this.html.details.event.on('nodeychange', () => {})
      this.html.details.event.on('distancechange', () => {
        let distance = parseFloat(this.html.details.element.edge.distance.value)
        if (this.selected.edge) {
          switch (this.selected.edge.Direction) {
            case 0:
              this.html.details.element.node.y.value = (
                this.selected.edge.Start.Position!.Y + distance
              ).toString()
              break
            case 90:
              this.html.details.element.node.x.value = (
                this.selected.edge.Start.Position!.X + distance
              ).toString()
              break
            case 180:
              this.html.details.element.node.y.value = (
                this.selected.edge.Start.Position!.Y - distance
              ).toString()
              break
            case 270:
              this.html.details.element.node.x.value = (
                this.selected.edge.Start.Position!.X - distance
              ).toString()
              break

            default:
              break
          }
        }
      })
      this.html.details.event.on('save', () => {
        this.onnodesave()
      })
    }
    //#endregion

    async load() {
      this.model = await this.business.load(this.id)

      this.html.load(this.model)
      this.html.table.node.load(this.model.nodes)
      return true
    }

    onnodeselect(id: string) {
      if (this.model) {
        this.selected.node = this.model.nodes.find((x) => x.Id === id)
        if (this.selected.node) {
          this.html.details.load(this.selected.node)
        }
      }
    }
    onnodesave() {
      if (this.selected.node) {
        this.selected.node.Name = this.html.details.element.node.name.value
        this.selected.node.Position.X = parseFloat(
          this.html.details.element.node.x.value
        )
        this.selected.node.Position.Y = parseFloat(
          this.html.details.element.node.y.value
        )
        this.saving = false
        this.business
          .update(this.id, this.selected.node)
          .then((x) => {
            this.html.message.className = ''
            this.html.message.innerHTML = '请继续操纵机器人 →'
            this.load()
          })
          .catch((e) => {
            this.html.message.className = 'error'
            this.html.message.innerHTML = '保存失败'
          })
      }
    }
    onnodetypechange(type: MeshNodeType) {
      if (this.selected.node) {
        this.selected.node.NodeType = type

        switch (type) {
          case MeshNodeType.DropPort:
          case MeshNodeType.StorePort:
            if (!this.selected.node.CanType) {
              this.selected.node.CanType = CanType.Dry
            }
            break

          default:
            this.selected.node.CanType = undefined
            break
        }
      }
    }
    oncantypechange(type?: CanType) {
      if (this.selected.node) {
        this.selected.node.CanType = type
      }
    }
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
      if (!this.saving) {
        this.business.location(this.id).then((x) => {
          if (this.model) {
            this.model.location = x
          }
          this.business.top(this.id)
          this.html.disable(true)
        })
      }
    }
    ondown() {
      if (!this.saving) {
        this.business.location(this.id).then((x) => {
          if (this.model) {
            this.model.location = x
          }
          this.business.down(this.id)
          this.html.disable(true)
        })
      }
    }
    onleft() {
      if (!this.saving) {
        this.business.location(this.id).then((x) => {
          if (this.model) {
            this.model.location = x
          }
          this.business.left(this.id)
          this.html.disable(true)
        })
      }
    }
    onright() {
      if (!this.saving) {
        this.business.location(this.id).then((x) => {
          if (this.model) {
            this.model.location = x
          }
          this.business.right(this.id)
          this.html.disable(true)
        })
      }
    }
    onstart() {
      this.window.confirm.message = '是否开始标定？'
      this.message.start_confirm(this.window.confirm)
    }
    tostart() {
      return new Promise<void>((resolve) => {
        this.business.calibrating(this.id).then((x) => {
          if (x) {
            this.business.stop(this.id).finally(() => {
              this.dostart()
              resolve()
            })
          } else {
            this.dostart()
            resolve()
          }
        })
      })
    }
    dostart() {
      this.business
        .start(this.id)
        .then((x) => {
          this.load()
          this.html.details.clear()
          this.isruning = true
          this.run()
          this.html.start()
          this.html.message.className = 'normal'
          this.html.message.innerHTML = '启动成功'
        })
        .catch((e) => {
          this.html.message.className = 'error'
          this.html.message.innerHTML = '启动失败'
        })
    }
    onstop() {
      this.isruning = false
      this.business
        .stop(this.id)
        .then((x) => {
          this.html.details.clear()
          this.html.stop()
          this.html.message.className = ''
          this.html.message.innerHTML = '标定已停止'
        })
        .catch((e) => {
          this.html.message.className = 'error'
          this.html.message.innerHTML = '停止命令执行失败'
        })
    }

    run() {
      setTimeout(() => {
        this.runing()
        if (this.isruning) {
          this.run()
        }
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
      let current = this.model.nodes.find(
        (x) =>
          this.model!.location.Position.X === x.Position.X &&
          this.model!.location.Position.Y === x.Position.Y
      )
      this.business
        .result(this.id)
        .then(async (results) => {
          if (!this.model) return
          let result = results.find((x) => !!x.Data.Rfid)
          if (result && this.command != result.Id) {
            this.command = result.Id!
            let index = this.findNode(result.Data.Rfid)
            if (index < 0) {
              if (!current) {
                current = new MeshNode()
                current.Position = this.model.location.Position
              }
              let node = await this.createNode(
                (this.model.nodes.length + 1).toString(),
                result,
                current.Position,
                this.model.nodes.length == 0
              )
              if (node) {
                let edge: MeshEdge | undefined = undefined
                if (this.model.nodes.length > 0) {
                  edge = await this.createEdge(current, node, result)
                }
                let loaded = await this.load()
                if (loaded) {
                  this.selected.node = node
                  this.selected.edge = edge
                  this.html.details.load(node, edge, true)
                  this.saving = true
                }
              }
            } else {
              let current = this.model.nodes[index]
              this.business.setLocation(current.Position.X, current.Position.Y)
              this.business.location(this.id).then((x) => {
                if (this.model) {
                  this.model.location = x
                  this.html.load(this.model)
                }
              })
            }
          }
        })
        .catch((e) => {
          if (this.command === e.Id) {
            return
          }
          this.command = e.Id
          this.html.message.className = 'warm'
          this.html.message.innerHTML = e.Desc
        })
    }

    findNode(rfid: string) {
      if (!this.model) throw new Error('model is null')
      return this.model.nodes.findIndex((x) => x.Rfid == rfid)
    }

    createNode(
      id: string,
      result: RobotCommandResult,
      last: MeshNodePosition,
      zero = false
    ) {
      let node = new MeshNode()
      node.Id = id

      node.NodeType = zero
        ? MeshNodeType.ChargingPort
        : MeshNodeType.MagneticPin
      node.Name = node.Id
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
      return this.business.createNode(this.id, node).catch((x) => {
        this.html.message.className = 'error'
        this.html.message.innerHTML = '点位创建失败'
        return undefined
      })
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
