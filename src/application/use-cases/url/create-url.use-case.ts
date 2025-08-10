import { UrlRepository } from '../../../domain/repositories/url.repository';
import { CreateUrlDto } from 'src/application/dto/create-url.dto';

import { Inject } from '@nestjs/common';
import { shortCodeGenerator } from 'src/domain/interfaces/generateUrl.interface';
import { UrlEntitiy } from 'src/domain/entities/url.entitiy';
import { UrlResponseDto } from 'src/domain/types/url.type';
import { ICreate } from 'src/domain/interfaces/url/ICreate-url.interface';


export class CreateUrlUseCase implements ICreate{
  constructor(@Inject('UrlRepository')
    private _urlRepository: UrlRepository,
  @Inject('ShortCodeGenerator') private shortCodeGen: shortCodeGenerator
) {}

  async execute(
    dto: CreateUrlDto,
    userId: string,
  ): Promise<UrlResponseDto> {
    const shortCode = this.shortCodeGen.generate();
    const url = new UrlEntitiy(
      Math.random().toString(36).substring(2),
      dto.originalUrl,
      shortCode,
      userId,
      new Date(),
    );

    const createdUrl = await this._urlRepository.create(url);
    return { id: createdUrl._id,
      originalUrl: createdUrl.originalUrl,
      shortUrl: createdUrl.shortCode,
      createdAt: createdUrl.createdAt
     };
  }
}
