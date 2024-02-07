import 'reflect-metadata'
export interface IModel {}
export interface IIdModel extends IModel {
  Id: string
}
export interface INameModel extends IModel {
  Name: string
}
export interface IIdNameModel extends IIdModel, INameModel {}
