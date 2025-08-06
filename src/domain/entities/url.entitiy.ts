import { IUrl } from "../types/url.type";

export class UrlEntitiy implements IUrl {
  constructor(
    public _id: string,
    public originalUrl: string,
    public shortCode: string,
    public userId: string,
    public createdAt: Date,
  ) {}
}
