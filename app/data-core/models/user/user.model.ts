import { Transform } from 'class-transformer'
import { IModel } from '../model.interface'
import { transformDateTime } from '../transformer'
import { Role } from './role.model'
import { UserResource } from './user-resource.model'
export class User implements IModel {
  /**	String	唯一标识符	M	R */
  Id!: string
  /**	String	用户名	M	RW */
  Username!: string
  /**	String	密码	O	W */
  Password?: string
  /**	String	密码HASH值	O	W */
  PasswordHash?: string
  /**	String	密码SALT值	O	W */
  PasswordSalt?: string
  /**	String	名字	O	RW */
  FirstName?: string
  /**	String	姓	O	RW */
  LastName?: string
  /**	Int32	性别	O	RW */
  Gender?: number
  /**	String	手机号码	O	RW */
  MobileNo?: string
  /**	String	邮箱	O	RW */
  Email?: string
  /**	String	描述信息	O	RW */
  Note?: string
  /**	DateTime	过期时间	M	RW */
  @Transform(transformDateTime)
  ExpiredTime!: Date
  /**	DateTime	创建时间	M	R */
  @Transform(transformDateTime)
  CreateTime!: Date
  /**	DateTime	更新时间	M	R */
  @Transform(transformDateTime)
  UpdateTime!: Date
  /**	Int32	0-正常	M	R */
  State!: number
  /**	Role[]	用户角色列表	M	R */
  Role!: Role[]
  /**	String	微信OpenID	O	RW */
  OpenId?: string
  /**	ResourceRole[]	资源列表	O	RW */
  Resources?: UserResource[]
  /**	String	服务器ID	O	R */
  ServerId?: string
  /**	Boolean	是否可以分配微信子用户	O	R */
  CanCreateWeChatUser?: boolean
  /**	String	创建者	O	R */
  CreatorId?: string
  /**	Int32[]	停止推送的事件类型	O	RW */
  OffEvents?: number[]
  /** 默认：厢房 1：厢房 2:车  3：车+厢房 */
  UserType?: number
  /** Int32	1：美丽城市助手标准UI 2：打浦桥订制接单处置UI	O	RW */
  UIType?: number
}
