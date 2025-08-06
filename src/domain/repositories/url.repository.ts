import { IUrl } from "../types/url.type";


export interface UrlRepository {
  create(url: IUrl): Promise<IUrl>;
  findByShortCode(shortCode: string): Promise<IUrl | null>;
  findByUserId(userId: string,skip:number,limit:number): Promise<IUrl[]>;
}
