import { UrlRepository } from '../../../domain/repositories/url.repository';
import { CreateUrlDto } from 'src/application/dto/create-url.dto';
import { IUrl } from 'src/domain/entities/url.entitiy';
import { nanoid } from 'nanoid';
import { Inject } from '@nestjs/common';
export interface UrlResponseDto {
  id: string;
  originalUrl: string;
  shortUrl: string;
  createdAt: Date;
}

export class CreateUrlUseCase {
  constructor(@Inject('UrlRepository')
    private urlRepository: UrlRepository) {}

  async execute(
    dto: CreateUrlDto,
    userId: string,
  ): Promise<UrlResponseDto> {
    const shortCode = nanoid(6);
    const url = new IUrl(
      Math.random().toString(36).substring(2),
      dto.originalUrl,
      shortCode,
      userId,
      new Date(),
    );

    const createdUrl = await this.urlRepository.create(url);
    return { id: createdUrl._id,
      originalUrl: createdUrl.originalUrl,
      shortUrl: createdUrl.shortCode,
      createdAt: createdUrl.createdAt
     };
  }
}
