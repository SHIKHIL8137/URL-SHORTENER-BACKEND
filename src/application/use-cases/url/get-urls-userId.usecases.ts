import { Inject } from '@nestjs/common';
import { UrlRepository } from '../../../domain/repositories/url.repository';
import { IUrl } from 'src/domain/entities/url.entitiy';

export interface UrlResponseDto {
  id: string;
  originalUrl: string;
  shortUrl: string;
  createdAt: Date;
}

export class GetUrlsUseCase {
  constructor(
    @Inject('UrlRepository')
    private urlRepository: UrlRepository,
  ) {}

  async execute(userId: string): Promise<UrlResponseDto[] | null> {
    const urls = await this.urlRepository.findByUserId(userId);
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
