import { IIdModel } from '../model.interface'

/**	ISUPDomain (ISUP网域)	*/
export class ISUPDomain implements IIdModel {
  /**	String	ID	M	*/
  Id!: string
  /**	String	名称	O	*/
  Name?: string
}
