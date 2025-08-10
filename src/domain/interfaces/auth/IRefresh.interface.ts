export interface IRefresh {
  execute(email:string):Promise<{ accessToken: string }>;
}