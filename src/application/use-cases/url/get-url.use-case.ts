import { Inject } from '@nestjs/common';
import { UrlRepository } from '../../../domain/repositories/url.repository';
import { IGeturl } from 'src/domain/interfaces/url/IGet-url.interface';

export class GetUrlUseCase implements IGeturl{
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
