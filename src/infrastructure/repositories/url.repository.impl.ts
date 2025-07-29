import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUrl } from 'src/domain/entities/url.entitiy';
import { Url } from '../dataBase/schemas/url.schema';

export class UrlRepositoryImpl {
  constructor(
    @InjectModel('Url') private readonly urlModel: Model<Url>,
  ) {}

  async create(url: IUrl): Promise<IUrl> {
    const createdUrl = await this.urlModel.create({
      originalUrl: url.originalUrl,
      shortCode: url.shortCode,
      userId: url.userId,
      createdAt: url.createdAt,
    });
    return new IUrl(
      createdUrl._id!.toString(),
      createdUrl.originalUrl,
      createdUrl.shortCode,
      createdUrl.userId,
      createdUrl.createdAt,
    );
  }

  async findByShortCode(shortCode: string): Promise<IUrl | null> {
    const url = await this.urlModel.findOne({ shortCode }).exec();
    if (!url) return null;
    return new IUrl(
      url._id!.toString(),
      url.originalUrl,
      url.shortCode,
      url.userId,
      url.createdAt,
    );
  }

  async findByUserId(userId: string,skip:number,limit:number): Promise<IUrl[]> {
    const urls = await this.urlModel.find({ userId }).skip(skip).limit(limit).exec();
    return urls.map(
      (url) =>
        new IUrl(
          url._id!.toString(),
          url.originalUrl,
          url.shortCode,
          url.userId,
          url.createdAt,
        ),
    );
  }
}
