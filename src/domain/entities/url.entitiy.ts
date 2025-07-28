export class IUrl {
  constructor(
    public _id: string,
    public originalUrl: string,
    public shortCode: string,
    public userId: string,
    public createdAt: Date,
  ) {}
}
