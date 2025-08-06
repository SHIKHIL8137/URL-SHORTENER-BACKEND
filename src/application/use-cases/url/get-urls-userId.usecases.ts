import { Inject } from '@nestjs/common';
import { UrlRepository } from '../../../domain/repositories/url.repository';
import { UrlResponseDto } from 'src/domain/types/url.type';

export class GetUrlsUseCase {
  constructor(
    @Inject('UrlRepository')
    private _urlRepository: UrlRepository,
  ) {}

  async execute(userId: string,skip:number,limit:number): Promise<UrlResponseDto[] | null> {
    const urls = await this._urlRepository.findByUserId(userId,skip,limit);
    if (!urls) {
      return null;
    }
    const data = urls.map((val) => ({
      id: val._id,
      originalUrl: val.originalUrl,
      shortUrl: val.shortCode,
      createdAt: val.createdAt,
    }));
    return data;
  }
}
