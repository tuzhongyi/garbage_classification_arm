import { IIdNameModel } from '../model.interface'

export class UserResource implements IIdNameModel {
  /**	String	资源ID	M	R */
  Id!: string
  /**	String	资源名称	O	R */
  Name!: string
  /**	Int32	资源类型，1-街道，2-居委，3-厢房，4-行政区	M	R */
  ResourceType!: number

  /**	Int32	资源标签，权限级别	M	R */
  RoleFlags!: number
  /**	Boolean	开放全部的子节点资源	M	R */
  AllSubResources!: boolean
  /**	ResourceRole[]	子资源列表	O	R */
  Resources?: UserResource
}
