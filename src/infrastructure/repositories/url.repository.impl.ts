import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Url } from '../dataBase/schemas/url.schema';
import { IUrl } from 'src/domain/types/url.type';
import { UrlEntitiy } from 'src/domain/entities/url.entitiy';

export class UrlRepositoryImpl {
  constructor(
    @InjectModel('Url') private readonly _urlModel: Model<Url>,
  ) {}

  async create(url: IUrl): Promise<IUrl> {
    const createdUrl = await this._urlModel.create({
      originalUrl: url.originalUrl,
      shortCode: url.shortCode,
      userId: url.userId,
      createdAt: url.createdAt,
    });
    return new UrlEntitiy(
      createdUrl._id!.toString(),
      createdUrl.originalUrl,
      createdUrl.shortCode,
      createdUrl.userId,
      createdUrl.createdAt,
    );
  }

  async findByShortCode(shortCode: string): Promise<IUrl | null> {
    const url = await this._urlModel.findOne({ shortCode }).exec();
    if (!url) return null;
    return new UrlEntitiy(
      url._id!.toString(),
      url.originalUrl,
      url.shortCode,
      url.userId,
      url.createdAt,
    );
  }

  async findByUserId(userId: string,skip:number,limit:number): Promise<IUrl[]> {
    const urls = await this._urlModel.find({ userId }).sort({createdAt : -1}).skip(skip).limit(limit).exec();
    return urls.map(
      (url) =>
        new UrlEntitiy(
          url._id!.toString(),
          url.originalUrl,
          url.shortCode,
          url.userId,
          url.createdAt,
        ),
    );
  }
}
