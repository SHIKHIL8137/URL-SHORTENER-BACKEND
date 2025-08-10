import { UrlResponseDto } from "src/domain/types/url.type";

export interface IGeturls{
  execute(userId:string,skip:number,limit:number):Promise<UrlResponseDto[]|null>;
}