import { Inject } from '@nestjs/common';
import { UrlRepository } from '../../../domain/repositories/url.repository';

export class GetUrlUseCase {
  constructor(@Inject('UrlRepository')
    private urlRepository: UrlRepository) {}

  async execute(shortCode: string): Promise<{ originalUrl: string } | null> {
    const url = await this.urlRepository.findByShortCode(shortCode);
    if (!url) {
      return null;
    }
    return { originalUrl: url.originalUrl };
  }
}
