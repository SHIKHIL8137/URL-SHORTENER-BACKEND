import { IUrl } from '../entities/url.entitiy';

export interface UrlRepository {
  create(url: IUrl): Promise<IUrl>;
  findByShortCode(shortCode: string): Promise<IUrl | null>;
  findByUserId(userId: string,skip:number,limit:number): Promise<IUrl[]>;
}
