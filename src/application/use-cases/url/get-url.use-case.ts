import { Inject } from '@nestjs/common';
import { UrlRepository } from '../../../domain/repositories/url.repository';

export class GetUrlUseCase {
  constructor(@Inject('UrlRepository')
    private _urlRepository: UrlRepository) {}

  async execute(shortCode: string): Promise<{ originalUrl: string } | null> {
    const url = await this._urlRepository.findByShortCode(shortCode);
    if (!url) {
      return null;
    }
    return { originalUrl: url.originalUrl };
  }
}
