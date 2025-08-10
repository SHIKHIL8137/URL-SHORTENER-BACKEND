export interface IGeturl{
  execute(shortCode:string):Promise<{originalUrl:string}|null>
}