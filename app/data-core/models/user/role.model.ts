import { Transform } from 'class-transformer'
import { IIdNameModel } from '../model.interface'
import { transformDateTime } from '../transformer'
import { UserResource } from './user-resource.model'

/** 角色信息 */
export class Role implements IIdNameModel {
  /**	String	唯一标识符	M	R */
  Id!: string
  /**	String	角色名称	M	RW */
  Name!: string
  /**	DateTime	创建时间	M	R */
  @Transform(transformDateTime)
  CreateTime!: Date
  /**	DateTime	更新时间	M	R */
  @Transform(transformDateTime)
  UpdateTime!: Date
  /**
   *	Int32	隐私数据显示
   *  3-不显示|部分显示，1-显示
   *  隐私数据包括：姓名，证件号，车牌号等。	M	RW
   *
   * @memberof Role
   */
  PrivacyData!: number

  /**
   *	Int32	用户数据操作权限
   *  0-不允许，1-允许	M	RW
   *
   * @memberof Role
   */
  UserData!: number

  /**
   *	Int32	静态数据操作权限
   *  0-不允许，1-允许
   *  包括：小区所有的静态信息	M	RW
   *
   * @memberof Role
   */
  StaticData!: number

  /**
   *	Int32	照片显示
   *  0-不显示，1-显示	M	RW
   *
   * @memberof Role
   */
  PictureData!: number

  /**	ResourceRole[]	资源列表	O	RW */
  Resources?: UserResource
  /**	String	服务器ID	O	RW */
  ServerId?: string
}
